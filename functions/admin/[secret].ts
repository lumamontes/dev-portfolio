import {
  createSessionToken,
  isValidSessionToken,
  parseBasicCredentials,
  sessionCookie,
  sessionFromCookie,
} from "../../src/lib/publishing-auth";

interface Env {
  PUBLISH_SECRET: string;
  PUBLISH_USERNAME: string;
  PUBLISH_PASSWORD: string;
  PUBLISH_SESSION_SECRET: string;
  PUBLISH_PREPARE_URL: string;
  PUBLISH_PREPARE_TOKEN: string;
  PUBLISH_APPROVE_URL: string;
  PUBLISH_DEPLOY_URL: string;
}

type Context = {
  request: Request;
  env: Env;
  params: { secret?: string };
};

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="publishing"' },
  });
}

function htmlEscape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

async function authorize({ request, env, params }: Context) {
  if (!env.PUBLISH_SECRET || params.secret !== env.PUBLISH_SECRET) return null;

  const session = sessionFromCookie(request.headers.get("cookie"));
  if (await isValidSessionToken(session, env.PUBLISH_SESSION_SECRET))
    return new Headers();

  const credentials = parseBasicCredentials(
    request.headers.get("authorization"),
  );
  if (
    !credentials ||
    credentials.username !== env.PUBLISH_USERNAME ||
    credentials.password !== env.PUBLISH_PASSWORD
  )
    return null;

  const headers = new Headers();
  headers.set(
    "set-cookie",
    sessionCookie(await createSessionToken(env.PUBLISH_SESSION_SECRET)),
  );
  return headers;
}

function page(message = "") {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Publish portfolio</title></head><body><main><h1>Publish portfolio</h1>${message ? `<pre>${htmlEscape(message)}</pre>` : ""}<form method="post"><button name="action" value="prepare">Prepare publication</button></form><form method="post"><button name="action" value="approve">Approve prepared branch</button></form><form method="post"><button name="action" value="deploy">Deploy production</button></form></main></body></html>`;
}

async function callEndpoint(
  url: string,
  token: string | undefined,
  body?: unknown,
) {
  const headers = new Headers({ "content-type": "application/json" });
  if (token) headers.set("authorization", `Bearer ${token}`);
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  if (!response.ok)
    throw new Error(
      `Publishing operation failed (${response.status}): ${text.slice(0, 500)}`,
    );
  return text || "Operation completed.";
}

export const onRequest = async (context: Context) => {
  const authHeaders = await authorize(context);
  if (!authHeaders) return unauthorized();

  if (context.request.method === "GET")
    return new Response(page(), {
      headers: {
        ...Object.fromEntries(authHeaders),
        "content-type": "text/html; charset=utf-8",
      },
    });
  if (context.request.method !== "POST")
    return new Response("Method not allowed", { status: 405 });

  const form = await context.request.formData();
  const action = form.get("action");
  try {
    const message =
      action === "prepare"
        ? await callEndpoint(
            context.env.PUBLISH_PREPARE_URL,
            context.env.PUBLISH_PREPARE_TOKEN,
            { branch: "publish/current" },
          )
        : action === "approve"
          ? await callEndpoint(
              context.env.PUBLISH_APPROVE_URL,
              context.env.PUBLISH_PREPARE_TOKEN,
              { branch: "publish/current" },
            )
          : action === "deploy"
            ? await callEndpoint(
                context.env.PUBLISH_DEPLOY_URL,
                context.env.PUBLISH_PREPARE_TOKEN,
                { branch: "main" },
              )
            : "Choose a publishing action.";
    return new Response(page(message), {
      headers: {
        ...Object.fromEntries(authHeaders),
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    return new Response(
      page(
        error instanceof Error ? error.message : "Publishing operation failed.",
      ),
      {
        status: 502,
        headers: {
          ...Object.fromEntries(authHeaders),
          "content-type": "text/html; charset=utf-8",
        },
      },
    );
  }
};
