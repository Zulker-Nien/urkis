"use client";
import { useState } from "react";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const techStackItems = [
  "All Projects",
  "Javascript",
  "Typescript",
  "Reactjs",
  "Threejs",
  "Nextjs",
  "Nodejs",
  "PostgreSQL",
  "GraphQL",
];

const TechstackMobile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedStack = projectStore(
    (state: projectType) => state.selectedStack
  );
  const setSelectedStack = projectStore(
    (state: projectType) => state.setSelectedStack
  );
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mb-4 z-30">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>{selectedStack || "Select Tech Stack"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          {techStackItems.map((item) => (
            <DropdownMenuItem
              key={item}
              className={`py-2 px-4 cursor-pointer ${
                selectedStack === item
                  ? "text-white bg-slate-800"
                  : "text-slate-950"
              }`}
              onClick={() => {
                setSelectedStack(item);
              }}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TechstackMobile;
