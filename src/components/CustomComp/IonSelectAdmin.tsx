import React from "react";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { ConstantData, ICON } from "../../../constants";

interface IProps {
  title?: string,
  value: string,
  error?: string
  onChange: Function,
  data: ConstantData[],
}


export const IonSelectAdmin: React.FC<any> = ({ title, ionIcon, value, onChange , data, error, disabled }) => {
  return (
    <>
      <IonItem >
        <IonIcon style={{ padding: "0px 10px 0 0", width:'25px', height:'25px'}} icon={ICON[ionIcon]}>
        </IonIcon>
        <IonSelect style={{fontSize:'10px'}} class="Hello"
          interface="alert"
          value={value}
          disabled = {disabled}
          label={title}
          onIonChange={(e) => onChange(e.detail.value)}
        >
          {data.map(({ _id, EventName }:any, index:any) => (<IonSelectOption  key={index} value={_id}>{EventName}</IonSelectOption>))}
        </IonSelect>
      </IonItem>
      <IonText color="danger">{error}</IonText>
    </>
  );
};
