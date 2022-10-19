import React from "react";
import Viewer from "react-viewer";
const Image = ({
  src,
  viewer,
  className,
}: {
  src: string;
  viewer: HTMLElement;
  className: string;
}): JSX.Element => {
  return (
    <Viewer
      className={className}
      visible={true}
      noClose
      container={viewer}
      noNavbar
      showTotal={false}
      images={[
        { src: src, alt: "", },
      ]}
      zIndex={1}
    />
  );
};
export default Image;
