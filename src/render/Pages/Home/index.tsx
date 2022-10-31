import React, { useEffect } from "react";
import Image from "./Components/Image";
import NewArkivskaper from "./Components/NewArkivskaper";
import NewProject from "./Components/NewProject";
import SelectArkivskaper from "./Components/SelectArkivskaper";
import SelectProject from "./Components/SelectProject";
import first_image from "../../../../assets/image/video-slash.png";
import Capture from "./Components/Capture";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Save from "./Components/Save";
import "./index.css";
import FolderName from "./Components/FolderName";
import SelectSeries from "./Components/SelectSeries";
import NewSeries from "./Components/NewSeries";

const Home = () => {
  const [currentImage, setImage] = React.useState(first_image);
  const [currentProject, setProject] = React.useState<Project | undefined>();
  const [currentArkivskaper, setArkivskaper] = React.useState<Arkivskaper>();

  const [currentSeries, setSeries] = React.useState<Series | undefined>();
  const [currentFolder, setFolder] = React.useState<folderObject>({
    fullPath: "",
    folderPath: "",
    last_image_index: 0,
  });

  const [updateArkivskaper, setUpdateArkivskaper] =
    React.useState<boolean>(false);
  const [updateProject, setUpdateProject] = React.useState<boolean>(false);
  const [updateSeries, setUpdateSeries] = React.useState<boolean>(false);

  const [showModal, setShowModal] = React.useState(false);
  const [prefix, setPrefix] = React.useState<string | undefined>();

  useEffect(() => {
    if (currentArkivskaper?.name && currentProject?.navn) {
      // get current date
      const date = new Date();
      // make a date string that looks like day-month-year
      const dateString = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getUTCFullYear()}`;
      // create a prefix with [arkivskaper name]_[currentProject]_[dateString]
      setPrefix(
        `${currentArkivskaper.name}_${currentProject.navn}_${dateString}`
      );
    } else {
      setPrefix(undefined);
    }
  }, [currentProject, currentArkivskaper]);
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
                  setImage={setImage}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  path={currentFolder}
                  prefix={prefix}
                />
              </div>
              <div className="row-span-1">
                <NewArkivskaper setUpdateArkivskaper={setUpdateArkivskaper} />
              </div>
              <div className="row-span-1 mt-10">
                <SelectArkivskaper
                  current={currentArkivskaper}
                  set={setArkivskaper}
                  updateArkivskaper={updateArkivskaper}
                  setUpdateArkivskaper={setUpdateArkivskaper}
                />
              </div>
              <div className="row-span-1 mt-5">
                <NewProject
                  arkivskaper={currentArkivskaper}
                  setUpdateProject={setUpdateProject}
                />
              </div>
              <div className="row-span-1 mt-5">
                <SelectProject
                  arkivskaper={currentArkivskaper}
                  current={currentProject}
                  set={setProject}
                  setUpdateProject={setUpdateProject}
                  updateProject={updateProject}
                />
              </div>
              <div className="row-span-1 mt-5">
                <NewSeries
                  setUpdateSeries={setUpdateSeries}
                  arkivskaper={currentArkivskaper}
                  project={currentProject}
                />
              </div>
              <div className="row-span-1 mt-5">
                <SelectSeries
                  arkivskaper={currentArkivskaper}
                  project={currentProject}
                  current={currentSeries}
                  set={setSeries}
                  setUpdateSeries={setUpdateSeries}
                  updateSeries={updateSeries}
                />
              </div>
              <div className="row-span-1 mt-5">
                <FolderName current={currentFolder} set={setFolder} />
              </div>
              <div className="row-span-1 mt-5 flex justify-center">
                <Capture
                  setImage={setImage}
                  currentImage={currentImage}
                  setShowModal={setShowModal}
                  currentSeries={currentFolder}
                  prefix={prefix}
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
