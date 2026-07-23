import Images from "./image";
import {
  educationType,
  experienceType,
  researchType,
  projectItem,
  testimonialType,
  coreSkillsType,
} from "./types";
import { Box, BrainCircuit, FileStack, Palette, Rotate3D } from "lucide-react";
const experiences: experienceType = [
  {
    title: "Freelance Web Developer | 3D Web developer",
    company_name: "Upwork",
    icon: Images.Upwork,
    iconBg: "#fff",
    date: "Aug 2020 - Present",
    points: [
      "As a dedicated freelance developer, I create engaging web and mobile applications using React, Next, Three.js, and React Native, significantly boosting user engagement and website traffic. I also design visually stunning elements with Adobe XD, Illustrator, Photoshop, and Blender, earning consistent 5-star reviews from clients. My work in web development, graphic design, and 3D modeling focuses on delivering high-quality results and building long-lasting client relationships through a collaborative approach.As a dedicated freelance developer, I create engaging web and mobile applications using React, Next, Three.js, and React Native, significantly boosting user engagement and website traffic. I also design visually stunning elements with Adobe XD, Illustrator, Photoshop, and Blender, earning consistent 5-star reviews from clients. My work in web development, graphic design, and 3D modeling focuses on delivering high-quality results and building long-lasting client relationships through a collaborative approach.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Quadque Technologies Ltd.",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "Sep 2023 - Aug 2024",
    points: [
      "During my time here, I was affiliated with two projects. A CRM software was already under development where I helped to update and add further features. But I am mostly proud of the Email Marketing application where I implemented all my knowledge that I accumulated this far into the journey of my career. Currently, more than 20 companies are using this application.",
    ],
  },

  {
    title: "Business Analyst",
    company_name: "Inside Maps",
    icon: Images.Insidemaps,
    iconBg: "#fff",
    date: "Sep 2021 – Nov 2023",
    points: [
      "As a Business Analyst at InsideMaps, I worked with a remote team to audit and resolve project issues, boosting completion rates and reducing customer complaints. I assigned projects based on team members' skills and created detailed analytics on Google Spreadsheets for US states, which improved project accuracy and reduced delays. I also strategically scheduled rework projects based on date, error rate, and completeness, contributing to the company's success.",
    ],
  },

  {
    title: "Full Stack Developer | Team Leader | Agile Enthusiast",
    company_name: "Aveneur Solutions",
    icon: Images.Aveneur,
    iconBg: "#f4f4f4",
    date: "Nov 2020 – Jul 2021",
    points: [
      "As a skilled full stack developer and team leader, I have guided teams in developing web applications that increased revenue and client satisfaction. My experience includes designing and developing in-house products, implementing an agile environment, and creating seamless user experiences for mobile and web applications. With a strong background in UI/UX design, I craft efficient and visually appealing prototypes using Adobe XD and Figma. Committed to fostering collaboration and innovation, I leverage my technical expertise and leadership skills to deliver high-quality products and ensure project success.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Cerulean Creative Technologies",
    icon: Images.Cerulean,
    iconBg: "#FFFFFF",
    date: "Jan 2020 – Nov 2020",
    points: [
      "During my internship at Cerulean Creative Technologies, I honed my front-end development and graphic design skills by developing and deploying websites using ASP.NET Core and React, ensuring seamless user experiences. I also created UI/UX prototypes with Adobe XD and Photoshop, enhancing the aesthetics and functionality of various projects. This experience provided me with a strong foundation in both front-end development and graphic design for my future in the tech industry.",
    ],
  },
];
const education: educationType = [
  {
    title: "Masters in Software Engineering",
    university: "United International University",
    icon: Images.UIU,
    iconBg: "#fff",
    date: "Sep 2022 - Dec 2024",
    cgpa: "3.5",
  },
  {
    title: "Bachelor's in Computer Science",
    university: "Independent University, Bangladesh",
    icon: Images.IUB,
    iconBg: "#fff",
    date: "Sep 2016 - Dec 2020",
    cgpa: "3.01",
  },

  {
    title: "A-levels",
    university: "Private",
    icon: Images.PRIVATE,
    iconBg: "#fff",
    date: "Jan 2015 - Jan 2016",
    cgpa: null,
  },
  {
    title: "O-levels",
    university: "Private",
    icon: Images.PRIVATE,
    iconBg: "#fff",
    date: "June 2013 - June 2014",
    cgpa: null,
  },
  {
    title: "Primary & Secondary School",
    university: "Maple Leaf International School",
    icon: Images.MLIS,
    iconBg: "#fff",
    date: "1999-2012",
    cgpa: null,
  },
];
const research: researchType = [
  {
    title: "Use of Ai in advancing SRHR interventions",
    type: "Q1 Systematic Review",
    status: "In Peer Review",
    journal: "Heliyon",
  },
  {
    title: "Use of Ai in advancing Mental Health interventions",
    type: "Q1 Systematic Review",
    status: "In Peer Review",
    journal: "Heliyon",
  },
  {
    title: "Ai for screening common cancers",
    type: "Book Chapter",
    status: "Published",
    book: "Artificial Intelligence in e-Health Framework V1",
    link: "https://www.sciencedirect.com/science/article/abs/pii/B9780443138164000164",
  },
];
const testimonials: testimonialType = [
  {
    testimonial:
      "Zulker brings in great energy in every conversation. Working with him is like working with a friend. Further, he is very passionate about the work and I believe he will do great things as we move forward. I highly recommend him.",
    name: "Zeno Saviour",
    designation: "Founder & Software Developer",
    company: "Characters.xyz",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    testimonial:
      "Nice to work with Zulker. He is very responsible Person. Provide good quality work with fast turnaround. I recommend. A++++",
    name: "Priyanka",
    designation: "Project Manager",
    company: "Magenta",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    testimonial:
      "Amazing young developer delivered my gig in a record time. Attention to detail and such an awesome fresh design. I like the initiative you took. Your customer skills is awesome. I'm a happy customer, will definitely use you again and again",
    name: "Kureish Isaacs",
    designation: "Life Coach",
    company: "Footprints Lifecoaching",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];
const projects: projectItem = [
  {
    name: "The Deltagram",
    description:
      "The beauty of three.js can be seen here. I have multiple implementations in mind. Currently learning 3d modelling on top of my UI/UX and graphics designing certification.",
    tags: [
      {
        name: "NestJS",
        color: "yellow-500",
      },
      {
        name: "TypeScript",
        color: "orange-500",
      },
      {
        name: "Next.js",
        color: "blue-500",
      },
      {
        name: "PostgreSQL",
        color: "blue-500",
      },
      {
        name: "Redis",
        color: "blue-500",
      },
      {
        name: "Meilisearch",
        color: "blue-500",
      },
      {
        name: "SSLCommerz",
        color: "blue-500",
      },
      {
        name: "FFMpeg",
        color: "blue-500",
      },
      {
        name: "Google Advertising and Tracking",
        color: "blue-500",
      },
      {
        name: "GROQ Ai",
        color: "blue-500",
      },
      {
        name: "Google Analytics",
        color: "blue-500",
      },
      
    ],
    image:
      "data:image/png;base64,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",
    website: "https://thedeltagram.com/",
  },

  {
    name: "Celestial",
    description:
      "",
    tags: [
      {
        name: "nextjs",
        color: "yellow-500",
      },
      {
        name: "threejs",
        color: "orange-500",
      },
      {
        name: "blender",
        color: "blue-500",
      },
      {
        name: "zustand",
        color: "blue-500",
      },
      {
        name: "shadcn",
        color: "blue-500",
      },
      {
        name: "GPU or shader programming",
        color: "blue-500",
      },
    ],
    image:
      "https://www.feelthecelestial.com/NavLogo.svg",
    website: "https://feelthecelestial.com/",
  },
  {
    name: "Tecbix",
    description:
      "The beauty of three.js can be seen here. I have multiple implementations in mind. Currently learning 3d modelling on top of my UI/UX and graphics designing certification.",
    tags: [
      {
        name: "reactjs",
        color: "yellow-500",
      },
      {
        name: "threejs",
        color: "orange-500",
      },
      {
        name: "typescript",
        color: "blue-500",
      },
      {
        name: "MobX",
        color: "blue-500",
      },
    ],
    image:
      "https://github.com/Zulker-Nien/tecbix/blob/master/public/2.png?raw=true",
    source_code_link: "https://github.com/Zulker-Nien/tecbix",
    website: "https://tecbix-sandy.vercel.app/",
  },
  {
    name: "Shawn Novel and Associates",
    description:
      "The beauty of three.js can be seen here. I have multiple implementations in mind. Currently learning 3d modelling on top of my UI/UX and graphics designing certification.",
    tags: [
      {
        name: "reactjs",
        color: "yellow-500",
      },
      {
        name: "javascript",
        color: "orange-500",
      },
      {
        name: "MobX",
        color: "blue-500",
      },
      {
        name: "django",
        color: "blue-500",
      },
    ],
    image:
      "https://scontent.fdac24-1.fna.fbcdn.net/v/t39.30808-6/301972539_606850620878364_8423124551965945664_n.jpg?stp=dst-jpg_tt6&cstp=mx900x900&ctp=s900x900&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Rzhe51gSLmsQ7kNvwEO6YWO&_nc_oc=AdqGrXHtFG8qMmFp90KgVWy7RRMKdqBGxhmv0n9kYtgx18b_EvlwQUGrqHl9MYTHX68&_nc_zt=23&_nc_ht=scontent.fdac24-1.fna&_nc_gid=JpvBpHV45vYuOWeIT6ZYaw&_nc_ss=7b2a8&oh=00_AQBqS1gSXq3S2dAIhRJga15Z0MQn187g9rhFMycLYClCaQ&oe=6A67D662",
    website: "https://www.shawnnovel.com/",
  },
  
  
 
  
];
const coreSkills: coreSkillsType = [
  {
    name: "Full Stack Development",
    content: "React, Next.js, NestJS, Node.js, PostgreSQL",
    icon: FileStack,
  },
  {
    name: "3D Web",
    content: "Immersive experiences with Three.js & WebGL",
    icon: Rotate3D,
  },
  {
    name: "UI/UX Design",
    content: " Creating intuitive and engaging user experiences",
    icon: Palette,
  },
  {
    name: "Team & Product Management",
    content: "Leading teams and driving product strategy",
    icon: Box,
  },
  {
    name: "Ai & Research",
    content: "Technical analysis and AI applications in healthcare",
    icon: BrainCircuit,
  },
];

export { experiences, testimonials, projects, education, research, coreSkills };
