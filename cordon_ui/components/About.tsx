import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div id="about" className="container mx-auto mt-8 border-b pb-10">
      <h2 className="mb-10  text-cordon-4 text-center text-3xl tracking-tighter sm:text-4xl pt-6 lg:text-4xl font-semibold">
        Core Services
      </h2>

      <div className="flex flex-wrap   mx-auto  justify-between items-start  ">
        <div className="w-full lg:w-1/2  border-neutral-300  lg:border-r-0">
          <div className="relative p-6">
            <img
              className="rounded-xl object-cover"
              src="/ocean2.jpg"
              alt="services"
              style={{
                width: "600px",
                height: "300px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <div
              className="hidden md:block  absolute top-6 gradient rounded-xl"
              style={{
                // zIndex: "30",
                background:
                  "repeating-linear-gradient(45deg, #00000030, #00000000 30px, #00000040 22px, #00000000 60px)",
                width: "600px",
                height: "300px",
                maxWidth: "90%",
              }}
            ></div>
          </div>
        </div>

        <div className="w-full   mx-auto lg:w-1/2  pr-4 mt-4">
          <p className=" text-[16px] tracking-tighter lg:pr-20 text-neutral-500 text-muted-foreground ">
            CORDON – Central Oceanographic Repository of Data from Observing
            Networks – is a virtual digital infrastructure and data analysis
            platform. It is a flexible, scalable platform offering access to a
            range of digital tools for exploring oceanographic data from various
            sources. It contains a suite of oceanographic data products from
            satellite-borne, fixed position, and mobile sensors.
            <br /> <br />
            The CORDON Data Catalogue will maintain a record of data which are
            currently available for analysis within the CORDON platform. Any
            data automatically uploaded as part of a routine delivery will be
            recorded in the catalogue once the delivery is confirmed; the record
            will include details of spatial and temporal extent, data format,
            and data access endpoints. The system exists to serve the needs of
            the users who wish to use it to extract, combine, analyse, and
            export oceanographic data to answer an extant question.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
