import React from "react";
import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <div className="  hero flex  min-h-[300px] md:min-h-[300px] lg:min-h-[370px]  items-center justify-center">
      <div className="flex max-w-4xl flex-col items-center gap-6 pb-0 max-lg:pb-10">
        <div className="space-y-4 mt-8 leading-3">
          {/* <h1 className="m-4 text-center text-4xl text-white md:text-5xl lg:text-6xl">
            CORDON Data Portal
          </h1> */}
          <h2 className="m-4 mb-0 text-center text-4xl mt-8 text-white md:text-4xl lg:text-5xl font-semibold">
            Search Datasets
          </h2>
          <p className=" text-xs lg:text-xl  mt-0 pt-0 p-4 text-center text-slate-300">
            <span className="text-[9px] lg:text-[14px] text-neutral-300">
              Search for datasets and use the various available filters to drill
              down for refined results.
            </span>
          </p>
        </div>
        <div className="  bottom-2 w-full">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
