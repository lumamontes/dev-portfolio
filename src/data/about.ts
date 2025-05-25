import type { Experience } from "./ui";

type AboutTranslations = {
  'skills.title': string;
  'skills.subtitle': string;
  'skills.frontend': string;
  'skills.backend': string;
  'frontend.skills': string[];
  'backend.skills': string[];

  'experience.title': string;
  'experience.subtitle': string;
  'experience.junior.learning_and_growth': string;

  'connect.title': string;
  'connect.subtitle': string;
  'connect.professional_network': string;
  'connect.open_source_projects': string;
  'connect.direct_contact': string;
  'connect.connect_with_me': string;
};

export const about: Record<'en' | 'br', AboutTranslations> = {
  en: {
    // Skills section
    'skills.title': 'Technical Arsenal',
    'skills.subtitle': 'always.learning',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'frontend.skills': [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS'
    ],
    'backend.skills': [
      'PHP',
      'Laravel',
      'Node.js',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
      'PHPUnit',
      'Jest'
    ],

    // Experience section
    'experience.title': 'Professional Journey',
    'experience.subtitle': 'experience.timeline',
    'experience.junior.learning_and_growth': 'Learning & Growth:',

    // Connect section
    'connect.title': 'Let\'s Connect',
    'connect.subtitle': 'let\'s.collaborate',
    'connect.professional_network': 'Professional network & career updates',
    'connect.open_source_projects': 'Open source projects & code repositories',
    'connect.direct_contact': 'Direct contact for collaboration opportunities',
    'connect.connect_with_me': 'Connect with me'
  },
  
  br: {
    // Skills section
    'skills.title': 'Habilidades Técnicas',
    'skills.subtitle': 'sempre.aprendendo',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'frontend.skills': [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS'
    ],
    'backend.skills': [
      'PHP',
      'Laravel',
      'Node.js',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
      'PHPUnit',
      'Jest'
    ],

    // Experience section
    'experience.title': 'Jornada Profissional',
    'experience.subtitle': 'linha.do.tempo',
    'experience.junior.learning_and_growth': 'Aprendizado e Crescimento:',

    // Connect section
    'connect.title': 'Vamos nos Conectar',
    'connect.subtitle': 'vamos.colaborar',
    'connect.professional_network': 'Rede profissional e atualizações de carreira',
    'connect.open_source_projects': 'Projetos open source e repositórios de código',
    'connect.direct_contact': 'Contato direto para oportunidades de colaboração',
    'connect.connect_with_me': 'Conecte-se comigo'
  }
} as const;

export const experiences: Record<'en' | 'br', {
  title: string;
  subtitle: string;
  items: Experience[];
}> = {
  en: {
    title: 'Professional Journey',
    subtitle: 'experience.timeline',
    items: [
      {
        id: 'mid-developer',
        title: 'Mid-Level Developer',
        company: 'Proesc',
        period: 'Oct 2022 - Present',
        location: 'Remote, Brazil',
        description: 'Advanced to mid-level role with expanded responsibilities across the full development lifecycle. Leading mobile app deployment and managing both iOS and Android applications in app stores.',
        responsibilities: [
          'Developing and maintaining frontend, backend, and mobile applications',
          'Creating comprehensive test suites and conducting thorough code reviews',
          'Managing iOS and Android app store deployments and version control',
          'Creating technical documentation and educational materials',
          'Conducting workshops and knowledge-sharing sessions with the team',
          'Mentoring junior developers and providing technical support'
        ],
        type: 'development',
        level: 'mid',
        current: true
      },
      {
        id: 'junior-developer',
        title: 'Junior Developer',
        company: 'Proesc',
        period: 'Dec 2021 - Oct 2022',
        location: 'Remote, Brazil',
        description: 'Started my professional journey developing features for educational management systems. Gained experience in full-stack development while contributing to solutions that help educational institutions.',
        responsibilities: [
          'Developing new features for educational management platform',
          'Maintaining and improving existing codebase',
          'Creating detailed technical documentation',
          'Providing technical support to customer service department',
          'Assisting other company departments with technical solutions',
          'Learning and implementing best practices in web development'
        ],
        type: 'development',
        level: 'junior'
      },
      {
        id: 'support-level-3',
        title: 'Technical Support Analyst - Level 3',
        company: 'Proesc',
        period: 'Jun 2021 - Dec 2021',
        location: 'Remote, Brazil',
        description: 'Resolution of high complexity tickets escalated by previous support levels, codebase maintenance and internal team assistance.',
        responsibilities: [
          'Resolved complex technical tickets requiring code-level solutions',
          'Performed codebase maintenance using PHP and Laravel',
          'Collaborated with development team on technical solutions',
          'Used PostgreSQL for database troubleshooting',
          'Applied Scrum methodology in daily operations',
          'Provided technical guidance to lower-level support staff'
        ],
        type: 'support',
        level: 'support3'
      },
      {
        id: 'support-level-2',
        title: 'Technical Support Analyst - Level 2',
        company: 'Proesc',
        period: 'Aug 2020 - Jun 2021',
        location: 'Remote, Brazil',
        description: 'Resolution of medium complexity technical tickets, codebase maintenance and customer contact via email. Requirements gathering with clients, report creation and internal team assistance.',
        responsibilities: [
          'Handled medium complexity technical support cases',
          'Maintained direct client communication via email',
          'Gathered requirements and created detailed reports',
          'Performed minor codebase maintenance tasks',
          'Collaborated with development team on customer issues',
          'Documented solutions and best practices'
        ],
        type: 'support',
        level: 'support2'
      },
      {
        id: 'support-level-1',
        title: 'Technical Support Analyst - Level 1',
        company: 'Proesc',
        period: 'Mar 2020 - Aug 2020',
        location: 'Remote, Brazil',
        description: 'Customer service through chat and email. Creation of manuals/articles for knowledge base. Ticket triage and cataloging through helpdesk.',
        responsibilities: [
          'Provided first-level customer support via chat and email',
          'Created comprehensive user manuals and knowledge base articles',
          'Managed ticket triage and helpdesk operations',
          'Implemented Scrum methodology in support processes',
          'Maintained high customer satisfaction ratings',
          'Trained new support team members'
        ],
        type: 'support',
        level: 'support1'
      },
    ]
  },
  br: {
    title: 'Jornada Profissional',
    subtitle: 'linha.do.tempo',
    items: [
      {
        id: 'mid-developer',
        title: 'Desenvolvedor Pleno',
        company: 'Proesc',
        period: 'Out 2022 - Presente',
        location: 'Remoto, Brasil',
        description: 'Promovido para função plena com responsabilidades expandidas em todo o ciclo de desenvolvimento. Liderando implementação de aplicativos móveis e gerenciando aplicações iOS e Android nas lojas.',
        responsibilities: [
          'Desenvolvendo e mantendo aplicações frontend, backend e mobile',
          'Conduzindo revisões de código',
          'Estudando e implementando ferramentas e tecnologias novas',
          'Gerenciando implementações nas lojas iOS e Android e controle de versão',
          'Criando documentação técnica e materiais educacionais',
          'Conduzindo workshops e sessões de compartilhamento de conhecimento',
          'Mentorando desenvolvedores juniores e fornecendo suporte técnico'
        ],
        type: 'development',
        level: 'mid',
        current: true
      },
      {
        id: 'junior-developer',
        title: 'Desenvolvedor Júnior',
        company: 'Proesc',
        period: 'Dez 2021 - Out 2022',
        location: 'Remoto, Brasil',
        description: 'Iniciei minha jornada profissional desenvolvendo funcionalidades para sistemas de gestão educacional. Ganhei experiência em desenvolvimento full-stack contribuindo com soluções para instituições educacionais.',
        responsibilities: [
          'Desenvolvendo novas funcionalidades para plataforma de gestão educacional',
          'Mantendo e melhorando base de código existente',
          'Criando documentação técnica detalhada',
          'Fornecendo suporte técnico ao departamento de atendimento',
          'Auxiliando outros departamentos com soluções técnicas',
          'Aprendendo e implementando melhores práticas em desenvolvimento web'
        ],
        type: 'development',
        level: 'junior'
      },
      {
        id: 'support-level-3',
        title: 'Analista de Suporte Técnico - Nível 3',
        company: 'Proesc',
        period: 'Jun 2021 - Dez 2021',
        location: 'Remoto, Brasil',
        description: 'Resolução de tickets de alta complexidade escalados pelos níveis anteriores, manutenção de base de código e auxílio à equipe interna.',
        responsibilities: [
          'Resolvi tickets técnicos complexos que requeriam soluções em código',
          'Realizei manutenção de base de código usando PHP e Laravel',
          'Colaborei com equipe de desenvolvimento em soluções técnicas',
          'Usei PostgreSQL para resolução de problemas de banco de dados',
          'Apliquei metodologia Scrum nas operações diárias',
          'Forneci orientação técnica para suporte de níveis inferiores'
        ],
        type: 'support',
        level: 'support3'
      },
      {
        id: 'support-level-2',
        title: 'Analista de Suporte Técnico - Nível 2',
        company: 'Proesc',
        period: 'Ago 2020 - Jun 2021',
        location: 'Remoto, Brasil',
        description: 'Resolução de tickets técnicos de média complexidade, manutenção de base de código e contato com clientes via email. Coleta de requisitos com clientes, criação de relatórios e auxílio à equipe interna.',
        responsibilities: [
          'Lidei com casos de suporte técnico de complexidade média',
          'Mantive comunicação direta com clientes via email',
          'Coletei requisitos e criei relatórios detalhados',
          'Realizei tarefas menores de manutenção de código',
          'Colaborei com equipe de desenvolvimento em questões de clientes',
          'Documentei soluções e melhores práticas'
        ],
        type: 'support',
        level: 'support2'
      },
      {
        id: 'support-level-1',
        title: 'Analista de Suporte Técnico - Nível 1',
        company: 'Proesc',
        period: 'Mar 2020 - Ago 2020',
        location: 'Remoto, Brasil',
        description: 'Atendimento ao cliente através de chat e email. Criação de manuais/artigos para base de conhecimento. Triagem e catalogação de tickets através de helpdesk.',
        responsibilities: [
          'Forneci suporte de primeiro nível via chat e email',
          'Criei manuais abrangentes e artigos para base de conhecimento',
          'Gerenciei triagem de tickets e operações de helpdesk',
          'Implementei metodologia Scrum em processos de suporte',
          'Mantive altas taxas de satisfação do cliente',
          'Treinei novos membros da equipe de suporte'
        ],
        type: 'support',
        level: 'support1'
      },
    ]
  }
} as const;