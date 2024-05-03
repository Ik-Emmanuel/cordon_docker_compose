import { HERO } from "@/app/constants";
import React from "react";
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="hero flex  min-h-[600px] md:min-h-[500px] lg:min-h-[550px]  items-center justify-center">
      <div className="flex max-w-4xl flex-col items-center gap-6 pb-0 max-lg:pb-10">
        <div className="space-y-4">
          {/* <h1 className="m-4 text-center text-4xl text-white md:text-5xl lg:text-6xl">
            CORDON Data Portal
          </h1> */}
          <h2 className="m-4 mb-0 text-center text-2xl text-white md:text-2xl lg:text-3xl font-semibold">
            The Central Oceanographic Repository of Data from Observing Networks
            (CORDON)
          </h2>
          <p className=" text-xs lg:text-xl  mt-0 pt-0 p-4 text-center text-slate-300">
            <span className="text-[9px] lg:text-[14px] text-neutral-300">
              An open data portal with access to a range of digital tools for
              exploring oceanographic data from various sources.
            </span>
          </p>
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Hero;
