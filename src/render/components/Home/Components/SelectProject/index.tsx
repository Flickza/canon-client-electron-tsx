import React from "react";

const SelectProject = () => {
  return (
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
  );
};

export default SelectProject;
