"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { format } from "date-fns";

import { Calendar as CalendarIcon, Search as SearchIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex w-[90%] md:w-full items-end justify-between gap-4 rounded-lg border border-neutral-600  backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-2 p-6">
        <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="relative">
              {/* <span className="text-white font-semibold">
              Search For Datasets
            </span> */}
              <Input
                className="w-full"
                value={searchWord}
                placeholder="Search datasets using keywords"
                onChange={handleInputChange}
              />

              <SearchIcon className="text-black absolute right-2 bottom-2 text-[9px]" />
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
