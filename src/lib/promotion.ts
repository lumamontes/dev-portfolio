import matter from 'gray-matter';

export type VaultFile = { path: string; content: string };
export type PromotedFile = { hash: string; kind: 'entry' | 'asset' };
export type PromotionManifest = { files: Record<string, PromotedFile> };
export type PromotionChange = { path: string; kind: 'add' | 'update' | 'delete'; content?: string };
export type PromotionPlan = { changes: PromotionChange[]; manifest: PromotionManifest };
export type PromotionResult = { ok: true; plan: PromotionPlan } | { ok: false; errors: string[] };

type EntryMetadata = { data: Record<string, unknown>; assetPaths: string[] };
const entryPathPattern = /^src\/content\/.+\.(?:md|mdx)$/;
const languages = new Set(['en', 'br']);
const editorialStates = new Set(['idea', 'draft', 'pitch', 'submitted', 'editing', 'published-here', 'published-elsewhere', 'archived']);

async function hash(content: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function metadata(file: VaultFile): EntryMetadata {
  const parsed = matter(file.content);
  const assetPaths: string[] = [];
  const visit = (value: unknown, key = '') => {
    if (typeof value === 'string' && ['src', 'bannerImage', 'cover'].includes(key) && value.startsWith('/')) assetPaths.push(value);
    if (Array.isArray(value)) value.forEach((item) => visit(item, key));
    if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, childValue]) => visit(childValue, childKey));
  };
  visit(parsed.data);
  return { data: parsed.data as Record<string, unknown>, assetPaths };
}

function validateEntry(path: string, entry: EntryMetadata) {
  const data = entry.data;
  const errors: string[] = [];
  const requiredString = (field: string) => {
    if (typeof data[field] !== 'string' || !data[field].trim()) errors.push(`${path}: ${field} is required`);
  };
  requiredString('title');
  requiredString('lang');
  requiredString('visibility');
  requiredString('editorialState');
  if (typeof data.lang === 'string' && !languages.has(data.lang)) errors.push(`${path}: lang must be en or br`);
  if (typeof data.visibility === 'string' && !['public', 'private'].includes(data.visibility)) errors.push(`${path}: visibility must be public or private`);
  if (typeof data.editorialState === 'string' && !editorialStates.has(data.editorialState)) errors.push(`${path}: editorialState is not recognized`);

  const collection = path.split('/')[2];
  const requiredDescription = ['posts', 'learning-notes', 'music', 'projects', 'photos'].includes(collection);
  if (requiredDescription) requiredString('description');
  if (['posts', 'learning-notes', 'music'].includes(collection) && Number.isNaN(new Date(String(data.publishedAt)).getTime())) errors.push(`${path}: publishedAt must be a valid date`);
  if (collection === 'photos' && (!Array.isArray(data.images) || data.images.length === 0)) errors.push(`${path}: images is required`);
  if (collection === 'zines') {
    requiredString('context');
    if (!Array.isArray(data.authors) || data.authors.length === 0) errors.push(`${path}: authors is required`);
    if (typeof data.externalUrl !== 'string' || !URL.canParse(data.externalUrl)) errors.push(`${path}: externalUrl must be a valid URL`);
  }
  if (collection === 'playlists' && (typeof data.externalUrl !== 'string' || !URL.canParse(data.externalUrl))) errors.push(`${path}: externalUrl must be a valid URL`);
  if (collection.startsWith('books-') && (!Array.isArray(data.books) || data.books.length === 0)) errors.push(`${path}: books is required`);
  return errors;
}

export async function planPromotion({ sourceFiles, deployFiles, manifest }: { sourceFiles: VaultFile[]; deployFiles: VaultFile[]; manifest: PromotionManifest }): Promise<PromotionResult> {
  const sourceByPath = new Map(sourceFiles.map((file) => [file.path, file]));
  const deployByPath = new Map(deployFiles.map((file) => [file.path, file]));
  const errors: string[] = [];
  const desired = new Map<string, { file: VaultFile; kind: 'entry' | 'asset' }>();

  for (const file of [...sourceFiles].sort((a, b) => a.path.localeCompare(b.path)).filter((candidate) => entryPathPattern.test(candidate.path))) {
    let entry: EntryMetadata;
    try {
      entry = metadata(file);
    } catch {
      errors.push(`${file.path}: frontmatter is invalid`);
      continue;
    }
    errors.push(...validateEntry(file.path, entry));
    if (entry.data.visibility !== 'public' || entry.data.editorialState !== 'published-here') continue;
    desired.set(file.path, { file, kind: 'entry' });
    for (const assetPath of entry.assetPaths) {
      const path = `public${assetPath}`;
      const asset = sourceByPath.get(path);
      if (!asset) errors.push(`${file.path}: missing asset ${assetPath}`);
      else desired.set(path, { file: asset, kind: 'asset' });
    }
  }
  if (errors.length > 0) return { ok: false, errors };

  const changes: PromotionChange[] = [];
  const nextManifest: PromotionManifest = { files: {} };
  for (const [path, desiredFile] of [...desired.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const previous = manifest.files[path];
    const deployed = deployByPath.get(path);
    if (previous && deployed && (await hash(deployed.content)) !== previous.hash) return { ok: false, errors: [`${path}: deploy vault changed outside promotion`] };
    if (!previous && deployed && deployed.content !== desiredFile.file.content) return { ok: false, errors: [`${path}: deploy vault contains an unexpected file`] };
    nextManifest.files[path] = { hash: await hash(desiredFile.file.content), kind: desiredFile.kind };
    if (!deployed) changes.push({ path, kind: 'add', content: desiredFile.file.content });
    else if (deployed.content !== desiredFile.file.content) changes.push({ path, kind: 'update', content: desiredFile.file.content });
  }
  for (const [path, previous] of Object.entries(manifest.files).sort(([a], [b]) => a.localeCompare(b))) {
    const deployed = deployByPath.get(path);
    if (!deployed) return { ok: false, errors: [`${path}: promoted file is missing from deploy vault`] };
    if (nextManifest.files[path]) continue;
    if ((await hash(deployed.content)) !== previous.hash) return { ok: false, errors: [`${path}: deploy vault changed outside promotion`] };
    changes.push({ path, kind: 'delete' });
  }
  for (const file of deployFiles) {
    if (file.path.startsWith('src/content/') && !manifest.files[file.path] && !nextManifest.files[file.path]) return { ok: false, errors: [`${file.path}: deploy vault contains an unexpected content file`] };
  }
  changes.sort((left, right) => left.path.localeCompare(right.path) || left.kind.localeCompare(right.kind));
  return { ok: true, plan: { changes, manifest: nextManifest } };
}
