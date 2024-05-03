import { DISCOVER } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Discover = () => {
  return (
    <div
      id="discover"
      className="container mx-auto my-16 border-b pb-10 px-10 tracking-tighter leading-4"
    >
      <h2 className="text-center text-cordon-4 text-2xl tracking-tighter sm:text-4xl lg:text-4xl font-semibold">
        Discover Datasets
      </h2>

      <p className="mx-auto my-6 mb-10 max-w-4xl text-center text-neutral-500">
        Explore datasets by category. Select a topic below.
      </p>

      <div className="flex flex-wrap">
        {DISCOVER.map((item, index) => (
          <div
            key={index}
            className={`w-full p-2 md:w-1/2 lg:w-1/4 discover cursor-pointer  duration-300 relative`}
          >
            <Link href={item.path}>
              <div
                className={" discover-card rounded-xl border py-14 "}
                style={{
                  backgroundImage: ` linear-gradient(to top, rgba(0, 0, 0, 0.39), rgba(0, 0, 0, 0)), url(${item.imgurl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  minHeight: "250px",
                  objectFit: "cover",
                }}
              >
                <div className="discover-text-section w-full flex items-center  pt-4 duration-200 bottom-0 absolute justify-start flex-col gap-4 cursor-pointer">
                  <p className="font-semibold text-neutral-200 text-xl">
                    {item.name}
                  </p>

                  <div className="discover-text opacity-0 h-0  border-b-4 border-b-cordon_sec-2 px-10 duration-300  inset-0 z-10 flex justify-center items-center text-6x font-semibold">
                    {/* <span>{item.desc}</span> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
