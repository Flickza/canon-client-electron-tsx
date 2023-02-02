import React from "react";
import { toast } from "react-toastify";

const Capture = ({
  setImage,
  currentImage,
  setShowModal,
  currentFolder,
  currentProtocol,
  prefix,
  setCaptureDisabled,
  captureDisabled,
}: {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  currentImage: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentFolder: folderObject;
  currentProtocol: Protocol | undefined;
  prefix: string | undefined;
  setCaptureDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  captureDisabled: boolean;
}) => {
  // handle capture button click
  const handleCapture = async () => {
    // check if path is not set
    if (!prefix) {
      // Send warning notification if not set
      return toast.warn("Mangler arkivskaper, prosjekt eller arkivserie.", {
        toastId: "capture",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "light",
      });
    }
    window.electron.clearCache(); // clear cache
    if (currentFolder.fullPath === "") {
      // Send warning notification if not set
      return toast.warn("Ingen mappe er valgt? Velg mappe og prøv igjen.", {
        toastId: "capture",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "light",
      });
    }
    if (captureDisabled === true) {
      return toast.error(
        "Behandle bildet du allerede har tatt før du trykker igjen.",
        {
          toastId: "capture",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "light",
        }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (currentFolder.fullPath && captureDisabled === false) {
      // check if path is set
      const capture: response = await window.electron.captureImage(
        currentFolder.fullPath,
        currentProtocol
      ); // send signal to capture image to path
      if (capture.statusCode !== 200) {
        // check if capture failed
        return toast.error(capture.message, {
          toastId: "capture",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "light",
        });
      }
      //check if image is not already set
      if (capture.file && capture.file !== currentImage) {
        setImage(capture.file); // set image captured
        setCaptureDisabled(true);
        setShowModal(true); // show save yes/no notification
      }
    }
  };
  return (
    <div className="flex justify-center">
      <button
        className="btn btn-main step-11 flex w-2/4 justify-center rounded-b border p-2 hover:brightness-125"
        onClick={handleCapture}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Capture;
