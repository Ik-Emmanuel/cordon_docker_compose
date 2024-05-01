"use client";

import qs from "query-string";
import { ResultDataset } from "@/types/types";
import React, { useState, useEffect } from "react";
import { SIDE_FILTERS } from "../../constants";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Filter, X } from "lucide-react";

import { Button } from "../../../components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";

interface FilterProps {
  institutions?: string[];
  searchResults?: {}[];
  setSearchResult: React.Dispatch<
    React.SetStateAction<ResultDataset[] | undefined>
  >;
}

const Filters = ({ institutions, searchResults }: FilterProps) => {
  const router = useRouter();
  const params = useSearchParams();

  // /fetch and use the params
  if (params) {
    let currentQuery = {};
    currentQuery = qs.parse(params.toString());
    console.log("The current set params");
    console.log(currentQuery);
  }

  const [checkedSourceItems, setCheckedSourceItems] = useState<string[]>([]);
  const [checkedThemeItems, setCheckedThemeItems] = useState<string[]>([]);
  const [checkedFormatItems, setCheckedFormatItems] = useState<string[]>([]);

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // if clicked again delete it from query
    const updatedQuery: any = {
      ...currentQuery,
      source: checkedSourceItems.join(","),
      theme: checkedThemeItems.join(","),
      format: checkedFormatItems.join(","),
    };

    // Remove empty categories from the query
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key].length === 0) {
        delete updatedQuery[key];
      }
    });

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [
    router,
    params,
    checkedSourceItems,
    checkedThemeItems,
    checkedFormatItems,
  ]);

  useEffect(() => {
    handleClick();
  }, [handleClick, checkedSourceItems, checkedThemeItems, checkedFormatItems]);

  const handleCheckboxChange = (category: string, item: string) => {
    switch (category) {
      case "Source":
        if (checkedSourceItems.includes(item)) {
          setCheckedSourceItems(
            checkedSourceItems.filter((checkedItem) => checkedItem !== item)
          );
        } else {
          setCheckedSourceItems([...checkedSourceItems, item]);
        }
        break;
      case "Theme":
        if (checkedThemeItems.includes(item)) {
          setCheckedThemeItems(
            checkedThemeItems.filter((checkedItem) => checkedItem !== item)
          );
        } else {
          setCheckedThemeItems([...checkedThemeItems, item]);
        }
        break;
      case "File Formats":
        if (checkedFormatItems.includes(item)) {
          setCheckedFormatItems(
            checkedFormatItems.filter((checkedItem) => checkedItem !== item)
          );
        } else {
          setCheckedFormatItems([...checkedFormatItems, item]);
        }
        break;
      default:
        break;
    }
  };

  const handleCheckboxClear = (category: string) => {
    switch (category) {
      case "Source":
        setCheckedSourceItems([]);
        break;
      case "Theme":
        setCheckedThemeItems([]);
        break;
      case "File Formats":
        setCheckedFormatItems([]);
      default:
        break;
    }
  };

  const handleCheckboxClearAll = () => {
    setCheckedSourceItems([]);
    setCheckedThemeItems([]);
    setCheckedFormatItems([]);
  };

  const SHEET_SIDES = ["Filter Results"] as const;

  type SheetSide = (typeof SHEET_SIDES)[number];

  return (
    <>
      <section className=" hide-scroll-bar  left-0 top-0 flex max-h-full  overflow-y-auto  w-fit flex-col justify-between  backdrop-blur-2xl p-6 pt-10 max-sm:hidden lg:w-[280px]">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="font-semibold text-xl text-center">
            {searchResults &&
              searchResults.length > 0 &&
              "Refine Search Results"}
          </h2>

          {checkedSourceItems.length > 0 ||
          checkedThemeItems.length > 0 ||
          checkedFormatItems.length > 0 ? (
            <div className="mb-2 text-right flex items-end">
              <Button
                variant="outline"
                className="mb-2 flex justify-between"
                onClick={() => handleCheckboxClearAll()}
              >
                <span>Clear All Filters</span>
                <X size={17} className="ml-2" />
              </Button>
            </div>
          ) : (
            <></>
          )}

          <Accordion type="multiple" className="w-full">
            {institutions &&
            institutions.length > 0 &&
            searchResults &&
            searchResults?.length > 0 ? (
              <>
                <AccordionItem value="Source">
                  <AccordionTrigger className="font-bold hover:no-underline hover:border-b-blue-600 hover:border-b-4 duration-200">
                    <div className="flex gap-2 text-left  items-center">
                      <Filter size={16} strokeWidth={1} className="text-sm" />
                      Source
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400">
                    <div className="mb-2 text-right flex items-end">
                      <Button
                        variant="outline"
                        className="mb-2"
                        onClick={() => handleCheckboxClear("Source")}
                      >
                        Clear Source Filter
                      </Button>
                    </div>
                    {institutions.map((filterItem, filterItemIndex) => (
                      <div
                        key={filterItemIndex}
                        className="flex items-center space-x-2 gap-1 mb-1"
                      >
                        <input
                          className=""
                          type="checkbox"
                          checked={checkedSourceItems.includes(filterItem)}
                          onChange={() =>
                            handleCheckboxChange("Source", filterItem)
                          }
                        />

                        <label
                          htmlFor={filterItem}
                          className="text-neutral-600"
                        >
                          {filterItem}
                        </label>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </>
            ) : (
              <> </>
            )}

            {searchResults && searchResults?.length > 0 ? (
              <>
                {SIDE_FILTERS.map((item, index) => (
                  <AccordionItem key={index} value={item.title}>
                    <AccordionTrigger className="font-bold hover:no-underline hover:border-b-blue-600 hover:border-b-4 duration-200">
                      <div className="flex gap-2 text-left  items-center">
                        <Filter size={16} strokeWidth={1} className="text-sm" />
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-400">
                      <div className="mb-2 text-right flex items-end">
                        <Button
                          variant="outline"
                          className="mb-2"
                          onClick={() => handleCheckboxClear(item.title)}
                        >
                          Clear {item.title} Filter
                          {/* <span className="ml-4">X</span> */}
                        </Button>
                      </div>
                      {item.items.map((filterItem, filterItemIndex) => (
                        <div
                          key={filterItemIndex}
                          className="flex items-center space-x-2 gap-1 mb-1"
                        >
                          <input
                            className=""
                            type="checkbox"
                            checked={
                              item.title === "Source"
                                ? checkedSourceItems.includes(filterItem)
                                : item.title === "Theme"
                                ? checkedThemeItems.includes(filterItem)
                                : checkedFormatItems.includes(filterItem)
                            }
                            onChange={() =>
                              handleCheckboxChange(item.title, filterItem)
                            }
                          />

                          <label
                            htmlFor={filterItem}
                            className="text-neutral-600"
                          >
                            {filterItem}
                          </label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </>
            ) : (
              <> </>
            )}
          </Accordion>
        </div>
      </section>
      {/* mobile view filters */}
      <section className="  hidden max-sm:flex  left-0 top-0    w-fit flex-col justify-between  p-6 pt-10">
        <div className="grid grid-cols-2 gap-2">
          {SHEET_SIDES.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Filter size={16} strokeWidth={1} className="text-sm mr-2" />
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>
                    <h2 className="font-semibold text-xl text-center">
                      Refine Search Results
                    </h2>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4">
                  <Accordion type="multiple" className="w-full">
                    {SIDE_FILTERS.map((item, index) => (
                      <AccordionItem key={index} value={item.title}>
                        <AccordionTrigger className="font-bold hover:no-underline">
                          <div className="flex gap-2 text-left  items-center">
                            <Filter
                              size={16}
                              strokeWidth={1}
                              className="text-sm"
                            />
                            {item.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-400">
                          <div className="mb-2 text-right flex items-end">
                            <Button
                              variant="outline"
                              className="mb-2"
                              onClick={() => handleCheckboxClear(item.title)}
                            >
                              Clear {item.title} Filter
                              {/* <span className="ml-4">X</span> */}
                            </Button>
                          </div>
                          {item.items.map((filterItem, filterItemIndex) => (
                            <div
                              key={filterItemIndex}
                              className="flex items-center space-x-2 gap-1 mb-1"
                            >
                              <input
                                className=""
                                type="checkbox"
                                checked={
                                  item.title === "Source"
                                    ? checkedSourceItems.includes(filterItem)
                                    : item.title === "Theme"
                                    ? checkedThemeItems.includes(filterItem)
                                    : checkedFormatItems.includes(filterItem)
                                }
                                onChange={() =>
                                  handleCheckboxChange(item.title, filterItem)
                                }
                              />

                              <label
                                htmlFor={filterItem}
                                className="text-neutral-600"
                              >
                                {filterItem}
                              </label>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>
    </>
  );
};

export default Filters;
