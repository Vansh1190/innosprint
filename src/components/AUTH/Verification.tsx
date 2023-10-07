import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonLoading, IonPage, useIonRouter, useIonToast } from "@ionic/react";
import { ReactNode, useEffect, useState } from "react";
import { IonInputNew } from "../components/CustomComp/IonInputNew";
import { IonSelectNew } from "../components/CustomComp/IonSelectNew";
import { API, GENDER, REGEX } from "../../constants";
import './Style/Login.css'
// import IonProgress from "../components/CustomComp/IonProgress";
import Axios from 'axios';
import { contractOutline, settings } from "ionicons/icons";
// import { SignupData } from "../../interface";
import { PageLayout } from "../components/CustomComp/PageLayout";
// import { useStoreState } from 'easy-peasy'

export const Verification: React.FC<any> = () => {
    const router = useIonRouter();

    const [showToast] = useIonToast();
    const [email, setEmail] = useState("");
    const [OtpSent, setOtpSent] = useState(false);
    const [Otp, setOtp] = useState('');
    const [error, setError] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('')
    const [OpenAlert, setOpenAlert] = useState(false)
    const [loadingMessage, setloadingMessage] = useState('Sending otp...')

    // const UserIdentity = useStoreState<any>((state) => state.UserIdentity);

    useEffect(() => {
        // setEmail(UserIdentity.email)
    }, [])



    const onSubmit = (userData: any) => {
        if (!OtpSent) {
            setLoading(true)
            Axios.post(API.VERIFY_USER, { email: email }).then((e: any) => {
                console.log(e, "Otp sent")
                showToast(e.data.message, 900)
                setOtpSent(true);
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err);
                if (err.response.data.message == 'User already verified') {
                    setOpenAlert(true);
                    setAlertMessage('User already verified')
                    localStorage.setItem('stage', '3')
                }
                else {
                    showToast("user not found", 900)
                    setLoading(false)
                }
            })
        }
        else {
            VerifyOtp(Otp)
        }
    }




    const VerifyOtp = (data: any) => {
        setLoading(true);
        setloadingMessage('Verifying account, sit back & relax.');
        Axios.post(API.VERIFY_OTP, { otp: data }).then((e) => {
            showToast(`${e.data.message}, You can now login`, 900)
            localStorage.setItem('email', email);
            setLoading(false);
            localStorage.setItem('stage', '3')
            setTimeout(() => {
                router.push('/auth')
            }, 900);
        }).catch((err) => {
            setLoading(false);
            showToast(err.response.data.message, 900)
        })

    }

    useEffect(() => {
    }, [OtpSent])

    return (
        <IonPage>
            <IonLoading
                isOpen={loading}
                message={loadingMessage}
            />
            <IonAlert
                isOpen={OpenAlert}
                header="Error"
                message={AlertMessage}
                buttons={['Login']}
                onDidDismiss={() => { setOpenAlert(false); router.push('/auth') }}
            ></IonAlert>

            <IonContent>
                <IonCol class="AuthPages AuthPagesLogin">
                    {/* <IonProgress value='Verification' /> */}
                    <div className='card-container'>
                        <IonCard className="AuthCardLogin" >
                            <IonCardHeader style={{ padding: '20px 15px' }}>
                                <IonCardTitle>Verification for GNDEC Annual Sports Meet 2024</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <form id="FormE"
                                    method="post"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const errors = onSubmit({
                                            email: email.trim().toLowerCase(),
                                        });
                                        setError(errors);
                                    }}
                                >
                                    <IonInputNew
                                        title="Email"
                                        ionIcon='email'
                                        type="email"
                                        value={email}
                                        onChange={setEmail}
                                        error={error?.email}
                                    />

                                    {(OtpSent) ?
                                        <IonInputNew
                                            title="OTP"
                                            type="tel"
                                            ionIcon='otp'
                                            value={Otp}
                                            onChange={setOtp}
                                            error={error?.Otp}
                                        />
                                        : null
                                    }
                                    <IonButton
                                        className='item-text-wrap'
                                        color='primary'
                                        expand='full'
                                        type='submit'
                                        fill='solid'

                                    >
                                        {(OtpSent) ? 'Verify OTP' : 'Get OTP'}
                                    </IonButton>
                                </form>

                            </IonCardContent>
                        </IonCard>
                    </div>
                </IonCol>
            </IonContent>
        </IonPage>
    );
}

export default Verification;
