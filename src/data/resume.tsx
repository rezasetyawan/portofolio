import { Icons } from "@/components/icons";
import { Code, HomeIcon } from "lucide-react";

export const DATA = {
  name: "Reza Setyawan",
  initials: "Reza Setyawan",
  url: "https://rezasetyawan.my.id",
  location: "Indonesia",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "Full Stack Developer",
  summary:
    "I’m a Full Stack Developer who has built web apps and services with modern tools. These days, I’m enjoying life outside the screen a bit more—actually touching grass. Still, I enjoy solving problems when they come up and picking up new skills along the way.",
  avatarUrl: "/me.png",
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
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#projects", icon: Code, label: "Projects" },

    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "setyawanreza960@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rezasetyawan",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/reza-setyawan",
        icon: Icons.linkedin,
        navbar: true,
      },
      // X: {
      //   name: "X",
      //   url: "https://dub.sh/dillion-twitter",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "setyawanreza960@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Anihost",
      href: "/#",
      badges: [],
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
      badges: [],
      href: "/#",
      location: "Hybrid",
      title: "Intern Front End Developer",
      logoUrl: "/cancreative.png",
      start: "July 2023",
      end: "December 2024",
      description:
        "Developed responsive, user-friendly websites from UI/UX designs. Built and maintained e-commerce platforms using Vue.js, Nuxt.js, Tailwind CSS, Supabase, and Bootstrap, collaborating with the team to meet client needs.",
    },
  ],
  education: [
    {
      school: "Asia Cyber University",
      href: "https://unsia.ac.id",
      degree: "Undergraduate - Bachelor’s Degree in Informatics",
      logoUrl: "/unsia.png",
      start: "November 2024",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "Learningspace",
      href: "/#",
      dates: "Jan 2024 - Feb 2024",
      active: false,
      description: "Modern simple web based learning management system",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "DrizzleOrm",
        "TailwindCSS",
        "Shadcn UI",
        "Nest.js",
      ],
      links: [
        {
          type: "Website",
          href: "/#",
          icon: "globe",
        },
      ],
      image: "/learningspace.webp",
      video: "",
    },
  ],
  hackathons: [],
} as const;
