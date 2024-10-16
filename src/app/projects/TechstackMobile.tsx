import { useRef, useState } from "react";
import { useSpring, animated, useInView } from "@react-spring/web";
import { projectStore } from "@/store/store";
import { projectType } from "@/utils/types";

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
    <div className="w-full flex flex-col items-center px-4 mb-4 sticky top-20 z-30">
      <button
        className="w-full text-gray-800 py-2 border rounded-3xl px-8 bg-white font-bold"
        onClick={handleDropdownToggle}
      >
        {selectedStack || "Select Tech Stack"}
      </button>
      {isDropdownOpen && (
        <ul className="w-full bg-gray-700 absolute !z-40 rounded-3xl py-2 px-4">
          {techStackItems.map((item) => (
            <li
              key={item}
              className={`py-2 px-4 cursor-pointer border-b ${
                selectedStack === item ? "text-gray-800" : "text-white"
              }`}
              onClick={() => {
                setSelectedStack(item);
                setIsDropdownOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TechstackMobile;
