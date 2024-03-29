import Viewer from "react-viewer";
const Image = ({ src }: { src: string }): JSX.Element => {
  const viewer = document.getElementById("imageViewer") as HTMLElement;
  return (
    <div id="imageViewer" className="container step-14">
      <Viewer
        container={viewer}
        disableKeyboardSupport={true}
        className="inline-container min-h-screen"
        visible={true}
        noClose
        noNavbar
        showTotal={false}
        zoomSpeed={0.5}
        images={[{ src: src, alt: "" }]}
        zIndex={1}
      />
    </div>
  );
};
export default Image;
