import React, { useState } from "react";
import { Button } from "../../../components/shared/Button/Button";
import Phone from "../../Steps/StepPhoneEmail/Phone/Phone";
import Email from "../../Steps/StepPhoneEmail/Email/Email";
import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.tabButton} ${
              type === "phone" ? styles.active : ""
            }`}
            onClick={() => setType("phone")}
          >
            <img src="/images/whitephone.png" alt="phone" />
          </button>
          <button
            className={`${styles.tabButton} ${
              type === "email" ? styles.active : ""
            }`}
            onClick={() => setType("email")}
          >
            <img src="/images/whiteemail.png" alt="phone" />
          </button>
        </div>

        <Component onNext={onNext} />
      </div>
    </>
  );
};

export default StepPhoneEmail;
