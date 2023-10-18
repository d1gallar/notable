import { Button } from "@/components/ui/button";
import { CompanyLogo } from "./CompanyLogo";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full p-6 bg-background z-50 bg-bluelight dark:bg-bluedark">
      <div className="w-full text-center py-4 md:py-0">
        <CompanyLogo />
      </div>
      <div className="flex-col gap-y-2 md:flex-row md:gap-x-2 md:gap-y-0 md:ml-auto w-full justify-between md:justify-end flex items-center text-muted-foreground">
        <Button
          className="text-xs min-w-fit md:text-base text-white/80 hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          variant="ghost"
          size="sm"
        >
          Privacy Policy
        </Button>
        <Button
          className="text-xs min-w-fit md:text-base text-white/80 hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          variant="ghost"
          size="sm"
        >
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
