"use client";
import { NAV_LINKS } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { HamIcon, Menu, X } from "lucide-react";
import { LoginButton } from "./auth/login-button";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;

      // Calculate how far user has scrolled as a percentage
      const scrollPercentage =
        (scrollPosition / (scrollHeight - clientHeight)) * 100;

      // Update scroll position state
      setScrollPosition(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="fixed top-2 z-50 w-screen px-4">
      <div
        className={`container flex items-center justify-between rounded-lg   backdrop-blur-lg py-3 ${
          scrollPosition >= 30 ? "bg-black" : ""
        }`}
      >
        <Link className="cursor-pointer" href={"/"}>
          <div className="flex flex-shrink-0 items-center justify-between">
            <Image
              className="mr-2"
              src="/cordon-logo.svg"
              width={30}
              height={30}
              alt="logo"
              style={{ height: "auto" }}
            />
            <span className="text-lg tracking-tight text-white font-semibold">
              CORDON
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex">
          <ul className="flex items-center gap-4">
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-sm text-white hover:text-neutral-500"
                  href={item.url}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden text-sm text-white lg:flex items-center">
          <LoginButton mode="modal" asChild>
            <Button variant="outline" className="mr-2 bg-black">
              Sign in
            </Button>
          </LoginButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="outline" className="mr-2 bg-black"> */}
              <Menu />
              {/* <Avatar>
                <div className="flex gap-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="icon"
                    width={20}
                  />
                </div>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button className="bg-slate-800">Sign out</Button> */}
        </div>

        {/* menu items on small screen  */}
        <div className="flex-col justify-end text-white md:flex lg:hidden">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileDrawerOpen && (
        <div className="rounded-md  backdrop-blur-lg lg:hidden">
          <ul className="flex flex-col items-center">
            {NAV_LINKS.map((item, index) => (
              <li key={index} className="py-5">
                <Link
                  className=" text-sm text-white hover:text-neutral-500"
                  href={item.url}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center pb-8 text-white lg:hidden">
            <LoginButton mode="modal" asChild>
              <Button variant="outline" className="mr-2 bg-black">
                Sign in
              </Button>
            </LoginButton>
            {/* <Button className="bg-slate-800">Sign out</Button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
