export const resetImage = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const reset = document.querySelector(".react-viewer-icon-reset")!;
  if (reset) {
    const button = reset?.parentNode as HTMLElement;
    button.click();
  }
};
