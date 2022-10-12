import React from "react";

import first_image from "../../../../assets/image/video-slash.png";

const Home = () => {
  return (
    <div className="md:container-fluid md:mx-auto bg-neutral-700 text-white text-lg h-screen">
      <div className="grid grid-cols-10 gap-1 h-full content-center">
        <div className="col-span-6 w-fit justify-self-center">
          <img
            className="object-contain"
            src={first_image}
            alt="img"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className="col-span-4">
          <div className="grid-rows-6 mr-10 ml-5">
            <div className="row-span-1">
              <div>
                <p>Ny arkivskaper:</p>
                <span className="flex gap-3">
                  <input type="text" className="form-control border w-5/6" />
                  <button className="btn btn-main border w-1/6">+</button>
                </span>
              </div>
            </div>
            <div className="row-span-1 mt-10">
              <div>
                <p>Velg arkivskaper:</p>
                <select className="form-select select-arrow-down focus:select-arrow-up border w-full">
                  <option className="form-select" value="BODO">
                    Bodo
                  </option>
                  <option className="form-select" value="BODO">
                    Fauske
                  </option>
                  <option className="form-select" value="BODO">
                    Flagstad
                  </option>
                </select>
              </div>
            </div>
            <div className="row-span-1 mt-5">
              <div>
                <p>Nytt prosjekt:</p>
                <span className="flex gap-3">
                  <input type="text" className="form-control border w-5/6" />
                  <button className="btn btn-main border w-1/6">+</button>
                </span>{" "}
              </div>
            </div>
            <div className="row-span-1 mt-5">
              <div>
                <p>Velg prosjekt:</p>
                <select className="form-select select-arrow-down border w-full">
                  <option className="form-select" value="BODO">
                    Bodo
                  </option>
                  <option className="form-select" value="BODO">
                    Fauske
                  </option>
                  <option className="form-select" value="BODO">
                    Flagstad
                  </option>
                </select>
              </div>
            </div>
            <div className="row-span-1 mt-5">
              <div>
                <p>Arkivserie:</p>
                <input type="text" className="form-control border w-full" />
              </div>
            </div>
            <div className="row-span-1 mt-5">
              <button className="btn btn-main border p-5 w-full hover:brightness-125">
                ta bilde
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
