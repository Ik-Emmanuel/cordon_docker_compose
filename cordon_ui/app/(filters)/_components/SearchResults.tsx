"use client";

import Filters from "../_components/Filters";

import { ResultDataset } from "@/types/types";
import { Suspense, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OCEANOGRAPHIC_DATASETS } from "@/app/constants";
import {
  Building,
  Calendar,
  File,
  Paperclip,
  Pin,
  RefreshCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { get_search } from "@/actions/search-datasets";
import { getInstitutionsSearchResults } from "@/utils";

interface QueryParams {
  format?: string;
  keyword?: string;
  source?: string;
  theme?: string;
}

const SearchResults = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [keyword, setKeyWord] = useState<string | undefined>("");
  const [format, setFormat] = useState<string | undefined>("");
  const [source, setSource] = useState<string | undefined>("");
  const [theme, setTheme] = useState<string | undefined>("");

  const [institutions, setInstitutions] = useState<string[]>([]);

  const [searchResult, setSearchResult] = useState<ResultDataset[] | undefined>(
    undefined
  );

  useEffect(() => {
    // fetch and use the params
    if (params) {
      let currentQuery: QueryParams = {};
      currentQuery = qs.parse(params.toString());
      //set values
      setKeyWord(currentQuery?.keyword);
    }
  }, [params]);

  useEffect(() => {
    // fetch and use the params
    if (keyword) {
      const data = {
        keyword: keyword as string,
      };
      startTransition(() => {
        //@ts-ignore
        get_search(data).then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            // console.log(data);
            // @ts-ignore
            setSearchResult(data.searchResults?.data);
          }
        });
      });
    }
  }, [keyword]);

  useEffect(() => {
    if (searchResult && searchResult?.length > 0) {
      const filtered_institutions = getInstitutionsSearchResults(searchResult);
      setInstitutions(filtered_institutions);
    }
  }, [searchResult]);

  // console.log("checking...");
  // // //@ts-ignore
  // console.log(institutions || "no data yet");
  // //@ts-ignore
  // console.log(searchResult?.length ?? "searchResult is undefined or null");

  return (
    <>
      <Suspense>
        <div className=" hidden max-sm:flex border-neutral-100  lg:border-r ">
          <Filters institutions={institutions} searchResults={searchResult} />
        </div>
      </Suspense>

      <div className="datasetviewer justify-center flex px-2 max-sm::flex-col mx-auto ">
        <Suspense>
          <div className="hidden md:flex border-neutral-100  lg:border-r ">
            <Filters institutions={institutions} searchResults={searchResult} />
          </div>
        </Suspense>
        <div className="flex min-h-screen flex-1 flex-col px-2 pb-6 pt-10 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <Suspense>
              <section className="flex flex-col">
                <div className="flex-1 mb-14 mt-10">
                  <div className="flex ">
                    <h2 className="text-2xl">
                      <span className="font-semibold">Search Results:</span>{" "}
                      {(searchResult && searchResult?.length) || "0"} datasets
                    </h2>
                  </div>

                  <div className="hide-scroll-bar flex flex-col gap-4 mt-6 max-h-[80vh] overflow-y-auto  border-t-neutral-200 ">
                    {searchResult && searchResult?.length > 0 ? (
                      <>
                        {searchResult.map(
                          (item: ResultDataset, index: number) => (
                            <Card
                              key={index}
                              className="w-full rounded-lg border border-neutral-200  backdrop-blur-lg cursor-pointer hover:border-b-blue-200 hover:border-b-8  duration-300"
                            >
                              <Link
                                href={`/datasetview/${item.datasetID}/${item.cdm_data_type}`}
                              >
                                <CardHeader>
                                  <CardTitle className="flex flex-col lg:flex-row justify-between  gap-3 ">
                                    <span className="text-xl font-semibold">
                                      {item.title}
                                    </span>

                                    {/* <div className="flex gap-3">
                            <Paperclip size={20} className="text-neutral-300" />
                            {item.file_types.map((filetype, index) => (
                              <Badge
                                // className="bg-gradient-to-r from-white via-blue-400 to-blue-800"
                                key={index}
                              >
                                {filetype}
                              </Badge>
                            ))}
                          </div> */}
                                  </CardTitle>
                                  <CardDescription>
                                    <div className="flex gap-6 sm:flex-col max-sm:flex-col sm:gap-1 max-sm:gap-1 ">
                                      <div className="flex flex-col lg:flex-row gap-4">
                                        <span className="flex items-center gap-1">
                                          <Building size={15} />
                                          <span className="text-neutral-400">
                                            Source:
                                          </span>
                                          <span className="text-blue-700">
                                            {item.institution}
                                          </span>
                                        </span>
                                        {/* <span className="flex items-center gap-1">
                                <File size={15} />
                                <span className="text-neutral-400">Files:</span>
                                {item.resource_count}
                              </span> */}
                                      </div>

                                      <div className="flex flex-col lg:flex-row gap-4">
                                        <span className="flex items-center gap-1">
                                          <Calendar size={15} />
                                          <span className="text-neutral-400">
                                            Created:
                                          </span>
                                          {item.minTime}
                                        </span>
                                        <span className="flex items-center gap-1 text-neutral-700">
                                          <RefreshCcw size={15} />
                                          <span className="text-neutral-400">
                                            Updated:
                                          </span>
                                          {item.maxTime}
                                        </span>
                                      </div>
                                    </div>
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="w-[80%]">
                                  <span className="text-neutral-600">
                                    {item.summary}
                                  </span>
                                </CardContent>
                                <CardFooter className="flex justify-between"></CardFooter>
                              </Link>
                            </Card>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl">
                          No datasets found for keyword: <b>{keyword}</b>{" "}
                        </h2>
                      </>
                    )}
                  </div>
                </div>

                {/* pagination section  */}
                {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
              </section>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
