import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonRadio, IonRadioGroup, IonAlert, IonModal, IonCard, IonCardHeader, IonCardTitle, useIonToast } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Webcam from 'webcam-easy';
import './RegisterExam.css'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { API } from "../../constants";

export const RegisterExam = () => {

    const [SelectedAnswer, setSelectedAnswer] = useState('')
    const [TestStarted, setTestStarted] = useState(false)
    const [pic, setPic] = useState(false)
    const [WebCamStatus, setWebCamStatus] = useState('')
    const [isAlertOpen, setisAlertOpen] = useState(false);

    const webcamElementRef = useRef(null);
    const canvasElementRef = useRef(null);
    const webcamRef = useRef(null);

    const [showToast] = useIonToast();

    useEffect(() => {

        const { current: webcamElement } = webcamElementRef;
        const { current: canvasElement } = canvasElementRef;

        if (webcamElement && canvasElement) {
            const webcamInstance = new Webcam(webcamElement, 'user', canvasElement);
            webcamRef.current = webcamInstance;
        }

        return () => {
            // Clean up resources when the component unmounts
            if (webcamRef.current) {
                webcamRef.current.stop();
            }
        };

    }, [TestStarted])

    const handleAnswerChange = (event: any) => {
        setSelectedAnswer(event.detail.value);
    };

    const handleSubmit = () => {
        // You can add your logic to check the selected answer and provide feedback here
        alert(`Selected Answer: ${SelectedAnswer}`);
    };

    const dataURItoBlob = (base64Data:any, contentType = 'image/jpeg', sliceSize = 512) => {
        console.log(base64Data)
        const parts = base64Data.split(';base64,');
        const decodedData = window.atob(parts[1]);
        const byteArrays = [];
        for (let offset = 0; offset < decodedData.length; offset += sliceSize) {
          const slice = decodedData.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      };
      

      
    const takePhoto = () => {
        if (webcamRef.current) {
          const picture = webcamRef.current.snap();
          setPic(picture);
        }
      };
    
      const sendImg = () => {
        if (pic) {
          const formData = new FormData();
          const imageBlob = dataURItoBlob(pic);
          console.log(imageBlob)
          console.log(formData)
          formData.append('image', imageBlob, 'stickers.jpg');
            
          Axios.post(API.TAKE_PIC_REGISTER_EXAM, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                "auth-token": localStorage.getItem('Identity') // Replace with your auth token
              },
            })
            .then(res => {
              console.log(res);
              showToast(res.data.message, 4000);
              
            })
            .catch(err => { 
              showToast(err.response.data.message, 4000);
              console.log(err);
            });
        }
      };


    const StartTest = () => {
        // setTestStarted(true)
        // document.documentElement.requestFullscreen();
        console.log(webcamRef);
        if (webcamRef.current) {
            console.log('deeji', webcamRef)
            webcamRef.current
                .start()
                .then(result => {
                    console.log("webcam started", result);
                })
                .catch(err => {
                    console.log('error')
                    console.log(err);
                });
        }
        else {
            console.log('deeji')
        }
    };


    if (!TestStarted) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>{'Register for Exam'}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonAlert
                        isOpen={isAlertOpen}
                        header="Required Camera Access"
                        message={'Allow Camera permissions'}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    console.log('Alert canceled');
                                },
                            },
                            {
                                text: 'OK',
                                role: 'confirm',
                                handler: () => {
                                    setTestStarted(true)
                                },
                            },
                        ]}
                    >
                    </IonAlert>
                    <IonCard>
                        <IonCardHeader>

                    <IonCardTitle className="ExamContainer">
                        Exam Name - App Development Course
                        <IonButton  onClick={() => { setisAlertOpen(true) }}>Start Test</IonButton>
                    </IonCardTitle>
                        </IonCardHeader>
                    </IonCard>
                </IonContent>
            </IonPage>
        )
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{'TEST'}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <ToastContainer position="top-center" autoClose={3000} draggable theme='dark' />

                <video ref={webcamElementRef} className='UserVideo' autoPlay playsInline width="640" height="480"></video>
                <canvas ref={canvasElementRef} className="d-none"></canvas>

                    


                <IonModal id="StartTestModal" isOpen = {true} >
                    <IonCard>
                        <IonCardHeader>

                        <IonTitle>Please Be in a Well Suited Ennvironment with proper lighting</IonTitle>
                        </IonCardHeader>
                    </IonCard>
                    <IonButton onClick={() => {StartTest(); document.getElementById('StartTestModal').dismiss() }}>
                        I Understand</IonButton>
                </IonModal>
                <IonButton expand="full" onClick={takePhoto}>takePhoto</IonButton>
                <IonButton expand="full" onClick={sendImg}>Submit img</IonButton>

            </IonContent>
        </IonPage>
    )

}

export default RegisterExam;