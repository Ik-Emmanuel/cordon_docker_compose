import About from "@/components/About";
import AccessingData from "@/components/AccessingData";
import Discover from "@/components/Discover";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import React from "react";

const Home = () => {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <About />
      <Discover />
      <AccessingData />
    </>
  );
};

export default Home;
