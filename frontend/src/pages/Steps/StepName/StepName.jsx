import React from "react";
import { useState } from "react";
import { Button } from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card.jsx";
import TextInput from "../../../components/shared/TextInput/TextInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../Redux/Reducers/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullName, setFullfullName] = useState(name);

  const nextStep = () => {
    if (!fullName) {
      return; 
    }
    dispatch(setName(fullName));
    onNext();
  };

  return (
    <>
      <Card title="What’s your full name?" icon="name">
        <TextInput
          value={fullName}
          onChange={(e) => setFullfullName(e.target.value)}
        />
        <p className={styles.paragraph}>People use real names at codershouse :)</p>
        <div>
          <Button text="Next" onClick={nextStep} />
        </div>
      </Card>
    </>
  );
};

export default StepName;
