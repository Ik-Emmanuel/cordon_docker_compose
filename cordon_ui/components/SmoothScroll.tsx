"use client";
import React, { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        //@ts-ignore
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);

  return null;
};

export default SmoothScroll;
