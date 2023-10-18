"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll.top";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./CompanyLogo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-bluelight dark:bg-bluedark fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm border-white/5"
      )}
    >
      <CompanyLogo />
      <div className="md:ml-auto md:justify-end justify-end w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal" afterSignInUrl="/documents">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-black/5 dark:hover:bg-white/5 text-white hover:text-white"
              >
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal" afterSignInUrl="/documents">
              <Button
                className="hidden md:block dark:bg-bluelightsecondary bg-bluedarksecondary text-white hover:bg-black/50 dark:hover:brightness-125"
                size="sm"
              >
                Get Notable free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex flex-row items-center justify-end gap-x-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex hover:bg-black/5 dark:hover:bg-white/5 text-white "
            >
              <Link href="/documents">Enter Notable</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
