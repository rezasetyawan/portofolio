export interface WorkItem {
  company: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}

export interface EducationItem {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
}

export interface ProjectLink {
  type: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  image: string;
  video: string;
}

export const DATA = {
  name: "Reza Setyawan",
  initials: "RS",
  url: "https://rezasetyawan.my.id",
  location: "Indonesia",
  description: "Full Stack Developer",
  summary:
    "I’m a Full Stack Developer who has built web apps and services with modern tools. These days, I’m enjoying life outside the screen a bit more, actually touching grass. Still, I enjoy solving problems when they come up and picking up new skills along the way.",
  skills: [
    "Laravel",
    "Express.js",
    "Nest.js",
    "Supabase",
    "Firebase",
    "React.js",
    "Next.js",
    "Vue.js",
    "Astro.js",
    "Tailwind CSS",
    "Shadcn UI",
    "Bootstrap",
    "Typescript",
    "Node.js",
    "Postgres",
  ],
  navbar: [
    { href: "#top", label: "camp" },
    { href: "#about", label: "chronicle" },
    { href: "#work", label: "guilds" },
    { href: "#skills", label: "arsenal" },
    // { href: "#projects", label: "works" },
    { href: "#contact", label: "raven" },
  ],
  contact: {
    email: "setyawanreza960@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rezasetyawan",
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rezasetyawan",
      },
      Email: {
        name: "Email",
        url: "mailto:setyawanreza960@gmail.com",
      },
    },
  },
  work: [
    {
      company: "Anihost",
      location: "Onsite",
      title: "Full Stack Developer",
      logoUrl: "/anihost.svg",
      start: "May 2024",
      end: "Present",
      description:
        "Building a ticketing system application and maintaining a reconciliation application. Integrating third-party APIs for transaction synchronization. Collaborating with the team to deliver a seamless user experience.",
    },
    {
      company: "Can Creative",
      location: "Hybrid",
      title: "Intern Front End Developer",
      logoUrl: "/cancreative.png",
      start: "July 2023",
      end: "December 2024",
      description:
        "Developed responsive, user-friendly websites from UI/UX designs. Built and maintained e-commerce platforms using Vue.js, Nuxt.js, Tailwind CSS, Supabase, and Bootstrap, collaborating with the team to meet client needs.",
    },
  ] satisfies readonly WorkItem[],
  education: [
    {
      school: "Asia Cyber University",
      href: "https://unsia.ac.id",
      degree: "Undergraduate, Bachelor’s Degree in Informatics",
      logoUrl: "/unsia.png",
      start: "November 2024",
      end: "Present",
    },
  ] satisfies readonly EducationItem[],
  projects: [
    {
      title: "Learningspace",
      dates: "Jan 2024 - Feb 2024",
      description: "Modern simple web based learning management system.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "DrizzleOrm",
        "TailwindCSS",
        "Shadcn UI",
        "Nest.js",
      ],
      links: [],
      image: "/learningspace.webp",
      video: "",
    },
  ] satisfies readonly ProjectItem[],
} as const;
