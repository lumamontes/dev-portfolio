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
  'expo-router-auth': 'https://private-user-images.githubusercontent.com/60052718/305679619-96fcc986-0bed-4e6a-86ab-be8aff01afc6.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI0OTQsIm5iZiI6MTc0ODE2MjE5NCwicGF0aCI6Ii82MDA1MjcxOC8zMDU2Nzk2MTktOTZmY2M5ODYtMGJlZC00ZTZhLTg2YWItYmU4YWZmMDFhZmM2LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4MzYzNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNlZGUwYWM1NzA5YjczY2QxMjU1ZTQ1MGExMWViMGRkYWNkNDY2MjJlZGUxOWMzOGY5MGIwNTc0YTg4MjYwNmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.d9EI5FJl5EH_3JUXve-J2kCMeZhPKPpE7PMdgkvbrxI',
  'photos-gallery': 'https://private-user-images.githubusercontent.com/60052718/310809398-f1df4de1-0808-454e-a040-8e6d51067269.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI2NDksIm5iZiI6MTc0ODE2MjM0OSwicGF0aCI6Ii82MDA1MjcxOC8zMTA4MDkzOTgtZjFkZjRkZTEtMDgwOC00NTRlLWEwNDAtOGU2ZDUxMDY3MjY5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4MzkwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE0ZTdkMmJkMWYxMmJlYmM5M2M2N2ZhNDQ5NmY3YTI0YTcyNjM5NmMyNGJhZDgwMGE3ZGUxODdkODg3YzQ4ZWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.a0-TVZMSk_VPDfZyzx0s2GPB3_Y8w0pfNlNpExUHqOs',
  'laravel-payments-api': 'https://private-user-images.githubusercontent.com/60052718/405128692-98b764dc-e5c8-40b0-834d-9c529b3f7c46.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI2NjYsIm5iZiI6MTc0ODE2MjM2NiwicGF0aCI6Ii82MDA1MjcxOC80MDUxMjg2OTItOThiNzY0ZGMtZTVjOC00MGIwLTgzNGQtOWM1MjliM2Y3YzQ2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4MzkyNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWZiOTBjYjFlYWEyODBjY2RkZTdhYzg0NmQ5N2YzMjNkZjdlMDc0MTk2MjVkY2UwNmNjOWFkMDQ2MjAyNjkxMjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.bj13nOqdEiQ0UZ0XrB6Ns5LQy_NWc1VWQKuG_JrN6GU',
  'biblioteca-de-zines': 'https://private-user-images.githubusercontent.com/13950513/402395622-66998486-ce02-4af1-aab7-fb2bb28ce066.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI2ODgsIm5iZiI6MTc0ODE2MjM4OCwicGF0aCI6Ii8xMzk1MDUxMy80MDIzOTU2MjItNjY5OTg0ODYtY2UwMi00YWYxLWFhYjctZmIyYmIyOGNlMDY2LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4Mzk0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM5ZWQzMTg1NDc5MWZmNjcyMDVmNjdlYWY3ZjY1YmY1MTI3NTg5MTE4OTQ0Zjc0YmM5YTliYWIxYjJlN2M5YjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.AgwI4goRd30SR5Nnxh9Hmu9QmFke7FDinUE7oq0fQUM',
  'caju': 'https://private-user-images.githubusercontent.com/60052718/311518353-ef2e68a4-8bcf-48f2-9c0b-282388e582e9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI3MzUsIm5iZiI6MTc0ODE2MjQzNSwicGF0aCI6Ii82MDA1MjcxOC8zMTE1MTgzNTMtZWYyZTY4YTQtOGJjZi00OGYyLTljMGItMjgyMzg4ZTU4MmU5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4NDAzNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU5NjNlMWQ4MmRmNGEwOGQ0ZTIyYjRhMTkzYjQ4ZTJiNzA4NTFiZDFlNTE1N2U2ZDMxNWI3ZWMzN2QxNDNhNjYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.a1rjDXKMDBFqc-jv6ubEha0C75vcy9oJX8Qn02mDgTc',
  'app-generator': 'https://private-user-images.githubusercontent.com/60052718/447302532-c73626a1-2320-40cf-8a67-90fde8dc5f0e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgxNjI3NTAsIm5iZiI6MTc0ODE2MjQ1MCwicGF0aCI6Ii82MDA1MjcxOC80NDczMDI1MzItYzczNjI2YTEtMjMyMC00MGNmLThhNjctOTBmZGU4ZGM1ZjBlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA1MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNTI1VDA4NDA1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNlZjdlYjE5NDViYjE3M2JjMTZkZWMwOTVmNDNlMTY3M2JmNWM0NjlhYjJmMzJmMTk0MTA0OGQ4NTFhZDY5YmUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.w1IX2NVwhZQBH_bIeHdVcsidjzdC9TFMNqxok9WJsxc',
  'local-first': '/project.gif',
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
