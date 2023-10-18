import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col bg-bluelight dark:bg-bluedark">
      <div className="flex items-center justify-center w-full flex-1">
        <div
          className="w-full flex flex-col md:flex-row items-center justify-center
         gap-y-8 md:mr-20 flex-1"
        >
          <Heroes />
          <Heading />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
