import { LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
  link?: string;
}[];
export type tagType = {
  name: string;
  color: string;
};
export type projectItem = {
  name: string;
  description: string;
  tags: tagType[];
  image?: string;
  source_code_link?: string;
  website?: string;
}[];

export type projectType = {
  selectedStack: string;
  setSelectedStack: (stack: string) => void;
};
export type coreSkillsType = {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  content: string;
}[];

export type testimonialType = {
  name: string;
  image: string;
  company: string;
  testimonial: string;
  designation: string;
}[];
