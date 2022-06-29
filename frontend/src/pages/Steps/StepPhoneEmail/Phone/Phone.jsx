import React from "react";
import { Button } from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    //SERVER REQUEQT FOR OTP
    try {
      const { data } = await sendOtp({ phoneNumber });
      console.log(data);
      onNext();
    } catch (e) {
      console.log(e);
    }
  };

 
  return (
    <Card title="Enter you phone number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <div>
        <div className={styles.buttonActionWrap}>
          <Button text="Next" onClick={submit} />
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
