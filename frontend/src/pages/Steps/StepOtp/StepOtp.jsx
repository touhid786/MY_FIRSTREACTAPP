import React, { useState } from "react";
import { Button } from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otp);

  const submit = async() => {
    try {

      const {data}=await verifyOtp({otp,hash,phone});
      console.log(otp,hash,phone);
      console.log(data);
    } catch (e) {

    }
  };

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we sent to your phone" icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>
          <p className={styles.bottomPara}>
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
