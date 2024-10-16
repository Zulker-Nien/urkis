"use client";

import { laptopType, projectType } from "@/utils/types";
import { aboutType } from "@/utils/types";
import { sidebarType } from "@/utils/types";

import { create } from "zustand";

export const laptopStore = create<laptopType>((set) => ({
  openLaptop: false,
  setOpenLaptop: () => set((state) => ({ openLaptop: !state.openLaptop })),
}));

export const aboutStore = create<aboutType>((set) => ({
  openAboutSlider: false,
  setOpenAboutSlider: () =>
    set((state) => ({ openAboutSlider: !state.openAboutSlider })),
}));
export const sidebarStore = create<sidebarType>((set) => ({
  openSidebar: false,
  setOpenSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
}));
export const projectStore = create<projectType>((set) => ({
  selectedStack: "All Projects",
  setSelectedStack: (stack) => set(() => ({ selectedStack: stack })),
}));
