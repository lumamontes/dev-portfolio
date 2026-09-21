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
    'currently.listening': 'currently listening',
    'currently.listening.description': 'what I\'m listening to right now',
    'currently.listening.empty': 'nothing playing.',
    'presentation.title': 'Luma Montes',
    'presentation.description': "im a software engineer from a city in the extreme north of brazil called Macapá. i love coding, making random website with my twin sister Luana, contributing to community and open source projects. this website has a bit about my professional work but also some stuff about music, books, and other of my interests. i hope you enjoy it! ",
    'presentation.location': 'Macapá, Amapá, Brazil',
    'presentation.experience': '4+ years of experience',
    'presentation.currentRole': 'Software Engineer II at Arcotech',
    'about.me': 'Me.',
    'about.me.description': 'I like to play videogames, watch tv shows with maaany seasons, basketball and anything involving technology and education.',

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
    'nav.archive': 'Archive',
    'nav.experience': 'Experience',
    'experience.small_description': 'A little bit about me and my experiences :)',
    'experience.responsibilities': 'Responsibilities',

    // Archive
    'archive.pageTitle': 'Archive — Luma Goes',
    'archive.description': 'Archive of projects, zines and writing.',
    'archive.group.text': 'Writing',
    'archive.group.projects': 'Projects',
    'archive.group.music': 'Music',
    'archive.group.books': 'Books',
    'archive.group.photos': 'Photos',

    // Archive portal (entry detail page)
    'portal.index': 'Back to archive',
    'portal.navigate': 'Navigate',
    'portal.noCover': 'No cover',
    'portal.noPreview': 'No preview',
    'portal.listenOnSpotify': 'Listen on Spotify',
    'portal.openInSpotify': 'Open in Spotify',
    'portal.livePreview': 'Live preview',
    'portal.openInNewTab': 'Open in new tab',
    'portal.visitTheRealThing': 'Visit the real thing',
    'portal.originallyPublishedAt': 'Originally published at',
    'portal.readTheFullZineAt': 'Read the full zine at',
    'portal.seeThe': 'See the',
    'portal.originalPost': 'original post',
    'portal.viewSourceOn': 'View source on',
    'portal.filedUnder': 'Filed under:',
    'portal.by': 'BY',
    'portal.location': 'LOC:',
    'portal.source': 'SOURCE:',
    'portal.photo': 'photo',
    'portal.photos': 'photos',

    // About page
    'about.title': 'About Me',
    'about.description': 'Full-stack developer passionate about creating functional applications that solve real problems. I started my career at Proesc in 2021 as a junior developer and grew to Senior Developer, where I worked on frontend, backend, and mobile projects. Currently working at Arcotech as a Software Engineer II, continuing to develop solutions for educational institutions. I also really enjoy working in teams and helping the tech community :)',

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
    'currently.listening': 'ouvindo agora',
    'currently.listening.description': 'a música que tô ouvindo agora',
    'currently.listening.empty': 'nadas.',
    'presentation.title': 'Luma Montes',
    // 'presentation.description': "im a software engineer from a city in the extreme north of brazil called Macapá. i love coding, making random website with my twin sister Luana, contributing to community and open source projects. this website has a bit about my professional work but also some stuff about music, books, and other of my interests. i hope you enjoy it! ",
    'presentation.description': "sou uma engenheira de software de uma cidade no extremo norte do brasil chamada Macapá. eu amo codar, fazer uns sites bestildas e aleatórios com a minha irmã gêmea Luana, e contribuir pra comunidades e projetos open source. esse site tem um pouco sobre minhas experiências profissionais, mas também algumas coisas sobre música, livros e outros interesses. uuuhu",
    'presentation.location': 'Macapá, Amapá, Brasil',
    'presentation.experience': '4+ anos de experiência',
    'presentation.currentRole': 'Engenheira de Software II na Arcotech',
    'about.me': 'Eu.',
    'about.me.description': 'Gosto de jogar videogames, ver séries com muuuitas temporadas, assistir basquete e de qualquer coisa envolvendo tecnologia e educação.',

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
    'nav.archive': 'Arquivo',
    'nav.experience': 'Experiência',
    'experience.small_description': 'Um pouco sobre mim e minhas experiências :)',
    'experience.responsibilities': 'Responsabilidades',

    // Archive
    'archive.pageTitle': 'Arquivo — Luma Goes',
    'archive.description': 'Arquivo de projetos, zines e textos.',
    'archive.group.text': 'Textos',
    'archive.group.projects': 'Projetos',
    'archive.group.music': 'Música',
    'archive.group.books': 'Livros',
    'archive.group.photos': 'Fotos',

    // Archive portal (entry detail page)
    'portal.index': 'Voltar ao arquivo',
    'portal.navigate': 'Navegar',
    'portal.noCover': 'Sem capa',
    'portal.noPreview': 'Sem preview',
    'portal.listenOnSpotify': 'Ouvir no Spotify',
    'portal.openInSpotify': 'Abrir no Spotify',
    'portal.livePreview': 'Prévia ao vivo',
    'portal.openInNewTab': 'Abrir em nova aba',
    'portal.visitTheRealThing': 'Visitar o site',
    'portal.originallyPublishedAt': 'Publicado originalmente em',
    'portal.readTheFullZineAt': 'Leia a zine completa em',
    'portal.seeThe': 'Veja o',
    'portal.originalPost': 'post original',
    'portal.viewSourceOn': 'Veja o código-fonte no',
    'portal.filedUnder': 'Arquivado em:',
    'portal.by': 'POR',
    'portal.location': 'LOCAL:',
    'portal.source': 'FONTE:',
    'portal.photo': 'foto',
    'portal.photos': 'fotos',

    // About page
    'about.title': 'Sobre Mim',
    'about.connect.title': 'Vamos nos conectar!',
    'about.description': 'Desenvolvedora fullstack apaixonada por criar aplicações funcionais que resolvem problemas reais. Comecei minha carreira na Proesc em 2021 como dev júnior e cresci até Desenvolvedora Sênior, onde trabalhei em projetos frontend, backend e mobile. Atualmente trabalho na Arcotech como Engenheira de Software II, continuando a desenvolver soluções para instituições de ensino. Também gosto bastante de trabalhar em equipe e ajudar a comunidade de tecnologia :) ',

    'experience.title': 'Minhas Experiências',
    'projects.description': 'Aqui estão alguns projetinhos de código aberto que fiz, principalmente para aprender novas tecnologias.',
    'projects.featured': 'Projetos em Destaque',
    'projects.others': 'Outros Projetos',
    'projects.inProgress': 'Em Desenvolvimento',
    'projects.all': 'Todos os projetos',

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
