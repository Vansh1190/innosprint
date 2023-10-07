import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonRadio, IonRadioGroup, IonAlert, IonModal, IonCard, IonCardHeader } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import Webcam from 'webcam-easy';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";

export const Test = () => {
    const [SelectedAnswer, setSelectedAnswer] = useState('')
    const [TestStarted, setTestStarted] = useState(false)
    const [pic, setPic] = useState(false)
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

    const dataURItoBlob = (dataURI:any) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        return new Blob([ab], { type: mimeString });
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
          console.log(formData)
          formData.append('image', imageBlob, 'stickers.jpg');
    
          Axios.post('/verifyIMG', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjRmYzczODU3ZGM5ZjQ3YzQyNTg1MDZhIn0sImlhdCI6MTY5NDI2NjMxMH0.whrSSKONh6sQ286atz7RiMBoLcSY25D84CCtKYlluco", // Replace with your auth token
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


    const StartTest = () => {
        // setTestStarted(true)
        document.documentElement.requestFullscreen();
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