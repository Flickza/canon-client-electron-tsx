import React from "react";
import Image from "./Components/Image";
import NewArkivskaper from "./Components/NewArkivskaper";
import NewProject from "./Components/NewProject";
import SelectArkivskaper from "./Components/SelectArkivskaper";
import SelectProject from "./Components/SelectProject";
import Series from "./Components/Series";
import first_image from "../../../../assets/image/video-slash.png";
import Capture from "./Components/Capture";

const Home = () => {
  return (
    <div className="md:container-fluid md:mx-auto bg-neutral-700 text-white text-lg h-screen">
      <div className="grid grid-cols-10 gap-1 h-full content-center">
        <div className="col-span-6 w-fit justify-self-center">
          <Image src={first_image} />
        </div>
        <div className="col-span-4">
          <div className="grid-rows-6 mr-10 ml-5">
            <div className="row-span-1">
              <NewArkivskaper />
            </div>
            <div className="row-span-1 mt-10">
              <SelectArkivskaper />
            </div>
            <div className="row-span-1 mt-5">
              <NewProject />
            </div>
            <div className="row-span-1 mt-5">
              <SelectProject />
            </div>
            <div className="row-span-1 mt-5">
              <Series />
            </div>
            <div className="row-span-1 mt-5">
              <Capture />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
