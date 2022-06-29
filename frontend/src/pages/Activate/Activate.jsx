import React from "react";
import StepName from "../Steps/StepName/StepName.jsx"
import StepAvtar from "../Steps/StepAvtar/StepAvtar.jsx"
import { useState } from "react";
import styles from "../../app.module.css"

import {setName} from "../../Redux/Reducers/activateSlice"

const steps = {
  1: StepName,
  2: StepAvtar,
};

const Activate = () => {

 
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step + 1);
  };

  return (
    <div className={styles.cardWrapper}>
      <Step onNext={onNext}></Step>
    </div>
  );
};

export default Activate;
