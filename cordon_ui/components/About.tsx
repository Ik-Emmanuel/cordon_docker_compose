import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div id="about" className="container mx-auto mt-8 border-b pb-10">
      <h2 className="mb-10 text-center text-3xl tracking-tighter sm:text-4xl pt-6 lg:text-4xl font-semibold">
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
          <p className=" text-[16px] tracking-tighter lg:pr-20 text-neutral-400 text-muted-foreground ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            ullam fuga reprehenderit animi cupiditate, enim voluptatum, vero,
            hic voluptates necessitatibus laudantium architecto ut similique
            facilis doloribus quibusdam. Beatae, nostrum nesciunt! Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Provident blanditiis,
            delectus, dolorum ab tempore dolorem omnis odit exercitationem et
            soluta corrupti, repellendus amet? Voluptatem debitis id dolorum
            iure rerum. Inventore! <br /> <br /> Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maiores nam excepturi distinctio
            aspernatur corrupti illum! Cupiditate id distinctio ea odio ab
            dolores, ut ullam iste maxime maiores ducimus explicabo eos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
