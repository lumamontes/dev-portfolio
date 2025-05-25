import { ui, defaultLang } from '@/data/ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

type TranslationKey<T> = T extends Record<string, any> ? keyof T[keyof T] : never;

export function useTranslations<T extends Record<string, any>>(lang: keyof typeof ui, translations?: T) {
  if (!translations) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
      return ui[lang][key] || ui[defaultLang][key];
    }
  }

  return function t(key: TranslationKey<T>) {
    return translations[lang][key] || translations[defaultLang][key];
  }
}

export function getSlugFromUrl(url: string) {
  const [lang, slug] = url.split('/');
  return slug;
}