import { describe, expect, it } from 'vitest';
import { isPublicEntry, isPublicEntryInLanguage, projectSchema } from './content-model';

const baseProjectInput = {
  title: 'Example Project',
  description: 'An example project entry.',
  stack: ['TypeScript'],
  externalUrl: 'https://example.com/',
  lang: 'en' as const,
};

describe('projectSchema', () => {
  it('defaults to public, published-here when no editorial fields are given', () => {
    const entry = projectSchema.parse(baseProjectInput);

    expect(entry.type).toBe('project');
    expect(entry.editorialState).toBe('published-here');
    expect(entry.visibility).toBe('public');
    expect(entry.embeddable).toBe(false);
  });

  it('accepts a project with no externalUrl (private repo, nothing safe to link to)', () => {
    const entry = projectSchema.parse({
      title: 'Private Tool',
      description: 'A tool with no public destination.',
      stack: ['TypeScript'],
      lang: 'en' as const,
    });

    expect(entry.externalUrl).toBeUndefined();
  });

  it('respects an explicit private/draft editorial state', () => {
    const entry = projectSchema.parse({
      ...baseProjectInput,
      editorialState: 'draft',
      visibility: 'private',
    });

    expect(entry.editorialState).toBe('draft');
    expect(entry.visibility).toBe('private');
  });

  it('preserves an explicit embeddable: true flag', () => {
    const entry = projectSchema.parse({ ...baseProjectInput, embeddable: true });

    expect(entry.embeddable).toBe(true);
  });
});

describe('isPublicEntry / isPublicEntryInLanguage for project entries', () => {
  it('is public for a published-here, public project', () => {
    const entry = { data: projectSchema.parse(baseProjectInput) };

    expect(isPublicEntry(entry)).toBe(true);
    expect(isPublicEntryInLanguage(entry, 'en')).toBe(true);
    expect(isPublicEntryInLanguage(entry, 'br')).toBe(false);
  });

  it('is never public when visibility is private, regardless of editorial state', () => {
    const entry = {
      data: projectSchema.parse({ ...baseProjectInput, editorialState: 'published-here', visibility: 'private' }),
    };

    expect(isPublicEntry(entry)).toBe(false);
  });

  it('is never public for a draft, even if visibility were public', () => {
    const entry = {
      data: projectSchema.parse({ ...baseProjectInput, editorialState: 'draft', visibility: 'public' }),
    };

    expect(isPublicEntry(entry)).toBe(false);
  });
});
