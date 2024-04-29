"use client";
import { SEARCH_NAV_LINKS } from "../../constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Menu, X } from "lucide-react";
import { LoginButton } from "../../../components/auth/login-button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const pathname = usePathname();
  const blackNav = pathname.startsWith("/dataset");

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
          scrollPosition >= 30 || blackNav ? "bg-black" : ""
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
              style={{ height: "auto", width: "auto" }}
            />
            <span className="text-lg tracking-tight text-white font-semibold">
              CORDON
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex">
          <ul className="flex items-center gap-4">
            {SEARCH_NAV_LINKS.map((item, index) => (
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

        <div className="hidden text-sm text-white lg:flex">
          <LoginButton mode="modal" asChild>
            <Button variant="outline" className="mr-2 bg-black">
              Sign in
            </Button>
          </LoginButton>
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
            {SEARCH_NAV_LINKS.map((item, index) => (
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
