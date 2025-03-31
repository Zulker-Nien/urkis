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
    date: "Sep 2022 - Jan 2025",
    cgpa: "3.83",
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
    ],
    image: "tecbix",
    source_code_link: "https://github.com/Zulker-Nien/tecbix",
  },
  {
    name: "Petopia",
    description:
      "A Single page landing application demonstrating the structural, responsive and bright design to lure the users into taking better care of their pets because it has everything you need for a pet.",
    tags: [
      {
        name: "nextjs",
        color: "yellow-500",
      },
      {
        name: "tailwind",
        color: "orange-500",
      },
    ],
    image: "petopia",
    source_code_link: "https://github.com/Zulker-Nien/petopia",
  },
  {
    name: "Mini e commerce",
    description:
      "Web application that enables users to search for products, view categories of products, add to cart and order a dummy product. Use of fakestore.api helped with the restfulness",
    tags: [
      {
        name: "nextjs",
        color: "yellow-800",
      },
      {
        name: "restapi",
        color: "orange-800",
      },

      {
        name: "typescript",
        color: "blue-500",
      },
    ],
    image: "",
    source_code_link: "https://github.com/Zulker-Nien/mini-e-commerce",
  },
  {
    name: "Quemailer",
    description:
      "The beauty of three.js can be seen here. I have multiple implementations in mind. Currently learning 3d modelling on top of my UI/UX and graphics designing certification.",
    tags: [
      {
        name: "nextjs",
        color: "yellow-500",
      },
      {
        name: "nodejs",
        color: "orange-500",
      },
      {
        name: "typescript",
        color: "blue-500",
      },
      {
        name: "zustand",
        color: "blue-500",
      },
      {
        name: "sequelize",
        color: "blue-500",
      },
    ],
    image: "tecbix",
    // source_code_link: "https://github.com/Zulker-Nien/tecbix",
  },
  {
    name: "Petopia",
    description:
      "A Single page landing application demonstrating the structural, responsive and bright design to lure the users into taking better care of their pets because it has everything you need for a pet.",
    tags: [
      {
        name: "nextjs",
        color: "yellow-500",
      },
      {
        name: "tailwind",
        color: "orange-500",
      },
    ],
    image: "petopia",
    source_code_link: "https://github.com/Zulker-Nien/petopia",
  },
  {
    name: "Mini e commerce",
    description:
      "Web application that enables users to search for products, view categories of products, add to cart and order a dummy product. Use of fakestore.api helped with the restfulness",
    tags: [
      {
        name: "nextjs",
        color: "yellow-500",
      },
      {
        name: "restapi",
        color: "orange-500",
      },

      {
        name: "typescript",
        color: "blue-500",
      },
    ],
    image: "",
    source_code_link: "https://github.com/Zulker-Nien/mini-e-commerce",
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
