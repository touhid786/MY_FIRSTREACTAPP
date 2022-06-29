import React from "react";
import { Button } from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../Redux/Reducers/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const dispatch = useDispatch();

  const submit = async () => {
    //SERVER REQUEQT FOR OTP
    try {
      const { data } = await sendOtp({ phone: phoneNumber });
      console.log(data);
      //console.log(data.phone, data.hash);
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
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
