import { seriesObject } from "@/render/types";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import SaveToast from "./SaveToast";

const Save = ({
  showModal,
  setShowModal,
  path,
  prefix,
  setImage,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: seriesObject;
  prefix: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const showSaveOptions = (
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    path: seriesObject,
    prefix: string | undefined
  ) => {
    {
      if (showModal === true && path && prefix) {
        toast(<SaveToast path={path} prefix={prefix} setImage={setImage} />, {
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
    showSaveOptions(showModal, setShowModal, path, prefix);
  }, [showModal]);

  return <></>;
};

export default Save;
