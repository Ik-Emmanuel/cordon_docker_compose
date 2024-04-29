import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex flex-shrink-0 items-center justify-between">
        <Image
          className="mr-2"
          src="/cordon-logo.svg"
          width={30}
          height={30}
          alt="logo"
          style={{ height: "auto" }}
        />
        <span className="text-3xl tracking-tight text-white font-semibold">
          CORDON
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
