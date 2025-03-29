"use client";
import React from "react";
import EducationTimeline from "./EducationTimeline";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { education, research } from "@/utils/constant";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Research = () => {
  return (
    <div className="min-h-[150vh] bg-gradient-to-b from-orange-500/80 via-orange-600/80 to-orange-500/80 px-0">
      <div className="h-full w-full flex flex-col gap-4">
        <div className="h-full w-full flex flex-col relative">
          <h5
            className={`lg:text-[4em] text-[2em] text-center text-white sticky top-0 w-full drop-shadow-lg drop-shadow-black z-30 bg-gradient-to-b from-orange-500 from-30% to-transparent`}
          >
            Education
          </h5>
          <VerticalTimeline lineColor="#232d3b" className="flex flex-col gap-8">
            {education.map((education, index) => (
              <EducationTimeline
                education={education}
                key={index}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </div>
        <div className="h-full flex flex-col gap-4 w-full relative">
          <h5
            className={`lg:text-[4em] text-[2em] text-center text-white sticky top-0 w-fulldrop-shadow-lg drop-shadow-black z-30 `}
          >
            Publications
          </h5>
          <div className="w-screen flex flex-wrap gap-8 items-center justify-between lg:px-80 pr-4 lg:pb-32 lg:pb-0 pb-8">
            {research.map((research, index) => (
              <div
                className="lg:w-1/4 w-3/4 flex-grow flex items-center justify-center gap-4 pl-4 pr-6"
                key={index}
              >
                <div className="w-full h-[50vh] flex flex-col gap-2 bg-white p-4 shadow-md shadow-black hover:scale-[1.02] duration-300 rounded-md">
                  <div className="h-3/4 w-full bg-yellow-500 relative">
                    <div className="absolute inset-0 bg-white bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:100%_24px]">
                      <h3 className="text-slate-800 text-md text-center font-semibold">
                        {research.title}
                      </h3>
                    </div>
                  </div>

                  <div className="h-1/4 text-slate-800 flex flex-col items-start justify-between text-md">
                    <h3 className="h-1/4 font-semibold text-slate-500">
                      Type: {research.type}
                    </h3>
                    <h3 className="h-1/2 font-semibold text-slate-800">
                      {research.journal === undefined
                        ? `Book: ${research.book}`
                        : `Journal: ${research.journal}`}
                    </h3>
                    <div className="h-1/4 flex items-center justify-between w-full">
                      <h3
                        className={`font-semibold ${
                          research.status === "Published"
                            ? "text-green-500"
                            : "text-orange-500"
                        } `}
                      >
                        Status: {research.status}
                      </h3>
                      {research.link && (
                        <Link
                          href={`${research.link}`}
                          passHref
                          target="_blank"
                        >
                          <Button>
                            View
                            <ExternalLink />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
