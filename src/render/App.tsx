/* eslint-disable @typescript-eslint/no-unsafe-call */
import Routes from "./Routes";
import { TourProvider } from "@reactour/tour";
import { steps } from "./utils/steps";
const App = () => {
  return (
    <TourProvider
      steps={steps}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
      }}
    >
      <Routes />
    </TourProvider>
  );
};

export default App;
