type Social = {
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
};

const presentation: Presentation = {
  mail: "lumagoesmontes@gmail.com",
  title: "Hi, I’m Luma 👋",
  description:
    "Hi! My name is Luma. I'm a software developer from Macapá - Amapá, Brazil. I work at Proesc, building solutions to helping improve educational needs from educational instituications in multi-disciplinary projects.",
  socials: [
    {
      label: "Email",
      link: "mailto:lumagoesmontes@gmail.com",
    },
    {
      label: "Linkedin",
      link: "https://www.linkedin.com/in/lumamontes/",
    },
    {
      label: "Github",
      link: "https://github.com/lumamontes",
    },
  ],
};

export default presentation;
