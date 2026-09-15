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
  'biblioteca-de-zines': '/4.gif',
};

const projects: Project[] = [
  {
    title: 'Biblioteca de Zines',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Contentful'],
    link: 'https://biblioteca-de-zines.com.br/',
    image: projectImages['biblioteca-de-zines'],
    description: {
      en: 'A live archive and publishing platform for zines by independent artists, built to make small-format work easier to discover and preserve.',
      br: 'Uma plataforma viva de arquivo e publicação de zines de artistas independentes, feita para tornar trabalhos de pequeno formato mais fáceis de descobrir e preservar.',
    },
  },
];

export default projects;
