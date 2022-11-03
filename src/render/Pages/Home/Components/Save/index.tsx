import React, { useEffect } from "react";
import { toast } from "react-toastify";
import SaveToast from "./SaveToast";

const Save = ({
  id,
  showModal,
  setShowModal,
  path,
  prefix,
  setImage,
}: {
  id: string | undefined;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: folderObject;
  prefix: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const showSaveOptions = (
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    path: folderObject,
    prefix: string | undefined
  ) => {
    {
      if (showModal === true && path && prefix) {
        toast(
          <SaveToast id={id} path={path} prefix={prefix} setImage={setImage} />,
          {
            position: "bottom-left",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            theme: "dark",
          }
        );
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
