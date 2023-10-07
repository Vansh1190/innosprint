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


export const IonSelectNew: React.FC<any> = ({ title, ionIcon, value, onChange , SelectInterface, data, error , disabled}) => {
  console.log(data)
  return (
    <>
      <IonItem >
        <IonIcon style={{ padding: "0px 10px 0 0", width:'25px', height:'25px'}} icon={ICON[ionIcon]}>
        </IonIcon>
        <IonSelect style={{fontSize:'10px'}} class="Hello"
          interface= {SelectInterface}
          value={value}
          label={title}
          disabled = {disabled}
          onIonChange={(e) => onChange(e.detail.value)}
        >
          {data.map(({ title, value }:any) => (<IonSelectOption  key={value} value={value}>{title}</IonSelectOption>))}
        </IonSelect>
      </IonItem>
      <IonText color="danger">{error}</IonText>
    </>
  );
};
