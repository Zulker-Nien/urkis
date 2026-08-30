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
          <Button className="bg-black/60 hover:bg-black/80 border border-amber-400/20 backdrop-blur-md text-amber-300 text-xs tracking-wider uppercase px-5 rounded-xl shadow-lg flex items-center gap-2">
            <span>{selectedStack || "Filter Technology"}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-900/95 border border-amber-400/15 backdrop-blur-md text-slate-200 min-w-[180px] rounded-xl p-1 shadow-2xl">
          {techStackItems.map((item) => {
            const isSelected = selectedStack === item;
            return (
              <DropdownMenuItem
                key={item}
                className={`py-2 px-3 text-xs tracking-wide rounded-lg cursor-pointer transition-colors ${isSelected
                    ? "text-black bg-amber-400 focus:bg-amber-400 focus:text-black font-semibold"
                    : "text-slate-400 focus:bg-white/5 focus:text-amber-300"
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