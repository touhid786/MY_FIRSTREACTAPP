import React from "react";
import { useState } from "react";
import StepAvtar from "../Steps/StepAvtar/StepAvtar";
import StepName from "../Steps/StepName/StepName";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepUsername from "../Steps/StepUsername/StepUsername";
import styles from "./Register.module.css";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvtar,
  5: StepUsername,
};

export const Register = () => {
  const onNext = () => {
    setStep(step+1);
  };

  const [step, setStep] = useState(1);
  const Step = steps[step];
  return (
    <div>
      <Step onNext={onNext} />
    </div>
  );
};
