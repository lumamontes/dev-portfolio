export type VaultFile = {
  path: string;
  content: string;
};

export type PromotedFile = {
  hash: string;
  kind: "entry" | "asset";
};

export type PromotionManifest = {
  files: Record<string, PromotedFile>;
};

export type PromotionChange = {
  path: string;
  kind: "add" | "update" | "delete";
  content?: string;
};

export type PromotionPlan = {
  changes: PromotionChange[];
  manifest: PromotionManifest;
};

export type PromotionResult =
  | { ok: true; plan: PromotionPlan }
  | { ok: false; errors: string[] };

type EntryMetadata = {
  title?: string;
  lang?: string;
  visibility?: string;
  editorialState?: string;
  assetPaths: string[];
};

const entryPathPattern = /^src\/content\/.+\.(?:md|mdx)$/;
const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/;
const scalar = (value: string) => value.trim().replace(/^['"]|['"]$/g, "");
const languages = new Set(["en", "br"]);
const editorialStates = new Set([
  "idea",
  "draft",
  "pitch",
  "submitted",
  "editing",
  "published-here",
  "published-elsewhere",
  "archived",
]);

async function hash(content: string) {
  const bytes = new TextEncoder().encode(content);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function metadata(file: VaultFile): EntryMetadata {
  const match = file.content.match(frontmatterPattern);
  if (!match) return { assetPaths: [] };

  const lines = match[1].split("\n");
  const field = (name: string) => {
    const line = lines.find((candidate) => candidate.startsWith(`${name}:`));
    return line ? scalar(line.split(":").slice(1).join(":")) : undefined;
  };
  const assetPaths = lines
    .map((line) =>
      line.match(/(?:src|bannerImage|cover):\s*["']?(\/[^"'\s,}]+)/),
    )
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => match[1]);

  return {
    title: field("title"),
    lang: field("lang"),
    visibility: field("visibility"),
    editorialState: field("editorialState"),
    assetPaths,
  };
}

function publicAssetPath(rootRelativePath: string) {
  return `public${rootRelativePath}`;
}

export async function planPromotion({
  sourceFiles,
  deployFiles,
  manifest,
}: {
  sourceFiles: VaultFile[];
  deployFiles: VaultFile[];
  manifest: PromotionManifest;
}): Promise<PromotionResult> {
  const sourceByPath = new Map(sourceFiles.map((file) => [file.path, file]));
  const deployByPath = new Map(deployFiles.map((file) => [file.path, file]));
  const errors: string[] = [];
  const desired = new Map<
    string,
    { file: VaultFile; kind: "entry" | "asset" }
  >();

  for (const file of sourceFiles.filter((candidate) =>
    entryPathPattern.test(candidate.path),
  )) {
    const entry = metadata(file);
    const hasPublicationMetadata =
      entry.visibility !== undefined || entry.editorialState !== undefined;
    if (!hasPublicationMetadata) {
      errors.push(`${file.path}: missing visibility and editorialState`);
      continue;
    }
    if (entry.visibility === undefined || entry.editorialState === undefined) {
      errors.push(
        `${file.path}: visibility and editorialState must both be set`,
      );
      continue;
    }
    if (!entry.title) errors.push(`${file.path}: title is required`);
    if (!entry.lang || !languages.has(entry.lang))
      errors.push(`${file.path}: lang must be en or br`);
    if (!["public", "private"].includes(entry.visibility))
      errors.push(`${file.path}: visibility must be public or private`);
    if (!editorialStates.has(entry.editorialState))
      errors.push(`${file.path}: editorialState is not recognized`);

    if (
      entry.visibility !== "public" ||
      entry.editorialState !== "published-here"
    )
      continue;

    desired.set(file.path, { file, kind: "entry" });
    for (const assetPath of entry.assetPaths) {
      const path = publicAssetPath(assetPath);
      const asset = sourceByPath.get(path);
      if (!asset) {
        errors.push(`${file.path}: missing asset ${assetPath}`);
        continue;
      }
      desired.set(path, { file: asset, kind: "asset" });
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  const changes: PromotionChange[] = [];
  const nextManifest: PromotionManifest = { files: {} };

  for (const [path, desiredFile] of desired) {
    const contentHash = await hash(desiredFile.file.content);
    const previous = manifest.files[path];
    const deployed = deployByPath.get(path);

    if (
      previous &&
      deployed &&
      (await hash(deployed.content)) !== previous.hash
    ) {
      return {
        ok: false,
        errors: [`${path}: deploy vault changed outside promotion`],
      };
    }
    if (
      !previous &&
      deployed &&
      deployed.content !== desiredFile.file.content
    ) {
      return {
        ok: false,
        errors: [`${path}: deploy vault contains an unexpected file`],
      };
    }

    nextManifest.files[path] = { hash: contentHash, kind: desiredFile.kind };
    if (!deployed) {
      changes.push({ path, kind: "add", content: desiredFile.file.content });
    } else if (deployed.content !== desiredFile.file.content) {
      changes.push({ path, kind: "update", content: desiredFile.file.content });
    }
  }

  for (const [path, previous] of Object.entries(manifest.files)) {
    const deployed = deployByPath.get(path);
    if (!deployed)
      return {
        ok: false,
        errors: [`${path}: promoted file is missing from deploy vault`],
      };
    if (nextManifest.files[path]) continue;
    if (deployed && (await hash(deployed.content)) !== previous.hash) {
      return {
        ok: false,
        errors: [`${path}: deploy vault changed outside promotion`],
      };
    }
    if (deployed) changes.push({ path, kind: "delete" });
  }

  for (const file of deployFiles) {
    if (
      file.path.startsWith("src/content/") &&
      !manifest.files[file.path] &&
      !nextManifest.files[file.path]
    ) {
      return {
        ok: false,
        errors: [
          `${file.path}: deploy vault contains an unexpected content file`,
        ],
      };
    }
  }

  return { ok: true, plan: { changes, manifest: nextManifest } };
}
