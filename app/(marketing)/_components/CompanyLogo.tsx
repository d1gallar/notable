import Image from "next/image";
import { Secular_One } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Secular_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const CompanyLogo = () => {
  return (
    <div className="md:flex items-center w-full">
      <p className={cn("text-white font-bold text-2xl", font.className)}>notable.</p>
    </div>
  );
};
