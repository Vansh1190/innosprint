import React from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";

import { ICON } from "../../constants";



export const IonInputNew: React.FC<any> = ({ type = "text", title,name, ionIcon, value, minlength, maxlength, required, readonly, onChange, error}) => {
  return (
    <>
      <IonItem>
        {/* <IonLabel position='floating' style={{display:'flex', alignItems:'center'}}> */}
        <IonIcon style={{padding: "0px 10px 0 0 ", width:'25px', height:'25px'}}  size="medium" icon={ICON[ionIcon]}>
        </IonIcon>
        {/* </IonLabel> */}
        <IonInput
          type={type}
          required={required}
          value={value}
          label={title}
          minlength={minlength}
          className="ionInput"
          maxlength={maxlength}
          readonly = {readonly}
          labelPlacement="floating"
          name={name}
          onInput={(e) => {
            onChange((e.target as HTMLInputElement).value)}}
        ></IonInput>
      </IonItem>
      <IonText color="danger">{error}</IonText>
    </>
  );
};
