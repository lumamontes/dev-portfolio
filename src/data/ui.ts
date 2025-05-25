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
    'presentation.description': "I'm a full-stack developer from Macapá, Brazil, passionate about creating awesome web and mobile experiences. Currently working at Proesc, building educational solutions that actually make a difference",
    'presentation.subtitle': 'Full-stack Developer & Tech Enthusiast',
    'presentation.location': '📍 Macapá, Amapá, Brazil',
    'presentation.experience': '3+ years of experience',
    'presentation.currentRole': 'Mid-level Developer at Proesc',
    'currently.learning': 'Currently Learning',
    'currently.learning.description': 'Skills in progress',
    'about.me': 'Me.',
    'about.me.description': 'I like to code, but I also like to play videogames, watch movies, series and sports, and things that involve technology and education.',
    // Blog section
    'blog.latest': 'Latest posts',
    'blog.all': 'See all posts',
    'blog.cta': 'Read on dev.to',
    'blog.empty': 'More articles coming soon!',
    
    // Projects section
    'projects.title': 'Selected projects',
    'projects.viewCode': 'View code',
    'projects.viewLive': 'Live demo',
    'projects.technologies': 'Built with',
    'projects.all': 'All projects',
    
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
    'nav.resume': 'Resume',
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'experience.small_description': 'A little bit about me and my experiences',
    'experience.responsibilities': 'Responsibilities',
    // About page
    'about.title': 'About Me',
    'about.description': 'Full-stack developer who loves creating beautiful, functional applications that solve real problems.',
    'about.intro': 'Hey there! I\'m Luma, a developer who gets excited about clean code, great user experiences, and learning new technologies. I work with both frontend and backend, currently specializing in React Native, Next.js, and Laravel.',
    'about.journey': 'My Journey',
    'about.journey.description': 'Started my career at Proesc in 2021 as a junior developer, and I\'ve been growing ever since. I love sharing knowledge through workshops, code reviews, and blog posts. Currently pursuing an MBA in Full-stack Development while working on challenging projects.',
    'about.skills.title': 'Technologies I work with',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend', 
    'about.skills.mobile': 'Mobile',
    'about.skills.tools': 'Tools & Others',
    'about.skills.learning': 'Currently learning',
    'about.connect.title': 'Let\'s connect!',
    'about.connect.description': 'I\'m always excited to meet fellow developers and discuss technology, projects, or just chat!',
    'about.values.title': 'What drives me',
    'about.values.learning': 'Continuous Learning',
    'about.values.learning.desc': 'Always exploring new technologies and best practices',
    'about.values.collaboration': 'Team Collaboration', 
    'about.values.collaboration.desc': 'Believing that the best solutions come from working together',
    'about.values.impact': 'Real Impact',
    'about.values.impact.desc': 'Building solutions that genuinely help people and organizations',
    
    // Projects page
    'projects.description': 'Here are some projects I\'ve been working on. Each one taught me something new!',
    'projects.featured': 'Featured Projects',
    'projects.others': 'Other Projects',
    'projects.inProgress': 'Work in Progress',
    
    // Blog page
    'blog.description': 'I love sharing what I learn! Here you\'ll find my thoughts on technology, tutorials, and insights from my development journey.',
    'blog.total_posts': 'total posts',
    'blog.topics': 'Topics I write about',
    'blog.react': 'React & React Native',
    'blog.state': 'State Management',
    'blog.mobile': 'Mobile Development',
    'blog.webdev': 'Web Development',
    
    // Contact page
    'contact.description': 'Whether you want to collaborate on a project, have a question, or just want to say hi - I\'d love to hear from you!',
    'contact.responseTime': 'Response time',
    'contact.remoteWorldwide': 'Remote worldwide',
    'contact.social.title': 'Find me online',
    'contact.response': 'Thanks for reaching out! I\'ll get back to you soon 😊',
    'contact.quickInfo': 'Quick Info',
    'contact.location': 'Location',
    'contact.locationValue': 'Brazil (UTC-3)',
    'contact.languages': 'Languages',
    'contact.languagesValue': 'Portuguese, English',
    'contact.availability': 'Availability',
    'contact.availabilityValue': 'Open for projects',
    // Resume page
    'resume.title': 'Resume',
    'resume.description': 'Download my resume or view my professional experience',
    'resume.download': 'Download PDF',
    'resume.experience': 'Professional Experience',
    'resume.education': 'Education',
    'resume.skills': 'Technical Skills',
    'resume.languages': 'Languages',
    'resume.current': 'Present',

    'experience.title': 'My Experiences',
    'experience.subtitle': '',
    
    'experience.timeline.title': 'My Professional Journey',
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
        // Skills section
        'skills.title': 'Technical Arsenal',
        'skills.subtitle': 'always.learning',
        'skills.frontend': 'Frontend',
        'skills.backend': 'Backend',
        'skills.tools': 'Tools & DevOps',
        'frontend.skills': [
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Astro',
          'HTML5/CSS3'
        ],
        'backend.skills': [
          'Node.js',
          'Laravel',
          'PHP',
          'Python',
          'MySQL',
          'PostgreSQL',
          'REST APIs'
        ],
        'tools.skills': [
          'Git',
          'Docker',
          'AWS',
          'Figma',
          'VS Code',
          'Linux',
          'CI/CD'
        ],
        'coffe.title': 'A cup of coffee.',
        'coffe.description': 'A cup of coffee.',
        // Connect section
        'connect.title': 'Let\'s Connect',
        'connect.subtitle': 'let\'s.collaborate',
        'connect.professional_network': 'Professional network & career updates',
        'connect.open_source_projects': 'Open source projects & code repositories',
        'connect.direct_contact': 'Direct contact for collaboration opportunities',
        'connect.connect_with_me': 'Connect with me',
        'radio.title': 'Radio',
        'radio.description': 'Songs i love'
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
    'projects.viewCode': 'Ver código',
    'projects.viewLive': 'Demo ao vivo',
    'projects.technologies': 'Feito com',
    
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
    'about.description': 'Desenvolvedora fullstack apaixonada por criar aplicações funcionais que resolvem problemas reais. Comecei minha carreira na Proesc em 2021 como dev júnior e venho crescendo desde então! Também gosto bastante de trabalhar em equipe e ajudar a comunidade de tecnologia :) ',
    'about.intro': 'E aí! Eu sou a Luma, uma dev que fica empolgada com código limpo, experiências de usuário incríveis e aprender tecnologias novas. Trabalho tanto com frontend quanto backend, atualmente me especializando em React Native, Next.js e Laravel.',
    'about.skills.title': 'Tecnologias que trabalho',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.mobile': 'Mobile', 
    'about.skills.tools': 'Ferramentas e Outros',
    'about.skills.learning': 'Estudando atualmente',
    'about.connect.title': 'Vamos nos conectar!',
    'about.connect.description': 'Sempre fico empolgada em conhecer outros devs e discutir tecnologia, projetos ou só trocar uma ideia!',
    'about.values.title': 'O que me motiva',
    'about.values.learning': 'Aprendizado Contínuo',
    'about.values.learning.desc': 'Sempre explorando novas tecnologias e boas práticas',
    'about.values.collaboration': 'Colaboração em Equipe',
    'about.values.collaboration.desc': 'Acreditando que as melhores soluções vêm do trabalho em conjunto',
    'about.values.impact': 'Impacto Real',
    'about.values.impact.desc': 'Construindo soluções que realmente ajudam pessoas e organizações',

    'skills.title': 'Arsenal Técnico',
    'experience.title': 'Minhas Experiências',
    'skills.subtitle': 'sempre.aprendendo',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Ferramentas & DevOps',
    'frontend.skills': [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Astro',
      'HTML5/CSS3'
    ],
    'backend.skills': [
      'Node.js',
      'Laravel',
      'PHP',
      'Python',
      'MySQL',
      'PostgreSQL',
      'REST APIs'
    ],
    'tools.skills': [
      'Git',
      'Docker',
      'AWS',
      'Figma',
      'VS Code',
      'Linux',
      'CI/CD'
    ],

    // Philosophy section
    // 'about.connect.title': 'Vamos nos Conectar',
    'about.connect.subtitle': 'vamos.colaborar',
    'about.connect.professional_network': 'Rede profissional e atualizações de carreira',
    'about.connect.open_source_projects': 'Projetos open source e repositórios de código',
    'about.connect.direct_contact': 'Contato direto para oportunidades de colaboração',
    'about.connect.connect_with_me': 'Conecte-se comigo',
    
    // Projects page
    'projects.description': 'Aqui estão alguns projetinhos de código aberto que fiz, principalmente para aprender novas tecnologias.',
    'projects.featured': 'Projetos em Destaque',
    'projects.others': 'Outros Projetos',
    'projects.inProgress': 'Em Desenvolvimento',
    'projects.all': 'Todos os projetos',
    
    // Blog page  
    'blog.description': 'Gosto de escrever um pouco conforme vou aprendendo coisas novas, aqui tem alguns dos meus posts.',
    'blog.total_posts': 'total de posts',
    'blog.topics': 'Assuntos que escrevo sobre',
    'blog.react': 'React & React Native',
    'blog.state': 'Gerenciamento de Estado',
    'blog.mobile': 'Desenvolvimento Mobile',
    'blog.webdev': 'Desenvolvimento Web',
    
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