"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams, usePathname } from "next/navigation";

const ErrorPage = () => {
  const params = useParams();
  const path = usePathname();

  function matchDocPath(path: string) {
    const pattern = /^(\/documents|\/preview)/;
    return pattern.test(path);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
        priority={true}
        quality={100}
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
        priority={true}
        quality={100}
      />
      {matchDocPath(path) && params?.documentId ? (
        <h2 className="text-xl font-medium">
          Uh Oh! This note could not be found!
        </h2>
      ) : (
        <h2 className="text-xl font-medium">Uh Oh! Something went wrong!</h2>
      )}
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
