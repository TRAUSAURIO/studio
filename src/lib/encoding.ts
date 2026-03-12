import { ExperienceData } from './types';

export function encodeExperience(data: ExperienceData): string {
  try {
    const jsonStr = JSON.stringify(data);
    const utf8Str = encodeURIComponent(jsonStr);
    return btoa(unescape(utf8Str));
  } catch (e) {
    console.error('Failed to encode data', e);
    return '';
  }
}

export function decodeExperience(encoded: string): ExperienceData | null {
  try {
    const utf8Str = escape(atob(encoded));
    const jsonStr = decodeURIComponent(utf8Str);
    return JSON.parse(jsonStr) as ExperienceData;
  } catch (e) {
    console.error('Failed to decode data', e);
    return null;
  }
}

export function getSharableUrl(data: ExperienceData): string {
  if (typeof window === 'undefined') return '';
  const encoded = encodeExperience(data);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('data', encoded);
  return url.toString();
}
