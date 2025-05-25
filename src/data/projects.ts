export type Project = {
  title: string;
  techs: string[];
  link: string;
  description: {
    en: string;
    br: string;
  };
  isComingSoon?: boolean;
  image?: string;
};

const projectImages = {
  'expo-router-auth': '/1.gif',
  'photos-gallery': '/2.png',
  'laravel-payments-api': '/5.png',
  'biblioteca-de-zines': '/4.gif',
  'caju': '/3.png',
  'app-generator': '/6.png',
  'local-first': '/7.gif',
};

const projects: Project[] = [
  {
    title: "App Asset Generator",
    techs: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/lumamontes/app-asset-generator",
    image: projectImages['app-generator'],
    description: {
      en: "A web-based tool to generate app assets (icons, splash screens, and favicons) from emojis or images with custom backgrounds.",
      br: "Uma ferramenta web para gerar assets de aplicativos (ícones, splash screens e favicons) a partir de emojis ou imagens com fundos personalizados.",
    },
  },
  {
    title: "LocalSync RN",
    techs: ["React Native", "Legend State", "TypeScript"],
    link: "https://github.com/lumamontes/local-first-legend-state",
    image: projectImages['local-first'],
    description: {
      en: "A local-first React Native app built with Legend State, featuring offline functionality and automatic synchronization.",
      br: "Um aplicativo React Native local-first construído com Legend State, com funcionalidade offline e sincronização automática.",
    },
  },
  {
    title: "Expo Router Auth",
    techs: ["React Native", "Expo Router", "TypeScript"],
    image: projectImages['expo-router-auth'],
    link: "https://github.com/lumamontes/expo-router-auth",
    description: {
      en: "A React Native app showcasing an authentication flow.",
      br: "Um aplicativo React Native demonstrando um fluxo de autenticação.",
    },
  },
  {
    title: "Image Gallery",
    techs: ["Next.js", "Contentful", "TypeScript"],
    link: "https://github.com/lumamontes/photos-gallery",
    image: projectImages['photos-gallery'],
    description: {
      en: "A photo gallery built with Next.js, showcasing image collections with a CMS integration.",
      br: "Uma galeria de fotos construída com Next.js, exibindo coleções de imagens com integração CMS.",
    },
  },
  {
    title: "Laravel Payments API",
    techs: ["PHP", "Laravel", "Sanctum", "PHPUnit"],
    link: "https://github.com/lumamontes/laravel-payments-api",
    image: projectImages['laravel-payments-api'],
    description: {
      en: "An API for managing invoices and transactions in a financial system.",
      br: "Uma API para gerenciar faturas e transações financeiras ",
    },
  },
  {
    title: "Biblioteca de Zines",
    techs: ["TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://github.com/lumamontes/biblioteca-de-zines",
    image: projectImages['biblioteca-de-zines'],
    description: {
      en: "An archive and sharing platform for zines by independent artists.",
      br: "Uma plataforma para arquivar e compartilhar zines de artistas independentes.",
    },
  },
  {
    title: "Caju Replica App",
    techs: ["TypeScript", "Expo", "React Native", "SQLite"],
    link: "https://github.com/lumamontes/caju",
    image: projectImages['caju'],
    description: {
      en: "A React Native app replicating functionalities of the Caju application.",
      br: "Um aplicativo React Native replicando funcionalidades do aplicativo Caju.",
    },
  },
];

export default projects;
