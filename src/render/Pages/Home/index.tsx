/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect } from "react";
import Image from "./Components/Image";
import SelectArkivskaper from "./Components/SelectArkivskaper";
import SelectProject from "./Components/SelectProject";
import first_image from "../../../../assets/image/video-slash.png";
import Capture from "./Components/Capture";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Save from "./Components/Save";
import "./index.css";
import FolderName from "./Components/FolderName";
import SelectSeries from "./Components/SelectSeries";
import SelectProtocol from "./Components/SelectProtocol";
import { resetImage } from "@/render/utils/resetImage";
import { useTour } from "@reactour/tour";

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
  const [currentProtocol, setProtocol] = React.useState<Protocol | undefined>();

  const [updateArkivskaper, setUpdateArkivskaper] =
    React.useState<boolean>(false);
  const [updateProject, setUpdateProject] = React.useState<boolean>(false);
  const [updateSeries, setUpdateSeries] = React.useState<boolean>(false);
  const [updateProtocol, setUpdateProtocol] = React.useState<boolean>(false);
  const { setIsOpen } = useTour();

  const [captureDisabled, setCaptureDisabled] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState(false);
  const [prefix, setPrefix] = React.useState<string | undefined>();

  /* Creating a prefix for the images that are captured. */
  useEffect(() => {
    if (
      currentArkivskaper?.name &&
      currentProject?.navn &&
      currentSeries?.navn &&
      currentProtocol?.navn
    ) {
      // get current date
      const date = new Date();
      // make a date string that looks like day-month-year
      const dateString = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getUTCFullYear()}`;
      // create a prefix with [arkivskaper name]_[currentProject]_[dateString]
      setPrefix(
        `mugg_${currentArkivskaper.name}_${currentProject.navn}_${currentSeries.navn}_${currentProtocol?.navn}_${dateString}`
      );
    } else {
      setPrefix(undefined);
      return;
    }
    toast.dismiss();
    resetImage();
  }, [currentProject, currentArkivskaper, currentSeries, currentProtocol]);

  /* Resetting the folder when the arkivskaper is changed. */
  useEffect(() => {
    setFolder({ fullPath: "", folderPath: "", last_image_index: 0 });
  }, [currentArkivskaper]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const divs = Array.from(document.querySelectorAll("div")!);
    divs.forEach((div) => {
      if (div.firstChild === null && div?.parentElement?.nodeName === "BODY") {
        div.remove();
      }
    });
    resetImage();
  }, [currentImage]);
  return (
    <>
      <ToastContainer />
      <div className="md:container-fluid flex min-h-screen justify-center bg-neutral-700 text-lg text-white md:mx-auto">
        <div className="fixed z-50 flex h-screen w-screen flex-grow flex-col items-center justify-center md:hidden">
          <div className="text-xl text-red-500">
            Screensize is too small to use this application.
          </div>
          <div className="text-base text-orange-100/90">
            Please use a larger screen or resize the application.
          </div>
        </div>
        <div className="min-h-full min-w-full grid-cols-10 gap-1 sm:hidden md:grid">
          <div className="col-span-6 min-h-screen">
            <Image src={currentImage} />
          </div>
          <div className="step-1 col-span-4 flex min-h-full">
            <div className="grid min-w-full grid-cols-8 content-center gap-6">
              <div className="col-span-6 col-start-2">
                <Save
                  id={currentProtocol?.id?.toString()}
                  setImage={setImage}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  path={currentFolder}
                  prefix={prefix}
                  setCaptureDisabled={setCaptureDisabled}
                />
              </div>
              <div className="col-span-6 col-start-2 flex justify-end">
                <button
                  className="btn btn-main w-full border p-3 lg:w-1/2"
                  onClick={() => setIsOpen(true)}
                >
                  Brukerveiledning
                </button>
              </div>
              <div className="step-2 step-3 col-span-6 col-start-2">
                <SelectArkivskaper
                  current={currentArkivskaper}
                  set={setArkivskaper}
                  updateArkivskaper={updateArkivskaper}
                  setUpdateArkivskaper={setUpdateArkivskaper}
                />
              </div>
              <div className="step-6 col-span-6 col-start-2">
                <SelectProject
                  arkivskaper={currentArkivskaper}
                  current={currentProject}
                  set={setProject}
                  setUpdateProject={setUpdateProject}
                  updateProject={updateProject}
                />
              </div>
              <div className="step-8 col-span-6 col-start-2">
                <SelectSeries
                  arkivskaper={currentArkivskaper}
                  project={currentProject}
                  current={currentSeries}
                  set={setSeries}
                  setUpdateSeries={setUpdateSeries}
                  updateSeries={updateSeries}
                />
              </div>
              <div className="step-10 col-span-6 col-start-2">
                <SelectProtocol
                  series={currentSeries}
                  current={currentProtocol}
                  set={setProtocol}
                  setUpdateProtocol={setUpdateProtocol}
                  updateProtocol={updateProtocol}
                />
              </div>
              <div className="step-12 col-span-6 col-start-2">
                <FolderName current={currentFolder} set={setFolder} />
              </div>
              <div className="step-12 step-13 col-span-6 col-start-2">
                <Capture
                  setImage={setImage}
                  currentImage={currentImage}
                  setShowModal={setShowModal}
                  currentFolder={currentFolder}
                  currentProtocol={currentProtocol}
                  prefix={prefix}
                  captureDisabled={captureDisabled}
                  setCaptureDisabled={setCaptureDisabled}
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
