import React, { useEffect } from "react";
import { toast, ToastContentProps } from "react-toastify";

const Save = ({
  showModal,
  setShowModal,
  path,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}) => {
  const SaveComponent = ({
    closeToast,
    toastProps,
    path,
  }: {
    closeToast?: ToastContentProps["closeToast"];
    toastProps?: ToastContentProps["toastProps"];
    path?: string;
  }): JSX.Element => {
    return (
      <div className="container min-w-full min-h-full cursor-default">
        <div className="border-b border-neutral-600">
          <h3 className="text-lg">Lagre bildet?</h3>
        </div>
        <div className="border-b flex justify-center p-2 border-neutral-600">
          {path ? path : "C:/PATH/TO/IMAGE"}
        </div>
        <div className="flex justify-center align-center gap-3 pt-5 pr-5 pl-5 bg-transparent min-w-full">
          <button
            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-5 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={closeToast}
          >
            Nei
          </button>
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-5 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={closeToast}
          >
            Ja
          </button>
        </div>
      </div>
    );
  };
  const showSaveOptions = (
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    path: string
  ) => {
    {
      if (showModal === true) {
        toast(<SaveComponent path={path} />, {
          position: "bottom-left",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          theme: "dark",
        });
        setShowModal(false);
      }
    }
  };
  useEffect(() => {
    showSaveOptions(showModal, setShowModal, path);
  }, [showModal]);
  return <></>;
};

export default Save;
