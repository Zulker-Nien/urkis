"use client";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
  const selectedStack = projectStore(
    (state: projectType) => state.selectedStack
  );
  const setSelectedStack = projectStore(
    (state: projectType) => state.setSelectedStack
  );

  return (
    <div className="w-full flex flex-col items-center px-4 z-30">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-slate-900/80 hover:bg-slate-900 border border-white/10 backdrop-blur-md text-slate-100 text-xs tracking-wider uppercase px-5 rounded-xl shadow-lg flex items-center gap-2">
            <span>{selectedStack || "Filter Technology"}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-900/95 border border-white/10 backdrop-blur-md text-slate-200 min-w-[180px] rounded-xl p-1 shadow-2xl">
          {techStackItems.map((item) => {
            const isSelected = selectedStack === item;
            return (
              <DropdownMenuItem
                key={item}
                className={`py-2 px-3 text-xs tracking-wide rounded-lg cursor-pointer transition-colors ${isSelected
                    ? "text-white bg-blue-600 focus:bg-blue-600 focus:text-white font-medium"
                    : "text-slate-400 focus:bg-white/5 focus:text-slate-200"
                  }`}
                onClick={() => setSelectedStack(item)}
              >
                {item}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TechstackMobile;