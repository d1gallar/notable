"use client";

import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";

import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="text-center min-w-2xl space-y-4 bg-lightblue">
      <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold">
        Effortlessly Capture Ideas, Documents, and Plans, All In One Central
        Hub.
      </h1>
      <h3 className="text-white text-base sm:text-xl md:text-2xl font-medium">
        Boost organization and never lose a brilliant idea again. <br /> Where
        every thought is made truly notable.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button
          asChild
          className="text-white hover:text-white bg-bluelightsecondary dark:bg-bluedarksecondary hover:bg-black/50 dark:hover:brightness-125"
        >
          <Link href="/documents">
            Enter Notable
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button className="text-white hover:text-white bg-bluelightsecondary dark:bg-bluedarksecondary hover:bg-black/50 dark:hover:brightness-125">
            Get Notable free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
