import React from "react";
import { toast } from "react-toastify";

const FolderName = ({
  current,
  set,
}: {
  current: folderObject;
  set: React.Dispatch<React.SetStateAction<folderObject>>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const openPath = async () => {
    const path: dirObject = await window.electron.choosePath();
    if (!path.canceled) {
      const fullPath = path?.filePaths[0];
      const folder = fullPath.split("\\").at(-1);
      if (folder) {
        set({ fullPath: fullPath, folderPath: folder, last_image_index: path.last_image_index });
        return toast.success(`Ok. ${fullPath}`, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      }
    } else {
      return toast.success("Kansellert.", {
        position: "top-right",
        autoClose: 500,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <p>Mappe navn:</p>
      <span className="flex gap-3">
        <input
          type="text"
          className="form-control border w-5/6"
          placeholder={current.folderPath}
        />
        <button className="btn btn-main border w-1/6" onClick={openPath}>
          <span className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              />
            </svg>
          </span>
        </button>
      </span>
    </div>
  );
};

export default FolderName;
