import React from "react";
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

const SearchResults = () => {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex-1 mb-14 mt-10">
          <div className="flex ">
            <h2 className="text-2xl">
              <span className="font-semibold">Search Results:</span> 15 datasets
            </h2>
          </div>

          <div className="hide-scroll-bar flex flex-col gap-4 mt-6 max-h-[80vh] overflow-y-auto  border-t-neutral-200 ">
            {OCEANOGRAPHIC_DATASETS.map((item, index) => (
              <Card
                key={index}
                className="w-full rounded-lg border border-neutral-200  backdrop-blur-lg cursor-pointer hover:border-b-blue-200 hover:border-b-8  duration-300"
              >
                <Link href={`/datasetview/${item.id}/${item.date_created}`}>
                  <CardHeader>
                    <CardTitle className="flex flex-col lg:flex-row justify-between  gap-3 ">
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>

                      <div className="flex gap-3">
                        <Paperclip size={20} className="text-neutral-300" />
                        {item.file_types.map((filetype, index) => (
                          <Badge
                            // className="bg-gradient-to-r from-white via-blue-400 to-blue-800"
                            key={index}
                          >
                            {filetype}
                          </Badge>
                        ))}
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex gap-6 sm:flex-col max-sm:flex-col sm:gap-1 max-sm:gap-1 ">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <span className="flex items-center gap-1">
                            <Building size={15} />
                            <span className="text-neutral-400">Source:</span>
                            <span className="text-blue-700">
                              {item.organization}
                            </span>
                          </span>
                          <span className="flex items-center gap-1">
                            <File size={15} />
                            <span className="text-neutral-400">Files:</span>
                            {item.resource_count}
                          </span>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={15} />
                            <span className="text-neutral-400">Created:</span>
                            {item.date_created}
                          </span>
                          <span className="flex items-center gap-1 text-neutral-700">
                            <RefreshCcw size={15} />
                            <span className="text-neutral-400">Updated:</span>
                            {item.last_updated}
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="w-[80%]">
                    <span className="text-neutral-600">{item.desc}</span>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* pagination section  */}
        <Pagination>
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
        </Pagination>
      </section>
    </>
  );
};

export default SearchResults;
