"use client";
import React from "react";
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
  const form = useForm();
  return (
    <>
      <div className="flex w-[90%] md:w-full items-end justify-between gap-4 rounded-lg border border-neutral-600  backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-2 p-6">
        <Form {...form}>
          <div className="w-full">
            <div className="relative">
              <FormField
                control={form.control}
                name="search"
                render={(field) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-white font-semibold">
                        Search For Datasets
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Search with keywords"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              ></FormField>
              <SearchIcon className="text-black absolute right-2 bottom-2 text-[9px]" />
            </div>
          </div>

          <div className="w-[20%]">
            <Link href={"/search"}>
              <Button type="submit" className="bg-blue-800 w-full text-white">
                Search
              </Button>
            </Link>
            {/* <SearchIcon /> */}
          </div>
        </Form>
      </div>
    </>
  );
};

export default SearchForm;