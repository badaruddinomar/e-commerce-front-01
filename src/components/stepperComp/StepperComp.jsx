// components--
import { Stepper, Step } from "react-form-stepper";
// MUI Icons--
import PaidIcon from "@mui/icons-material/Paid";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// style file--
import "./stepperComp.scss";

// eslint-disable-next-line react/prop-types
const StepperComp = ({ activeStepNo }) => {
  return (
    <Stepper className="stepper" activeStep={activeStepNo}>
      <Step label={<LocalShippingIcon className="icon" />} />
      <Step label={<NoCrashIcon className="icon" />} />
      <Step label={<PaidIcon className="icon" />} />
    </Stepper>
  );
};

export default StepperComp;
