import { StaticImageData } from "next/image";

export interface laptopType {
  openLaptop: boolean;
  setOpenLaptop: (by: boolean) => void;
}
export interface aboutType {
  openAboutSlider: boolean;
  setOpenAboutSlider: (by: boolean) => void;
}
export interface sidebarType {
  openSidebar: boolean;
  setOpenSidebar: (by: boolean) => void;
}

export type experienceType = {
  title: string;
  company_name: string;
  icon: StaticImageData;
  iconBg: string;
  date: string;
  points: string[];
}[];
export type educationType = {
  title: string;
  university: string;
  icon: StaticImageData;
  iconBg: string;
  date: string;
  cgpa: string | null;
}[];
export type researchType = {
  title: string;
  type: string;
  status: string;
  journal?: string;
  book?: string;
}[];
export type tagType = {
  name: string;
  color: string;
};
export type projectItem = {
  name: string;
  description: string;
  tags: tagType[];
  image: string;
  source_code_link: string;
}[];

export type projectType = {
  selectedStack: string;
  setSelectedStack: (stack: string) => void;
};
