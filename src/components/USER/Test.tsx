import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonRadio, IonRadioGroup, IonAlert, IonModal, IonCard, IonCardHeader } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Webcam from 'webcam-easy';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { API } from "../../constants";

export const Test = () => {
    const [SelectedAnswer, setSelectedAnswer] = useState('')
    const [TestStarted, setTestStarted] = useState(false)
    const [pic, setPic] = useState(false)
    const [TestRunning, setTestRunning] = useState(false)
    const [WebCamStatus, setWebCamStatus] = useState('')
    const [isAlertOpen, setisAlertOpen] = useState(false);

    const webcamElementRef = useRef(null);
    const canvasElementRef = useRef(null);
    const webcamRef = useRef(null);

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
        console.log(decodedData)
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
            console.log("picture taken")
          const picture = webcamRef.current.snap();
          setPic(picture);
        }
      };
    
      const sendImg = () => {
        if (pic) {
          const formData = new FormData();
          const imageBlob = dataURItoBlob(pic);
          console.log(imageBlob)
          formData.append('image', imageBlob, 'stickers.jpg')
        console.log(formData)
          Axios.post(API.TAKE_PIC_VERIFY_USER, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                "auth-token": localStorage.getItem('Identity'), // Replace with your auth token
              },
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      };

      useEffect(() => {
        if(pic){    
      
            sendImg()
        }
      }, [pic])
    if(TestRunning){
        console.log('Test is runnning')
    }
    const StartTest = () => {
        // setTestStarted(true)
        // document.documentElement.requestFullscreen();
        console.log(webcamRef);
        if (webcamRef.current) {
            console.log('deeji', webcamRef)
                takePhoto()
                setTimeout(() => {
                    // sendImg();
                }, 4000);
                console.log('Test is runnning')
          
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
                        <IonTitle>{'TEST'}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonAlert
                        isOpen={isAlertOpen}
                        header="Confirm before Starting Exam"
                        message={'Are You sure you want to start the exam'}
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
                    <IonButton onClick={() => { setisAlertOpen(true) }}>Start Test</IonButton>
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

                    


                <IonModal id="StartTestModal" isOpen = {true}>
                    <IonCard>
                        <IonCardHeader>

                        <IonTitle>Please Do not Change Tabs and Exit FullScreen Mode</IonTitle>
                        </IonCardHeader>
                    </IonCard>
                    <IonButton onClick={() => {StartTest(); document.getElementById('StartTestModal').dismiss() }}>I Understand</IonButton>
                </IonModal>


                <IonRadioGroup onIonChange={handleAnswerChange} value={SelectedAnswer}>
                    <IonLabel>Which framework is commonly used for building mobile apps with Ionic and ReactJS?</IonLabel>
                    <IonItem>
                        <IonRadio value="A" >A) Angular</IonRadio>
                        <IonLabel></IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonRadio value="B" >B) Vue.js</IonRadio>
                    </IonItem>
                    <IonItem>
                        <IonRadio value="C" >C) jQuery</IonRadio>
                    </IonItem>
                    <IonItem>
                        <IonRadio value="D" >D) Flutter</IonRadio>
                    </IonItem>
                </IonRadioGroup>
                <IonButton expand="full" onClick={handleSubmit}>Submit</IonButton>
                <IonButton expand="full" onClick={takePhoto}>takePhoto</IonButton>
                <IonButton expand="full" onClick={sendImg}>Send img</IonButton>

            </IonContent>
        </IonPage>
    )

}

export default Test;