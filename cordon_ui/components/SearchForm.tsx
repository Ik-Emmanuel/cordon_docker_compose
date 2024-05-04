"use client";
import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";

import { Calendar } from "./ui/calendar";
import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <>
      <div className="flex w-[90%] md:w-full items-end justify-between gap-4 rounded-lg border border-neutral-600  backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-2 p-6">
        <form className="flex gap-2 w-full">
          <div className="w-full">
            <div className="relative">
              {/* <span className="text-white font-semibold">
              Search For Datasets
            </span> */}
              <Input
                className="w-full"
                value={searchWord}
                placeholder="Search for datasets using keywords"
                onChange={handleInputChange}
              />

              <SearchIcon className="text-black absolute right-2 bottom-2 text-[9px] hidden md:block" />
            </div>
          </div>

          <div className="w-[20%]">
            <Link href={`/search?keyword=${searchWord}`}>
              <Button
                type="submit"
                className="bg-cordon_sec-2 w-full text-white hover:bg-cordon_sec-1"
              >
                Search
              </Button>
            </Link>
            {/* <SearchIcon /> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
