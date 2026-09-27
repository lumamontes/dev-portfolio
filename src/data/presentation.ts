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
    "Hi! My name is Luma. I'm a software developer from Macapá - Amapá, Brazil.",
  socials: [
    {
      label: "Github",
      link: "https://github.com/lumamontes",
    },
     {
      label: "Email",
      link: "mailto:lumagoesmontes@gmail.com",
    },
    {
      label: "Linkedin",
      link: "https://www.linkedin.com/in/lumamontes/",
    },
  ],
};

export default presentation;
