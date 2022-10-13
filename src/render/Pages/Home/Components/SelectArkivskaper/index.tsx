import React from "react";

const SelectArkivskaper = () => {
  return (
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
  );
};

export default SelectArkivskaper;
