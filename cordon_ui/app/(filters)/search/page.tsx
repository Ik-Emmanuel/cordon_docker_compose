import React from "react";

import { Suspense } from "react";
import Hero from "../_components/Hero";
import SearchResults from "../_components/SearchResults";
import Filters from "../_components/Filters";

const SearchPage = () => {
  return (
    <>
      <Hero />
      <Suspense>
        <div className=" hidden max-sm:flex border-neutral-100  lg:border-r ">
          <Filters />
        </div>
      </Suspense>

      <div className="datasetviewer justify-center flex px-2 max-sm::flex-col mx-auto ">
        <Suspense>
          <div className="hidden md:flex border-neutral-100  lg:border-r ">
            <Filters />
          </div>
        </Suspense>
        <div className="flex min-h-screen flex-1 flex-col px-2 pb-6 pt-10 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <Suspense>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
