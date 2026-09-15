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
  'bug-bash': 'https://opengraph.githubassets.com/1/lumamontes/bugbash',
  kettle: 'https://opengraph.githubassets.com/1/lumamontes/kettle',
  'external-resources': 'https://opengraph.githubassets.com/1/lumamontes/external-resources-monitoring-cli',
  'multitenant-app': 'https://opengraph.githubassets.com/1/lumamontes/multitenant-app',
  'wbb-games': 'https://opengraph.githubassets.com/1/lumamontes/wbb-games',
  'local-first': 'https://opengraph.githubassets.com/1/lumamontes/local-first-legend-state',
  'app-generator': 'https://opengraph.githubassets.com/1/lumamontes/app-asset-generator',
};

const projects: Project[] = [
  {
    title: 'Bug Bash',
    techs: ['Astro', 'React 19', 'TypeScript', 'PostgreSQL', 'SSE'],
    link: 'https://github.com/lumamontes/bugbash',
    image: projectImages['bug-bash'],
    description: {
      en: 'An open-source platform for collaborative testing sessions, with live bug reporting, coverage tracking, quality scoring and gamification.',
      br: 'Uma plataforma open source para sessões colaborativas de testes, com reports ao vivo, acompanhamento de cobertura, score de qualidade e gamificação.',
    },
  },
  {
    title: 'Cuidaty',
    techs: ["Laravel", "React", "Inertia.js", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    link: "https://cuidaty.com",
    description: {
      en: "A healthcare management platform for clinics, psychologists, and therapists. Features scheduling with WhatsApp reminders, electronic medical records, real-time messaging, financial management, and team control.",
      br: "Plataforma de gestão para clínicas, psicólogos e terapeutas. Inclui agendamento com lembretes via WhatsApp, prontuário eletrônico, mensagens em tempo real, gestão financeira e controle de equipes.",
    },
  },
  {
    title: 'Kettle',
    techs: ['Kotlin', 'Spring Boot', 'Logback', 'Gradle'],
    link: 'https://github.com/lumamontes/kettle',
    image: projectImages.kettle,
    description: {
      en: 'A pretty, structured console appender for Spring Boot projects, with color-coded levels, exception classes, MDC context and configurable noise filtering.',
      br: 'Um appender de console estruturado para projetos Spring Boot, com níveis coloridos, classes de exceção, contexto MDC e filtragem configurável de ruído.',
    },
  },
  {
    title: 'External Resources Monitoring CLI',
    techs: ['Node.js', 'TypeScript', 'CLI', 'Schema validation'],
    link: 'https://github.com/lumamontes/external-resources-monitoring-cli',
    image: projectImages['external-resources'],
    description: {
      en: 'A bounded CLI for checking whether public resources are available, with deterministic reports, retries, timeouts and CI-friendly exit codes.',
      br: 'Uma CLI delimitada para verificar a disponibilidade de recursos públicos, com reports determinísticos, retries, timeouts e códigos de saída para CI.',
    },
  },
  {
    title: 'Multi-tenant Expo App',
    techs: ['Expo', 'React Native', 'TypeScript', 'EAS'],
    link: 'https://github.com/lumamontes/multitenant-app',
    image: projectImages['multitenant-app'],
    description: {
      en: 'A scalable Expo application with tenant-specific branding, configurations, feature flags and automated builds.',
      br: 'Uma aplicação Expo escalável com branding por tenant, configurações, feature flags e builds automatizados.',
    },
  },
  {
    title: 'WBB Games',
    techs: ['Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/lumamontes/wbb-games',
    image: projectImages['wbb-games'],
    description: {
      en: "A schedule for NCAA women's basketball that consumes an API and presents game time, venue and teams with a theme toggle.",
      br: 'Uma agenda de jogos de basquete feminino universitário que consome uma API e apresenta horário, local e times com troca de tema.',
    },
  },
  {
    title: 'LocalSync RN',
    techs: ['React Native', 'Legend State', 'TypeScript'],
    link: 'https://github.com/lumamontes/local-first-legend-state',
    image: projectImages['local-first'],
    description: {
      en: "A local-first React Native app built with Legend State, featuring offline functionality and automatic synchronization.",
      br: "Um aplicativo React Native local-first construído com Legend State, com funcionalidade offline e sincronização automática.",
    },
  },
  {
    title: 'App Asset Generator',
    techs: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    link: 'https://github.com/lumamontes/app-asset-generator',
    image: projectImages['app-generator'],
    description: {
      en: 'A small web tool for generating app icons, splash screens and favicons from images or emojis.',
      br: 'Uma ferramenta web pequena para gerar ícones, splash screens e favicons a partir de imagens ou emojis.',
    },
  },
];

export default projects;
