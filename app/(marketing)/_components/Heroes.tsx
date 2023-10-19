import Image from "next/image";

const Heroes = () => {
  return (
    <div className="w-full flex-row items-center justify-center md:max-w-5xl">
      <div className="flex items-center justify-center md:justify-end">
        <div className="relative w-[400px] h-[400px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px]">
          <Image
            src="/hero.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
            priority={true}
            loading="eager"
          />
          <Image
            src="/hero-dark.png"
            fill
            className="object-contain hidden dark:block"
            alt="Documents"
            priority={true}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
