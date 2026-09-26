import { describe, expect, it } from "vitest";
import {
  planPromotion,
  type PromotionManifest,
  type VaultFile,
} from "./promotion";

const emptyManifest: PromotionManifest = { files: {} };
const entry = (
  content: string,
  path = "src/content/posts/en/note.md",
): VaultFile => ({ path, content });

const publicEntry = (body = "hello", image = "") =>
  entry(
    `---\ntitle: Note\nlang: en\npublishedAt: 2026-01-01\ndescription: A note\nvisibility: public\neditorialState: published-here${image ? `\nbannerImage: ${image}` : ""}\n---\n${body}`,
  );

describe("planPromotion", () => {
  it("promotes public entries and reports additions", async () => {
    const result = await planPromotion({
      sourceFiles: [publicEntry()],
      deployFiles: [],
      manifest: emptyManifest,
    });

    expect(result).toEqual({
      ok: true,
      plan: {
        changes: [
          {
            path: "src/content/posts/en/note.md",
            kind: "add",
            content: publicEntry().content,
          },
        ],
        manifest: {
          files: {
            "src/content/posts/en/note.md": {
              hash: "c06dbda4fc1728b05186ef7c736040f4098934564b7d793bfb260e25fc19fae6",
              kind: "entry",
            },
          },
        },
      },
    });
  });

  it("excludes private and draft entries", async () => {
    const result = await planPromotion({
      sourceFiles: [
        entry(
          "---\ntitle: Secret\nlang: en\npublishedAt: 2026-01-01\ndescription: Secret\nvisibility: private\neditorialState: draft\n---\nsecret",
        ),
        entry(
          "---\ntitle: External\nlang: en\npublishedAt: 2026-01-01\ndescription: External\nvisibility: public\neditorialState: published-elsewhere\n---\nexternal",
          "src/content/posts/en/external.md",
        ),
      ],
      deployFiles: [],
      manifest: emptyManifest,
    });

    expect(result).toEqual({
      ok: true,
      plan: { changes: [], manifest: emptyManifest },
    });
  });

  it("fails atomically when an entry has incomplete publication metadata", async () => {
    const result = await planPromotion({
      sourceFiles: [
        publicEntry(),
        entry(
        "---\ntitle: Broken\nlang: en\npublishedAt: 2026-01-01\ndescription: Broken\nvisibility: public\n---\nbroken",
          "src/content/posts/en/broken.md",
        ),
      ],
      deployFiles: [],
      manifest: emptyManifest,
    });

    expect(result).toEqual({
      ok: false,
      errors: ["src/content/posts/en/broken.md: editorialState is required"],
    });
  });

  it("promotes referenced local assets and removes unpublished files", async () => {
    const source = publicEntry("with image", "/photos/note.jpg");
    const asset = { path: "public/photos/note.jpg", content: "image" };
    const previous = {
      ok: true as const,
      plan: {
        changes: [],
        manifest: {
          files: {
            "src/content/posts/en/old.md": {
              hash: "cba06b5736faf67e54b07b561eae94395e774c517a7d910a54369e1263ccfbd4",
              kind: "entry" as const,
            },
            "public/photos/old.jpg": {
              hash: "259e8f0a0c3ec4e94df6b990e36f76a33224b8623f3dcde609c972729b3ba0d5",
              kind: "asset" as const,
            },
          },
        },
      },
    };

    const result = await planPromotion({
      sourceFiles: [source, asset],
      deployFiles: [
        { path: "src/content/posts/en/old.md", content: "old" },
        { path: "public/photos/old.jpg", content: "old-image" },
      ],
      manifest: previous.plan.manifest,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(
      result.plan.changes.map(({ path, kind }) => ({ path, kind })),
    ).toEqual([
      { path: "public/photos/note.jpg", kind: "add" },
      { path: "public/photos/old.jpg", kind: "delete" },
      { path: "src/content/posts/en/note.md", kind: "add" },
      { path: "src/content/posts/en/old.md", kind: "delete" },
    ]);
  });

  it("rejects changes made directly in the deploy vault", async () => {
    const source = publicEntry("new version");
    const first = await planPromotion({
      sourceFiles: [publicEntry()],
      deployFiles: [],
      manifest: emptyManifest,
    });
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const result = await planPromotion({
      sourceFiles: [source],
      deployFiles: [
        { path: "src/content/posts/en/note.md", content: "manual deploy edit" },
      ],
      manifest: first.plan.manifest,
    });

    expect(result).toEqual({
      ok: false,
      errors: [
        "src/content/posts/en/note.md: deploy vault changed outside promotion",
      ],
    });
  });
});
