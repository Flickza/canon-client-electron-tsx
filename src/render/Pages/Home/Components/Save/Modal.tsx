import React from "react";

export default function Modal({
  showModal,
  setShowModal,
  path,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-2xl shadow-lg relative flex flex-col w-96 bg-zinc-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center p-5 border-b border-solid border-neutral-400 rounded-t">
                  <h3 className="text-3xl font-semibold">Lagre bilde?</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex justify-center border-b border-solid border-neutral-400">
                  <h3 className="text-lg font-semibold">
                    {path ? path : `C:/Path/to/image.jpg`}
                  </h3>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 gap-10 rounded-b min-w-full">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Nei
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Ja
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
