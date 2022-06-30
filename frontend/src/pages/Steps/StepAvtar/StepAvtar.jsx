import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepAvtar.module.css";
import { useDispatch } from "react-redux";
import { setAvtar } from "../../../Redux/Reducers/activateSlice";
import { activate } from "../../../http";
import { setAuthentication} from "../../../Redux/Reducers/authSlice"
const StepAvtar = ({ onNext }) => {
  const [image, setImage] = useState("/images/userImage.png");
  const { name, avtar } = useSelector((state) => state.activate);
  const dispatch = useDispatch();

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvtar(reader.result));
    };
  };

  const submit = async () => {
    //console.log("submit method called");
    try {
      //console.log(name, avtar);
      const { data } = await activate({ name, avtar });
            //console.log(data);
       //console.log(data.auth);
      
      if(data.auth){
        dispatch(setAuthentication(data.user))
        
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card title={`Okay, ${name}!`} icon="monkey">
        <p className={styles.subHeading}>How’s this photo?</p>
        <div className={styles.avtarWrapper}>
          <img className={styles.avtar} src={image} alt="profileImage" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avtarInput"
            type="file"
            className={styles.avtarInput}
          />
          <label className={styles.avtarLabel} htmlFor="avtarInput">
            Choose a different photo
          </label>
        </div>
        <div>
          <Button text="Next" onClick={submit} />
        </div>
      </Card>
    </>
  );
};

export default StepAvtar;
