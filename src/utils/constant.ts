import Images from "./image";
import { educationType, experienceType, researchType } from "./types";

const experiences: experienceType = [
  {
    title: "Freelance Web Developer | 3D Web developer",
    company_name: "Upwork",
    icon: Images.Upwork,
    iconBg: "#fff",
    date: "Aug 2020 - Present",
    points: [
      "With over 10 clients and 5 star reviews, most of my projects included 3d frontend interactions achieved using three js. Two of my interesting projects are as follows:",
      "AR incorporated web application game for Meta Verse - My responsibility was to add 3-dimensional movement to characters based on user interactions with the application. This was achieved in Next.js using aframe and three.js for augmented reality implementation in the vector space.",
      "A Sweden based enterprise ordering system for sportswear- My responsibility was to create the software architecture, 3d customization of products by customers in real time when ordering, Invoice and Product specification document generation. This was achieved using Nest.js, reactjs.js, three.js and GraphQL with PostgreSQL.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Quadque Technologies Ltd.",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "Sep 2023 - Aug 2024",
    points: [
      "During my time here, I was affiliated with two projects. A CRM software was already under development where I helped to update and add further features.",
      "I am mostly proud of the Email Marketing application where I implemented all my knowledge that I accumulated this far into the journey of my career. Currently, more than 20 companies are using this application.",
    ],
  },

  {
    title: "Business Analyst",
    company_name: "Inside Maps",
    icon: Images.Insidemaps,
    iconBg: "#fff",
    date: "Sep 2021 – Nov 2023",
    points: [
      "As a Business Analyst at InsideMaps, I collaborated with a remote team to audit and resolve project issues, increasing completion rates and reducing customer complaints.",
      " I assigned projects based on team members' skills, created analytics on Google Spreadsheets for US states, and strategically scheduled rework projects. My contributions helped enhance project accuracy and decrease delays.",
    ],
  },

  {
    title: "Full Stack Developer | Team Leader | Agile Enthusiast",
    company_name: "Aveneur Solutions",
    icon: Images.Aveneur,
    iconBg: "#f4f4f4",
    date: "Nov 2020 – Jul 2021",
    points: [
      "Since it was a new found company, I had to take up responsibilities of different roles such as product management and product designing along with my primary role of software development which further improved my agile methodology and design thinking skills. ",
      "I attended client meetings, performed requirement engineering, created specification documents, built design prototypes, delegated tasks to teammates and completed my own tickets for development.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Cerulean Creative Technologies",
    icon: Images.Cerulean,
    iconBg: "#FFFFFF",
    date: "Jan 2020 – Nov 2020",
    points: [
      "During my time at Cerulean Creative Technologies, I developed the front-end of 2 web applications(e-commerce & industrial blog) using reactjsjs.",
      " This experience strengthened my front-end development skills, laying a solid foundation for my future in the tech industry.",
    ],
  },
];
const education: educationType = [
  {
    title: "Masters in Software Engineering",
    university: "United International University",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "Sep 2022 - Nov 2024",
    cgpa: "3.67",
  },
  {
    title: "Bachelor's in Computer Science",
    university: "Independent University, Bangladesh",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "Sep 2016 - Dec 2020",
    cgpa: "3.01",
  },

  {
    title: "A-levels",
    university: "Private",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "Jan 2015 - Jan 2016",
    cgpa: null,
  },
  {
    title: "O-levels",
    university: "Private",
    icon: Images.Quadque,
    iconBg: "#fff",
    date: "June 2013 - June 2014",
    cgpa: null,
  },
];
const research: researchType = [
  {
    title: "Use of Ai in advancing SRHR interventions",
    type: "Q1 Systematic Review",
    status: "In Peer Review",
    journal: "npj Artificial Intelligence",
  },
  {
    title: "Use of Ai in advancing Mental Health interventions",
    type: "Q1 Systematic Review",
    status: "In Peer Review",
    journal: "Communications Psychology",
  },
  {
    title: "Ai for screening common cancers",
    type: "Book Chapter",
    status: "Published",
    book: "Artificial Intelligence in e-Health Framework V1",
  },
];
const testimonials = [
  {
    testimonial:
      "Zulker brings in great energy in every conversation. Working with him is like working with a friend. Further, he is very passionate about the work and I believe he will do great things as we move forward. I highly recommend him.",
    name: "Zeno Saviour",
    designation: "Founder",
    company: "Characters.xyz",
    image: "testimonial1",
  },
  {
    testimonial:
      "Nice to work with Zulker. He is very responsible Person. Provide good quality work with fast turnaround. I recommend. A++++",
    name: "Priyanka",
    designation: "Project Manager",
    company: "Magenta",
    image: "testimonial2",
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
const projects = [
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

export { experiences, testimonials, projects, education, research };
