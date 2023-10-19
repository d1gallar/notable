"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="bg-bluelight dark:bg-bluedark h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
        priority={true}
        loading="eager"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
        priority={true}
        loading="eager"
      />
      <h2 className="text-white text-xl font-medium">
        Uh Oh! This page could not be found!
      </h2>
      <Button asChild className="text-white hover:text-white bg-bluelightsecondary dark:bg-bluedarksecondary hover:bg-black/50 dark:hover:brightness-125">
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
