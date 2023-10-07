import React from "react";
import "./IonProgress.css";
import { ICON } from '../../../constants';
// @ts-ignore
// import { ProgressBar, Step } from "react-step-progress-bar";
import { IonCol, IonIcon } from "@ionic/react";
import { school } from "ionicons/icons";

interface IonProgressProps {
  value: string;
}

const IonProgress: React.FC<IonProgressProps> = ({ value }) => {
  
  let stepPercentage = 0;
  if (value === "UserDetail") {
    stepPercentage = 0;
  } else if (value === "Verification") {
    stepPercentage = 25;
  } else if (value === "Login") {
    stepPercentage = 50;
  } else if (value === "AcademicDetail") {
    stepPercentage = 75;
  } else {
    stepPercentage = 0;
  }

  return (
    // <ProgressBar percent={stepPercentage}>
      
      {/* <Step> */}
        {({ accomplished, index }: { accomplished: boolean; index: number }) => (
          <div>
            <div className={`indexedStep ${index < stepPercentage / 25 ? "accomplished" : null}`}>
              <IonIcon style={{
                position: 'absolute',fontSize:'larger', color: 'white'
              }}  size="medium" icon={ICON['newAdd']}>
              </IonIcon>
            </div>
            <p className="ProgressLabel">
              User Details
            </p>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }: { accomplished: boolean; index: number }) => (
          <div>
            <div className={`indexedStep ${index < stepPercentage / 25 ? "accomplished" : null}`}>
              <IonIcon style={{
                position:'absolute' , fontSize:'larger',color:'white'
              }} size="medium" icon={ICON['verify']} />
            </div>
            <p className="ProgressLabel">
              Verification
            </p>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }: { accomplished: boolean; index: number }) => (
          <div>
            <div className={`indexedStep ${index < stepPercentage / 25 ? "accomplished" : null}`}>
              <IonIcon style={{
                position:'absolute' , fontSize:'larger',color:'white'
              }} size="medium" icon={ICON['login']}>  
              </IonIcon>
            </div>
            <p className="ProgressLabel">
              Log In 
            </p>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }: { accomplished: boolean; index: number }) => (
          <div>
            <div className={`indexedStep ${index < stepPercentage / 25 ? "accomplished" : null}`}>
              <IonIcon style={{
                position:'absolute' , fontSize:'larger',color:'white'
              }} size="medium" icon={ICON['degree']} >
                
              </IonIcon>
             
            </div>
            <p className="ProgressLabel">
              Academic Details
            </p>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default IonProgress;
