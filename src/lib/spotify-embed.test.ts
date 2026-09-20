import { describe, expect, it } from 'vitest';
import { toSpotifyEmbedUrl } from './spotify-embed';

describe('toSpotifyEmbedUrl', () => {
  it('converts a playlist URL', () => {
    expect(toSpotifyEmbedUrl('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M')).toBe(
      'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    );
  });

  it('strips query params like si= tracking tokens', () => {
    expect(toSpotifyEmbedUrl('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=abc123')).toBe(
      'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    );
  });

  it('converts a locale-prefixed share link (e.g. from the mobile share sheet)', () => {
    expect(toSpotifyEmbedUrl('https://open.spotify.com/intl-pt/playlist/37i9dQZF1DXcBWIGoYBM5M')).toBe(
      'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    );
  });

  it('converts a track URL', () => {
    expect(toSpotifyEmbedUrl('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC')).toBe(
      'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
    );
  });

  it('returns undefined for a non-Spotify URL', () => {
    expect(toSpotifyEmbedUrl('https://music.youtube.com/playlist?list=abc')).toBeUndefined();
  });

  it('returns undefined for a Spotify URL with no recognizable resource path', () => {
    expect(toSpotifyEmbedUrl('https://open.spotify.com/')).toBeUndefined();
  });

  it('returns undefined for an invalid URL string', () => {
    expect(toSpotifyEmbedUrl('not a url')).toBeUndefined();
  });
});
