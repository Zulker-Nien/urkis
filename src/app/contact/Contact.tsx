"use client";
import React from "react";
import Link from "next/link";
const Contact = () => {
  return (
    <div className="h-screen bg-gray-800 relative pb-0 lg:px-0 px-2 overflow-hidden">
      <h5 className={`h-1/4 lg:text-[4em] text-[2em] text-center text-white`}>
        Connect with me
      </h5>
      <div className="h-3/4 flex flex-col items-center justify-center gap-8">
        <h4 className="lg:w-1/3 w-full px-4 py-0 text-center lg:text-[2rem] text-[1.5rem]">
          Email: zulkerb9b@gmail.com
        </h4>
        <h4 className="lg:w-1/3 w-full px-4 py-0 text-center lg:text-[2rem] text-[1.5rem]">
          Cell: +8801717755244
        </h4>
        <Link
          className="lg:w-1/4 w-full px-4 py-2 rounded-3xl border border-white shadow-lg shadow-black"
          href="https://www.linkedin.com/in/zulker-nien/"
          passHref={true}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h4 className="p-0">LinkedIn</h4>
        </Link>
        <Link
          className="lg:w-1/4 w-full px-4 py-2 rounded-3xl border border-white shadow-lg shadow-black"
          href="https://github.com/Zulker-Nien"
          passHref={true}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h4 className="p-0">Github</h4>
        </Link>
        <Link
          className="lg:w-1/4 w-full px-4 py-2 rounded-3xl border border-white shadow-lg shadow-black"
          href="https://www.upwork.com/freelancers/zulkernien2"
          passHref={true}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h4 className="p-0">Upwork</h4>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
