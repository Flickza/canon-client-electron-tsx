import React from "react";

const Image = ({ ...props }): JSX.Element => {
  return (
    <img
      {...props}
      alt="img"
      width={"100%"}
      height={"100%"}
      className="object-contain"
    />
  );
};
export default Image;
