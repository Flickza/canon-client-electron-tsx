import React from "react";

const NewProject = () => {
  return (
    <div>
      <p>Nytt prosjekt:</p>
      <span className="flex gap-3">
        <input type="text" className="form-control border w-5/6" />
        <button className="btn btn-main border w-1/6">+</button>
      </span>
    </div>
  );
};

export default NewProject;
