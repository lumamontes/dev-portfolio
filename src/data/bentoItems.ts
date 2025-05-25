import { ui, defaultLang } from './ui';

export interface BentoItem {
  title: string;
  description: string;
  icon?: string;
  link: string;
  size: 'small' | 'medium' | 'large';
  theme?: 'terminal' | 'pixel' | 'crt' | 'default';
  customContent?: string;
  component?: string;
}

type TranslationFunction = (key: keyof typeof ui[typeof defaultLang]) => string;

export function getBentoItems(t: TranslationFunction, currentTime: string): BentoItem[] {
  return [
    {
      title: t('presentation.title'),
      description: t('presentation.description'),
      icon: '◉',
      link: '#',
      size: 'large',
      theme: 'terminal',
      component: 'HeroBentoItem'
    },
    {
      title: t('about.me'),
      description: t('about.me.description'),
      icon: '⚡',
      link: '#',
      size: 'medium',
      theme: 'default',
      component: 'AboutMeBentoItem'
    },
    {
      title: t('nav.projects'),
      description: t('projects.description'),
      icon: '◈',
      link: '/projects',
      size: 'small',
      theme: 'pixel',
      customContent: `
        <div class="space-y-3 h-full flex flex-col">
          <p class="text-sm opacity-75 leading-relaxed flex-1">
            ${t('projects.description')}
          </p>
        </div>
      `
    },
    {
      title: t('radio.title'),
      description: t('radio.description'),
      size: 'medium',
      link: '#',
    },
    {
      title: t('nav.experience'),
      description: t('experience.small_description'),
      icon: '◦',
      link: '/about',
      size: 'small',
      theme: 'default',
    },
    {
      title: t('coffe.title'),
      description: t('coffe.description'),
      icon: '☕',
      link: '#',
      size: 'small',
      theme: 'pixel',
      component: 'CoffeeBentoItem'
    },
    {
      title: t('nav.blog'),
      description: t('blog.description'),
      icon: '◊',
      link: '/posts',
      size: 'medium',
      theme: 'crt',
      customContent: `
        <div class="space-y-4 h-full flex flex-col">
          <p class="text-sm opacity-75 leading-relaxed">
            ${t('blog.description')}
          </p>
        </div>
      `
    },
    {
      title: t('nav.contact'),
      description: 'Get in touch',
      icon: '◈',
      link: '/contact',
      size: 'small',
      theme: 'pixel',
      customContent: `
        <div class="space-y-3 h-full flex flex-col">
          ${t('about.connect.title')}
        </div>
      `
    },
    {
      title: t('currently.learning'),
      description: t('currently.learning.description'),
      icon: '📚',
      link: '#',
      size: 'small',
      theme: 'terminal',
      component: 'LearningBentoItem'
    }
  ];
} 