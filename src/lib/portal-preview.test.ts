import { describe, expect, it } from 'vitest';
import { resolveEntryPreview } from './portal-preview';

describe('resolveEntryPreview', () => {
  it('returns live-embed for a project entry verified embeddable with an external URL', () => {
    const result = resolveEntryPreview({
      type: 'project',
      embeddable: true,
      externalUrl: 'https://www.biblioteca-de-zines.com.br/',
    });

    expect(result.mode).toBe('live-embed');
  });

  it('returns link-card for a project entry not verified embeddable', () => {
    const result = resolveEntryPreview({
      type: 'project',
      externalUrl: 'https://github.com/lumamontes/db-lab',
    });

    expect(result.mode).toBe('link-card');
  });

  it('returns link-card for a project entry with embeddable set but no external URL', () => {
    const result = resolveEntryPreview({
      type: 'project',
      embeddable: true,
    });

    expect(result.mode).toBe('link-card');
  });

  it('returns spotify-embed for a playlist entry with a Spotify URL, regardless of embeddable', () => {
    const result = resolveEntryPreview({
      type: 'playlist',
      externalUrl: 'https://open.spotify.com/playlist/example',
    });

    expect(result.mode).toBe('spotify-embed');
  });

  it('returns link-card for a playlist entry with a non-Spotify URL, even if embeddable is set', () => {
    const result = resolveEntryPreview({
      type: 'playlist',
      embeddable: true,
      externalUrl: 'https://music.youtube.com/playlist?list=example',
    });

    expect(result.mode).toBe('link-card');
  });

  it('returns link-card for a playlist entry with no external URL', () => {
    const result = resolveEntryPreview({ type: 'playlist' });

    expect(result.mode).toBe('link-card');
  });

  it('returns native for a text entry published on this site', () => {
    const result = resolveEntryPreview({
      type: 'text',
      editorialState: 'published-here',
    });

    expect(result.mode).toBe('native');
  });

  it('returns native for a text entry migrated from elsewhere (published-elsewhere)', () => {
    const result = resolveEntryPreview({
      type: 'text',
      editorialState: 'published-elsewhere',
      externalUrl: 'https://dev.to/lumamontes/some-article',
    });

    expect(result.mode).toBe('native');
  });

  it('returns native for a zine entry (authored context, even though it links out to the full zine)', () => {
    const result = resolveEntryPreview({
      type: 'zine',
      editorialState: 'published-here',
      externalUrl: 'https://biblioteca-de-zines.com.br/zine/gemulas',
    });

    expect(result.mode).toBe('native');
  });

  it('returns native for learning-note, book, photo and music entries', () => {
    for (const type of ['learning-note', 'book', 'photo', 'music'] as const) {
      expect(resolveEntryPreview({ type, editorialState: 'published-here' }).mode).toBe('native');
    }
  });

  it('never returns live-embed unless embeddable was explicitly verified true', () => {
    const result = resolveEntryPreview({
      type: 'project',
      embeddable: false,
      externalUrl: 'https://dev.to/some-blocked-destination',
    });

    expect(result.mode).not.toBe('live-embed');
  });
});
