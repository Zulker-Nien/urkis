"use client";

import { laptopStore, sidebarStore } from "@/store/store";
import Images from "@/utils/image";
import { laptopType, sidebarType } from "@/utils/types";
import Image from "next/image";
// import Link from "next/link";

const Sidebar = () => {
  const openLaptop = laptopStore((state: laptopType) => state.openLaptop);

  const openSidebar = sidebarStore((state: sidebarType) => state.openSidebar);
  const setOpenSidebar = sidebarStore(
    (state: sidebarType) => state.setOpenSidebar
  );

  return (
    <>
      {openLaptop && (
        <div
          className={`h-full xl:px-4 px-2 flex flex-col xl:gap-8 gap-4 ease-in duration-100 drop-shadow-lg  ${
            openSidebar
              ? "lg:w-1/6 w-full lg:bg-black/70 bg-black"
              : "lg:w-20 w-16"
          } absolute z-50`}
        >
          <div
            className={`overflow-hidden w-full flex justify-center items-center mt-4 rounded-md cursor-pointer duration-100 ease-in`}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {openSidebar && (
              <Image
                src="/public/Zulker_Logo_W.png"
                alt="logo"
                className={`2xl:h-16 h-20 w-20 rounded-md ease-in duration-100`}
                placeholder="blur"
              />
            )}
            <div
              className={`2xl:h-16 h-12 w-full flex flex-col gap-1.5 ${
                openSidebar ? "items-end" : "items-center"
              } justify-center relative rounded-md ease-in duration-100`}
            >
              <div
                className={`${
                  openSidebar
                    ? "rotate-45 origin-center translate-y-1.5 w-10"
                    : "rotate-0 w-10"
                } h-1.5 rounded-sm bg-white transition-all duration-300 ease-in-out `}
              ></div>
              <div
                className={`${
                  openSidebar
                    ? "-rotate-45 origin-center -translate-y-1.5 w-10"
                    : "rotate-0 w-10"
                } h-1.5 rounded-sm bg-white transition-all duration-300 ease-in-out`}
              ></div>
              {!openSidebar && (
                <div
                  className={`h-1.5 w-10 rounded-sm bg-white transition-all duration-300 ease-in-out`}
                ></div>
              )}
            </div>
          </div>
          {/* )} */}
          <button
            className={`bg-violet-500 text-md items-center justify-center px-4 py-2 rounded-md duration-300 ${
              openSidebar ? "flex w-full " : "hidden w-0"
            }`}
          >
            About Me
          </button>
        </div>
      )}
    </>
  );
};
export default Sidebar;
