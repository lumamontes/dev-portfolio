export const languages = {
  en: 'English',
  br: 'Português',
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  type: 'development' | 'support' | 'education';
  level: 'senior' | 'mid' | 'junior' | 'support3' | 'support2' | 'support1' | 'education';
  current?: boolean;
};

export const defaultLang = 'en';

export const ui = {
  en: {
    // Main presentation
    'presentation.title': 'Hi, I\'m Luma 👋',
    'presentation.description': "I'm a full-stack developer from Amapá with over 3 years of experience creating amazing web and mobile experiences. I work at Proesc developing solutions for educational institutions in multidisciplinary projects, contributing to innovation in the field.",
    'presentation.location': '📍 Macapá, Amapá, Brazil',
    'presentation.experience': '3+ years of experience',
    'presentation.currentRole': 'Mid-level Developer at Proesc',
    'about.me': 'Me.',
    'about.me.description': 'I like to play videogames, watch tv shows with maaany seasons, basketball and anything involving technology and education.',

    // Blog section
    'blog.latest': 'Latest posts',
    'blog.all': 'See all posts',
    'blog.cta': 'Read on dev.to',
    'blog.empty': 'More articles coming soon!',

    'currently.learning': 'Currently Learning',
    'currently.learning.description': 'Skills in progress',

    // Projects section
    'projects.title': 'Selected projects',
    
    // Footer
    'footer.title': 'Get in touch',
    'footer.description': 'Feel free to reach out for collaborations, opportunities, or just to chat about tech!',
    'footer.email': 'Email me',
    'footer.social': 'Follow me',
    
    // Navigation
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'experience.small_description': 'A little bit about me and my experiences :)',
    'experience.responsibilities': 'Responsibilities',

    // About page
    'about.title': 'About Me',
    'about.description': 'Full-stack developer passionate about creating functional applications that solve real problems. I started my career at Proesc in 2021 as a junior dev and have been growing ever since! I also really enjoy working in teams and helping the tech community :)',

    'experience.title': 'My Experiences',
    'projects.description': 'Here are some little open source projects I made, mainly to learn new technologies.',
    'projects.featured': 'Featured Projects',
    'projects.others': 'Other Projects',
    'projects.inProgress': 'In Development',
    'projects.all': 'All projects',
    'skills.title': 'Skills',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.mobile': 'Mobile',
    'about.skills.tools': 'Tools',
    'skills.learning': 'Learning',
    'experience.subtitle': 'Experience',
    // Blog page  
    'blog.description': 'I like to write a bit as I learn new things, here are some of my posts.',
    'blog.total_posts': 'total posts',
    'blog.filter.title': 'Filter by tags:',
    'blog.filter.all': 'All Posts',
    'blog.filter.clear': 'Clear all',
    'blog.filter.showAll': 'Show all tags',
    'blog.filter.hideAll': 'Hide tags',
    'blog.filter.search': 'Search tags...',
    'blog.filter.noResults.title': 'No posts found',
    'blog.filter.noResults.description': 'Try selecting different tags or clear all filters.',
    
    'coffe.title': 'A simple cup of coffee.',
    'coffe.description': 'A simple cup of coffee.',
    'about.connect.title': 'Let\'s connect!',
    // Contact page
    'contact.description': 'Want to collaborate on a project, have a question, or just chat? Get in touch :)',
    'contact.responseTime': 'Response time',
    'contact.remoteWorldwide': 'Remote worldwide',
    'contact.quickInfo': 'Quick Info',
    'contact.social.title': 'Social Networks',
    'contact.location': 'Location',
    'contact.locationValue': 'Amapá, Brazil (UTC-3)',
    'contact.languages': 'Languages',
    'contact.languagesValue': 'Portuguese, English',
    'contact.availability': 'Availability',
    'contact.availabilityValue': 'Open for projects',

    // Education Timeline
    'education.technologist.title': 'Technologist in Internet Systems',
    'education.technologist.institution': 'Faculdade de Tecnologia do Amapá',
    'education.technologist.period': '2020 - 2022',
    'education.technologist.description': 'Intensive practical curriculum covering basic and advanced programming concepts, with hands-on experience in modern web technologies, database management, and software development methodologies.',
    'education.technologist.subjects': [
      'HTML5, CSS3, and responsive design',
      'JavaScript and PHP programming',
      'Laravel framework development',
      'React Native for mobile development',
      'Database design and management',
      'Web accessibility and security',
      'Interface design and UX principles',
      'Agile development methodologies',
      'Programming logic and algorithms'
    ],
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try again',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',

    'radio.title': 'Radio',
    'radio.description': 'Songs I love'
  },
  br: {
    // Main presentation  
    'presentation.title': 'Oi, me chamo Luma 👋',
    'presentation.description': "Sou uma desenvolvedora fullstack do Amapá com mais de 3 anos de experiência criando experiências web e mobile incríveis. Trabalho na Proesc desenvolvendo soluções para instituições de ensino em projetos multidisciplinares, contribuindo para a inovação na área.",
    'presentation.location': '📍 Macapá, Amapá, Brasil',
    'presentation.experience': '3+ anos de experiência',
    'presentation.currentRole': 'Desenvolvedora Mid-level na Proesc',
    'about.me': 'Eu.',
    'about.me.description': 'Gosto de jogar videogames, ver séries com muuuitas temporadas, assistir basquete e de qualquer coisa envolvendo tecnologia e educação.',

    // Blog section
    'blog.latest': 'Últimos posts',
    'blog.all': 'Ver todos os posts',
    'blog.cta': 'Ler no dev.to',
    'blog.empty': 'Mais artigos chegando em breve!',

    'currently.learning': 'Estudando atualmente',
    'currently.learning.description': 'Habilidades em progresso',

    // Projects section
    'projects.title': 'Projetos selecionados',
    
    // Footer
    'footer.title': 'Entre em contato',
    'footer.description': 'Fique à vontade para entrar em contato para colaborações, oportunidades ou só pra bater um papo sobre tech!',
    'footer.email': 'Me mande um email',
    'footer.social': 'Me siga',
    
    // Navigation
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.home': 'Início',
    'nav.experience': 'Experiência',
    'experience.small_description': 'Um pouco sobre mim e minhas experiências :)',
    'experience.responsibilities': 'Responsabilidades',
    // About page
    'about.title': 'Sobre Mim',
    'about.connect.title': 'Vamos nos conectar!',
    'about.description': 'Desenvolvedora fullstack apaixonada por criar aplicações funcionais que resolvem problemas reais. Comecei minha carreira na Proesc em 2021 como dev júnior e venho crescendo desde então! Também gosto bastante de trabalhar em equipe e ajudar a comunidade de tecnologia :) ',

    'experience.title': 'Minhas Experiências',
    'projects.description': 'Aqui estão alguns projetinhos de código aberto que fiz, principalmente para aprender novas tecnologias.',
    'projects.featured': 'Projetos em Destaque',
    'projects.others': 'Outros Projetos',
    'projects.inProgress': 'Em Desenvolvimento',
    'projects.all': 'Todos os projetos',
    
    // Blog page  
    'blog.description': 'Gosto de escrever um pouco conforme vou aprendendo coisas novas, aqui tem alguns dos meus posts.',
    'blog.total_posts': 'total de posts',
    'blog.filter.title': 'Filtrar por tags:',
    'blog.filter.all': 'Todos os Posts',
    'blog.filter.clear': 'Limpar tudo',
    'blog.filter.showAll': 'Mostrar todas as tags',
    'blog.filter.hideAll': 'Esconder tags',
    'blog.filter.search': 'Pesquisar tags...',
    'blog.filter.noResults.title': 'Nenhum post encontrado',
    'blog.filter.noResults.description': 'Tente selecionar outras tags ou limpar todos os filtros.',
    
    'coffe.title': 'Um simples café.',
    'coffe.description': 'Um simples café.',
    // Contact page
    'contact.description': 'Quer colaborar em um projeto, tem alguma pergunta ou só trocar ideia? Entre em contato :)',
    'contact.responseTime': 'Tempo de resposta',
    'contact.remoteWorldwide': 'Remoto mundial',
    'contact.quickInfo': 'Informações rápidas',
    'contact.social.title': 'Redes Sociais',
    'contact.location': 'Localização',
    'contact.locationValue': 'Amapá, Brasil (UTC-3)',
    'contact.languages': 'Idiomas',
    'contact.languagesValue': 'Português, Inglês',
    'contact.availability': 'Disponibilidade',
    'contact.availabilityValue': 'Aberta para projetos',

    // Education Timeline
    'education.technologist.title': 'Tecnólogo em Sistemas para Internet',
    'education.technologist.institution': 'Faculdade de Tecnologia do Amapá',
    'education.technologist.period': '2020 - 2022',
    'education.technologist.description': 'Currículo prático intensivo cobrindo conceitos básicos e avançados de programação, com experiência hands-on em tecnologias web modernas, gerenciamento de bancos de dados e metodologias de desenvolvimento de software.',
    'education.technologist.subjects': [
      'HTML5, CSS3 e design responsivo',
      'Programação JavaScript e PHP',
      'Desenvolvimento com framework Laravel',
      'React Native para desenvolvimento mobile',
      'Design e gerenciamento de bancos de dados',
      'Acessibilidade web e segurança',
      'Design de interface e princípios de UX',
      'Metodologias ágeis de desenvolvimento',
      'Lógica de programação e algoritmos'
    ],
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Algo deu errado',
    'common.retry': 'Tentar novamente',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',

    'radio.title': 'Rádio',
    'radio.description': 'Músicas que amo'
  },
} as const;