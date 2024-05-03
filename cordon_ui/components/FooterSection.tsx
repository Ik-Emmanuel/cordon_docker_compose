import { FOOTER } from "@/app/constants";
import { FacebookIcon, Github, Instagram, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <div className="bg-cordon-4 text-white py-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap border-b border-neutral-700 justify-between items-center">
          <div className="w-full sm:w-1/2 lg:w-6/12 p-4">
            {/* <p className="lg:max-w-sm py-8 text-sm"> {FOOTER.description}</p> */}
            <div className="flex flex-wrap gap-4 my-10">
              <Image
                className="mr-2"
                src="/logo/CORDON-Logo-horizontal-white.png"
                width={150}
                height={80}
                alt="logo"
                style={{ height: "auto" }}
              />
              {/* <h2 className="font-bold">CORDON</h2> */}
              {/* <Github /> */}
              {/* <TwitterIcon /> */}
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-2/12 p-4 cursor-pointer">
            <Link href={"https://pml-applications.co.uk/"} target="_blank">
              <Image
                src={"/PML_Applications_Logo_White.svg"}
                width={200}
                height={100}
                alt="plma-logo"
              />
            </Link>
          </div>
        </div>

        <p className="p-4 text-center text-sm text-neutral-500">
          {FOOTER.copyright}
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
