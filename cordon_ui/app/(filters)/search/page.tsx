import { Suspense } from "react";
import Hero from "../_components/Hero";
import SearchResults from "../_components/SearchResults";

const SearchPage = () => {
  return (
    <>
      <Hero />
      <Suspense>
        <SearchResults />
      </Suspense>
    </>
  );
};

export default SearchPage;
