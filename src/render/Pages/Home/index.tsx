import React from "react";
import Image from "./Components/Image";
import NewArkivskaper from "./Components/NewArkivskaper";
import NewProject from "./Components/NewProject";
import SelectArkivskaper from "./Components/SelectArkivskaper";
import SelectProject from "./Components/SelectProject";
import Series from "./Components/Series";
import first_image from "../../../../assets/image/video-slash.png";
import Capture from "./Components/Capture";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { seriesObject } from "@/render/types";
import Save from "./Components/Save";
import "./index.css";

const Home = () => {
  const [currentImage, setImage] = React.useState(first_image);
  const [currentProject, setProject] = React.useState<string | undefined>();
  const [currentArkivskaper, setArkivskaper] = React.useState<
    number | undefined
  >();
  const [currentSeries, setSeries] = React.useState<seriesObject>({
    fullPath: "",
    folderPath: "",
  });
  const [updateArkivskaper, setUpdateArkivskaper] =
    React.useState<boolean>(false);
  const [updateProject, setUpdateProject] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState(false);

  console.log("Rendered!");

  return (
    <>
      <ToastContainer />
      <div className="md:container-fluid md:mx-auto text-white text-lg min-h-screen flex justify-center bg-neutral-700">
        <div className="grid grid-cols-10 gap-1 min-h-full min-w-full">
          <div className="col-span-6 min-h-screen">
            <Image src={currentImage} />
          </div>
          <div className="col-span-4 min-h-full min-w-full">
            <div className="grid-rows-7 lg:mr-16 lg:ml-16 xs:mr-5 xs:ml-5 mt-36">
              <div className="row-span-1 mt-5 flex justify-center">
                <Save
                  showModal={showModal}
                  setShowModal={setShowModal}
                  path={currentSeries.folderPath}
                />
              </div>
              <div className="row-span-1">
                <NewArkivskaper
                  setUpdateArkivskaper={setUpdateArkivskaper}
                  setArkivskaper={setArkivskaper}
                />
              </div>
              <div className="row-span-1 mt-10">
                <SelectArkivskaper
                  current={currentArkivskaper}
                  updateArkivskaper={updateArkivskaper}
                  setUpdateArkivskaper={setUpdateArkivskaper}
                  set={setArkivskaper}
                />
              </div>
              <div className="row-span-1 mt-5">
                <NewProject
                  arkivskaper_id={currentArkivskaper}
                  setUpdateProject={setUpdateProject}
                />
              </div>
              <div className="row-span-1 mt-5">
                <SelectProject
                  arkivskaper_id={currentArkivskaper}
                  current={currentProject}
                  set={setProject}
                  setUpdateProject={setUpdateProject}
                  updateProject={updateProject}
                />
              </div>
              <div className="row-span-1 mt-5">
                <Series current={currentSeries} set={setSeries} />
              </div>
              <div className="row-span-1 mt-5 flex justify-center">
                <Capture
                  setImage={setImage}
                  setShowModal={setShowModal}
                  prefixData={{
                    currentSeries,
                    currentArkivskaper,
                    currentProject,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
