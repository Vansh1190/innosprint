import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonLoading, IonPage, useIonRouter, useIonToast } from "@ionic/react";
import { IonInputNew } from "../components/CustomComp/IonInputNew";
import { API, GENDER, REGEX } from "../../constants";
import './Style/Login.css'
import Axios from 'axios';
import { contractOutline } from "ionicons/icons";
// import { SignupData } from "../../interface";
import { isEmpty } from "lodash";
import { useState, useEffect } from "react";

export const ForgetPassword: React.FC<any> = () => {
    const router = useIonRouter();

    const [loading, setLoading] = useState(false)
    const [loadingMessage, setloadingMessage] = useState('Sending otp...')
    const [showToast] = useIonToast();
    const [email, setEmail] = useState("");
    const [OtpSent, setOtpSent] = useState(false);
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassWord, setConfirmPassWord] = useState('');
    const [OtpVerified, setOtpVerified] = useState(false);
    const [Otp, setOtp] = useState('');
    const [error, setError] = useState<any>({})


    const onSubmit = (userData: any) => {
        const error = validateData(userData);
        if (!isEmpty(error)) {
            console.log(error)
            setLoading(false);
            return error
        }
    
        if (!OtpSent) {
            setLoading(true);
            Axios.post(API.FORGET_PASSWORD, { email: userData.email }).then((e) => {
                console.log(e, "Otp sent")
                showToast(e.data.message, 900)
                setLoading(false)
                setOtpSent(true);
            }).catch((err) => {
                setLoading(false)
                showToast(err.response.data.message, 3000)
                console.log(err);
            })
        }
        else {
            setLoading(true)
            setloadingMessage('Verifying...')
            return VerifyOtp(userData)
        }
    }



    const VerifyOtp = (data: any) => {
        const error = validateData(data);

        if (!isEmpty(error)) {
            console.log(error)
            setLoading(false);
            return error
        }
        setLoading(true);
        setloadingMessage('Changing password, Sit back and relax.')
        Axios.post(API.RESET_PASSWORD, { otp: Otp, newPassword: NewPassword }).then((e) => {
            showToast('Password Changed successfully, you can now login using new password', 900)
            setOtpVerified(true);
            setOtpSent(false)
            setEmail('')
            setOtp('')
            setNewPassword('')
            setLoading(false);
            setTimeout(() => {
                router.push('/auth')
            }, 800);
        }).catch((err) => {
            // setOtpVerified(true);    
            setLoading(false);
            console.log(err);
            showToast(err.response.data.message, 900)
        })

    }

    useEffect(() => {

    }, [OtpSent, email, Otp, OtpVerified, error])


    const validateData = (userData:any) => {
        const error: any = {};
        const { email, newPassword } = userData;
        // console.log(name)
        if (!email) {
            error.email = "Please enter your Email"
        }
        // if (!REGEX.EMAIL.test(email)) {
        //     error.email = "Please use GNDEC college Email"
        // }
        // if (!REGEX.PHONE_NUMBER.test(phone)) {
        //   error.phoneNumber = "Please enter valid Phone Number"
        // }
        if (!REGEX.PASSWORD.test(newPassword)) {
            error.newPassword = "Password must be 8-25 characters long"
        }
        // if (!otp) {
        //   error.otp = "Please fill the otp"
        // }
        return error;
    }



    return (
        <IonPage>
            <IonLoading
                isOpen={loading}
                message={loadingMessage}
            >
            </IonLoading>
            <IonCol class="AuthPages AuthPagesLogin">
                {/* <IonProgress value='Verification' /> */}
                <div className='card-container'>
                    <IonCard className="AuthCardLogin" >
                        <IonCardHeader style={{ padding: '20px 15px' }}>
                            <IonCardTitle>Forget Password for GNDEC Annual Sports Meet 2024</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form id="FormE"
                                method="post"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const errors = onSubmit({
                                        email: email.trim().toLowerCase()
                                    });
                                    setError(errors);
                                }}
                            >
                            VERIFY EMAIL FOR CHANGE PASSWORD
                                <IonInputNew
                                    title="email"
                                    name='email'
                                    ionIcon='email'
                                    type="email"
                                    readonly={OtpSent}
                                    value={email}
                                    onChange={setEmail}
                                    error={error?.email}
                                />

                                {(OtpSent) ?
                                    <>
                                        <IonInputNew
                                            title="otp"
                                            name="otp"
                                            type="password"
                                            ionIcon='otp'
                                            required = {true}
                                            value={Otp}
                                            onChange={setOtp}
                                            error={error?.otp}
                                        />
                                        <IonInputNew
                                            title="New Password"
                                            name='newPassword'
                                            type="password"
                                            minlength = {8}
                                            required = {true}
                                            ionIcon='password'
                                            value={NewPassword}
                                            onChange={setNewPassword}
                                            error={error?.newPassword}
                                        />
                                    </>
                                    : null
                                }
                                <IonButton
                                    style={{ height: "50px", maxWidth: "300px", margin: '12px auto' }}
                                    className='item-text-wrap AuthButtons'
                                    color='primary'
                                    shape="round"
                                    expand='full'
                                    type='submit'
                                    fill='solid'
                                >

                                    {(OtpSent) ? 'Change Password' : 'Get OTP'}
                                </IonButton>
                            </form>

                        </IonCardContent>
                    </IonCard>
                </div>
            </IonCol>
        </IonPage>
    );
}

export default ForgetPassword;
