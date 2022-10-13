import React from "react";

const NewArkivskaper = () => {
  return (
    <div>
      <p>Ny arkivskaper:</p>
      <span className="flex gap-3">
        <input type="text" className="form-control border w-5/6" />
        <button className="btn btn-main border w-1/6">+</button>
      </span>
    </div>
  );
};

export default NewArkivskaper;
