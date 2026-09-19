import type { EditorialState, EntryType } from './content-model';

export const previewModes = ['live-embed', 'native', 'link-card'] as const;
export type PreviewMode = (typeof previewModes)[number];

// `playlist` isn't in EntryType yet (that's ticket 25); accepted here ahead
// of time so this function's contract doesn't need to change once it lands.
export type PreviewEntryType = EntryType | 'playlist';

export interface PreviewableEntry {
  type: PreviewEntryType;
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

const nativeEntryTypes: PreviewEntryType[] = [
  'text',
  'learning-note',
  'book',
  'zine',
  'photo',
  'music',
];

export function resolveEntryPreview(entry: PreviewableEntry): { mode: PreviewMode } {
  if (entry.type === 'playlist') {
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
