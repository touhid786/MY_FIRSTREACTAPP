import React from "react";
import { Button } from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Phone = ({onNext}) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <Card title="Enter you phone number" icon="phone">
      <TextInput value={" "} onChange={()=>setPhoneNumber()} />

      <div>
      <div className={styles.buttonActionWrap}>
      <Button text="Next" onClick={onNext}/>
      </div>
      <p className={styles.bottomPara}>
          By entering your number, you’re agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
