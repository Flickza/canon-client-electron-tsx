import React from "react";
import Modal from "./Modal";
const Save = ({
  showModal,
  setShowModal,
  path,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}) => {
  return (
    <>
      <button
        className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} path={path} />
    </>
  );
};

export default Save;
