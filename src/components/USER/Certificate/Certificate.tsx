import React, { useEffect, useState } from 'react';
import { IonApp, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import './Certificate.css';
// import { useStoreState } from 'easy-peasy';
// import { refreshState } from '../components/CustomFunctions/refreshState';
import Axios from 'axios';
import { API, ICON } from '../../../constants';
import Participant from './Participant/Participant';
import Winner from './Winner/Winner';
import { IonInputNew } from '../../CustomComp/IonInputNew';

const Certificate: React.FC = () => {
    // const UserInfo = useStoreState<any>((state) => state.UserInfo);

    const [MyEvents, setMyEvents] = useState([]);
    const [UserInfo, setUserInfo] = useState([]);
    const [IsCertificateVisible, setIsCertificateVisible] = useState(false);
    const [IsPageRefreshed, setIsPageRefreshed] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')


    // console.log(UserInfo);
    const [showToast] = useIonToast()
    const ToggleCertificateLock = () => {
        console.log(email);
        console.log(password);
        Axios.post(API.TOGGLE_CERTIFICATE_LOCK, {
            email: email,
            password: password
        }, {
            headers: {
                'auth-token': localStorage.getItem('Identity')
            }
        }).then((res) => {
            (document.getElementById('CertificateLockModal') as HTMLIonModalElement).dismiss()
            if (res.data.success) {
                showToast('Certificate Status Updated Successfully', 2000)
            }
            else {
                showToast('Error in Updating Certificate Status', 4000)

            }
            // console.log(res)
            setIsPageRefreshed(!IsPageRefreshed)
        }).catch((err) => {
            showToast(err.response.data.message, 4000)
            console.log(err)
        })
    }
    useEffect(() => {
        console.log(UserInfo)
    },[UserInfo])

    useEffect(() => {
        Axios.get(API.IS_CERTIFICATES_LOCKED).then((res) => {
            // console.log(res);
            setIsCertificateVisible(res.data.isShowCertificate)
            if (res.data.isShowCertificate) {
                Axios.get(API.GET_USER_ENROLLMENTS, {
                    headers: {
                        'auth-token': localStorage.getItem('Identity'),
                    }
                }).then((e) => {
                    // console.log(e);
                    setMyEvents(e.data)
                }).catch((err) => {
                    console.log(err.response.data.message);
                    showToast(err.response.data.message, 2500)

                })
            }
        }).catch((errr) => {
            console.log(errr);
        })
    }, [IsPageRefreshed])

    const GetCertificates = () => {
        console.log(email)
        Axios.post(API.CERTIFICATE, {
            email: email
        }).then((e) =>{
            console.log(e)
            setUserInfo(e.data.user)
            setMyEvents(e.data.events)
        }).catch((err) => {
            console.log(err);
        })
    }
    // if (!UserInfo.email) {
    //     refreshState().then((e) => {
    //     });
    //     return (
    //         <IonLoading
    //             isOpen={true}
    //             message={'Sit back and Relax'}
    //         >
    //         </IonLoading>
    //     )
    // }


    return (
        <IonPage>

            <IonContent className="certificate">
                {(true) ?
                    <>
                    
                        {MyEvents.map((item: any, index) => {
                            return (
                                <IonCard key={index}>
                                    <IonCardContent >
                                        <IonRow className='ion-justify-content-between  ion-align-items-center'>
                                            <IonCardTitle>
                                                {item.eventName}
                                            </IonCardTitle>
                                            {(true) ?
                                                ((true) ?
                                                    //   @ts-ignore 
                                                    <Participant UserData={[item, UserInfo]} />
                                                    // //   @ts-ignore 
                                                    : null
                                                    // : <Winner UserData={[item, UserInfo]} />
                                                ) :
                                                (
                                                    <IonButton disabled={true}>
                                                        User Absent
                                                    </IonButton>
                                                )
                                            }
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            )
                        })}

                        </>
                    : null
                }


                {/* {(UserInfo.role == 'superAdmin') ? */}
                {(false) ?
                    <IonCard>
                        <IonCardHeader>
                            <IonRow className='flex ion-align-items-center ion-justify-content-between'  >
                                <IonCardTitle>Certificate Status</IonCardTitle>
                                {(IsCertificateVisible) ?
                                    <IonChip color={'success'}>
                                        Available
                                    </IonChip>
                                    :
                                    <IonChip color={'danger'}>
                                        Not Available
                                    </IonChip>

                                }
                            </IonRow>
                        </IonCardHeader>
                        <IonButton className='ion-margin' color={'danger'} id='OpenCertificateLockModal'>
                            {
                                (IsCertificateVisible) ? "Lock Certificates" : "Unlock Certificates"
                            }
                        </IonButton>
                        <IonModal id='CertificateLockModal' trigger='OpenCertificateLockModal'>
                            <IonToolbar>
                                <IonGrid>
                                    <IonRow className="ion-padding-horizontal">
                                        <IonTitle>
                                            Dialog header
                                        </IonTitle>
                                        <IonIcon size="large" onClick={() => { (document.getElementById('CertificateLockModal') as HTMLIonModalElement).dismiss() }} icon={ICON['closeIcon']}></IonIcon>
                                    </IonRow>
                                </IonGrid>
                            </IonToolbar>

                            <IonContent>
                                <IonItem>
                                    <IonInputNew
                                        title="Email"
                                        type='text'
                                        value={email}
                                        label='Email'
                                        minlength={5}
                                        ionIcon={'user'}
                                        onChange={setEmail}
                                        labelPlacement="floating"
                                        name={'name'}
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonInputNew
                                        title="Password"
                                        type='text'
                                        value={password}
                                        label='Password'
                                        minlength={5}
                                        ionIcon={'user'}
                                        onChange={setpassword}
                                        labelPlacement="floating"
                                        name={'name'}
                                    />
                                </IonItem>
                                <IonButton onClick={ToggleCertificateLock}>
                                    Submit
                                </IonButton>
                            </IonContent>
                        </IonModal>
                    </IonCard>

                    :
                    <IonCard className='ion-padding'>
                        <IonRow className='flex ion-align-items-center ion-justify-content-between'  >
                            <IonCardTitle>Certificate Status</IonCardTitle>
                            {(true) ?
                                <IonChip color={'success'}>
                                    Available
                                </IonChip>
                                :
                                <IonChip color={'danger'}>
                                    Not Available
                                </IonChip>

                            }
                        </IonRow>
                    </IonCard>
                }
                    <IonInputNew
                            title="Enter your Email"
                            type='text'
                            value={email}
                            label='Enter new name'
                            minlength={5}
                            onChange={setEmail}
                            labelPlacement="floating"
                        // error={error?.email}
                        />
                        <IonButton
                            className='item-text-wrap'
                            // onClick={() => { setAcknowledgement(!acknowledgement) }}
                            color='primary'
                            // disabled={!acknowledgement}
                            // expand='full'
                            // type='submit'
                            onClick={GetCertificates}
                            fill='solid'
                        >
                            Get certificate
                        </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Certificate;