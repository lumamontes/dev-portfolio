import type { EditorialState, EntryType } from './content-model';
import { toSpotifyEmbedUrl } from './spotify-embed';

export const previewModes = ['live-embed', 'spotify-embed', 'native', 'link-card'] as const;
export type PreviewMode = (typeof previewModes)[number];

export interface PreviewableEntry {
  type: EntryType;
  editorialState?: EditorialState;
  externalUrl?: string;
  /**
   * Set only after manually verifying the destination sends no framing
   * restriction (see docs/adr/0002-external-entry-preview-strategy.md).
   * Never inferred or checked live — a wrong guess here would misrepresent
   * a destination that actually blocks embedding.
   */
  embeddable?: boolean;
}

const nativeEntryTypes: EntryType[] = [
  'text',
  'learning-note',
  'book',
  'zine',
  'photo',
  'music',
];

export function resolveEntryPreview(entry: PreviewableEntry): { mode: PreviewMode; embedUrl?: string } {
  if (entry.type === 'playlist') {
    // Unlike the general project live-embed tier, this needs no manual
    // `embeddable` verification: Spotify's /embed/ endpoint is a first-party
    // surface built to be iframed, so it's safe to detect purely from the
    // URL shape. Anything else (a non-Spotify playlist link) stays capped
    // at link-card, per the ADR's "genuine third-party pointer" ceiling.
    const embedUrl = entry.externalUrl ? toSpotifyEmbedUrl(entry.externalUrl) : undefined;
    if (embedUrl) {
      return { mode: 'spotify-embed', embedUrl };
    }
    return { mode: 'link-card' };
  }

  if (entry.type === 'project') {
    if (entry.embeddable === true && entry.externalUrl) {
      return { mode: 'live-embed' };
    }
    return { mode: 'link-card' };
  }

  if (nativeEntryTypes.includes(entry.type)) {
    return { mode: 'native' };
  }

  return { mode: 'link-card' };
}
