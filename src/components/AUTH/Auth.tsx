import { IonAlert, IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonLoading, IonRow, useIonRouter, useIonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from './Login'
// import Login from "./Login";
import { PageLayout } from "../../components/CustomComp/PageLayout";
// import { Login, Signup } from "../components/Auth";
import Axios from "axios";
// import { IonCol, IonGrid, IonLoad  ing, IonRow, useIonRouter, useIonToast } from "@ionic/react";
// import { API, REGEX } from "../constants";
import { add, countBy, isEmpty } from "lodash";

// import { PageLayout } from './Page';
// import { SignupData } from "../interfaces";

import '../../components/Style/Custom.css'
import { SignupData } from "../../interface";
import { API, REGEX } from "../../constants";
import './Style/AuthPagesSignup.css'
import { helpOutline } from "ionicons/icons";
import { useStoreState, useStoreActions } from 'easy-peasy'

export const Auth: React.FC<any> = ({ isLogin }) => {
  const router = useIonRouter();
  // States 
  const [showToast] = useIonToast();
  const [AlertMessage, setAlertMessage] = useState('Email already in use');
  const [AlertOpen, setAlertOpen] = useState(false)
  const [loading, setLoading] = useState(false);



  const UpdateIdentity = useStoreActions<any>((state) => state.UpdateIdentity);
  const UpdateUserInfo = useStoreActions<any>((state) => state.UpdateUserInfo);

  const UserIdentity = useStoreState<any>((state) => state.UserIdentity)

  const handleButtonClick = () => {
    // console.log(todos);
    // console.log(UserIdentity);
  };
  

  const stage = localStorage.getItem('stage')

  switch (stage) {
    case '3':
      isLogin = true;
      break;
    case '4':
      isLogin = true;
      break;
  }
 

  const signup = (userData: SignupData) => {
    const errors = validateData(userData);
    ((isEmpty(errors))? null: console.log(errors))
    if (!isEmpty(errors)) {
      return errors;
    }
    setLoading(true);
    Axios.post(API.SIGNUP, userData)
      .then(result => {
        showToast(`Signup Success, but you will have to verify your account to enroll in events.`, 5000)
        localStorage.setItem('isSignedUp', 'true');
        localStorage.setItem('stage', '2');
        UpdateIdentity({ email: userData.email })
        setTimeout(() => {
          handleButtonClick();
          router.push('/verification')
        }, 800)
      })
      .catch((e) => {
        console.log(e);
        switch (e?.response?.data?.message) {
          case "DATA_MISSING":
            showToast("Incorrect password", 5000);
            break;
          case "email":
            // showToast("Email already in use!", 5000);
            setAlertMessage('Email already in use!')
            setAlertOpen(true);
            break;
          case 'phone':
            // showToast("Phone already in use!", 5000);
            setAlertMessage('Phone already in use!')
            setAlertOpen(true);
            break;
          case "URN_ALREADY_USED":
            showToast("University Roll Number already in use!", 5000);
            break;
          default:
            //  router.push('/verification','root', 'replace');
            showToast("Please fill your correct information and try again!", 3000)
        }
      })
      .finally(() => {
        setLoading(false);
        return {};
      });
  };


  // setTimeout(() =>{
  //   setProgressPending(arr[Count])
  // }, 2000)

  // useEffect(() => {  
  //  setCount((Count + 1)%5);
  // }, [ProgressPending])
  const login = (userData: any) => {
    setLoading(true);

    Axios.post(API.LOGIN, userData)
      .then(({ data }) => {
        if (data.success === true) {
          showToast('Login Success', 900)
          localStorage.setItem('Identity', data.authtoken);
          UpdateIdentity({ authToken: data.authtoken, email: userData.email })
          
          Axios.get(API.GET_USERINFO, {
            headers: {
              'auth-token': data.authtoken
            }
          }).then((e) => {
            localStorage.setItem('stage', '4');
            localStorage.removeItem('email');
            UpdateUserInfo(e.data.user);
            console.log(router.routeInfo)
            router.push('/academic', 'forward', 'pop')
          })

        }
        else if (data.message === 'Please verify your account') {
          showToast('Please verify your account first', 900)
          localStorage.setItem('stage', '2');
          localStorage.removeItem('Identity');
          setTimeout(() => {
            router.push('/verification')
          }, 900);
        }
        // storeUserData({ user: data.user, token: data.token })
        // if (data.user.isAdmin) {
        //   router.push("/admin", "none", "replace");
        // } else {
        //   router.push("/dashboard", "none", "replace");
        // }
        // if (!data.user.isVerified) {
        //   showToast("Now login to the app and follow further instructions", 5000)
        // }
      })
      .catch((e) => {
        console.log(e)
        switch (e?.response?.data?.message || e?.message) {
          case "Please try to login with the correct credentials":
            showToast("Please try to login with the correct credentials", 5000);
            break;
          case "User Not found":
            showToast("User not found, Sign up!", 5000);
            break;
          case "Network Error":
            alert("Please check your internet connection!");
            break;
          default:
            showToast("Please fill contact us form!", 5000)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateData = (userData: SignupData) => {
    const error: any = {};
    const { name, email, phone, password, gender } = userData;
    if (!name) {
      error.fullName = "Please enter your name"
    }
    if (!REGEX.EMAIL.test(email)) {
      error.email = "Please use GNDEC college Email"
    }
    if (!REGEX.PHONE_NUMBER.test(phone)) {
      error.phoneNumber = "Please enter valid Phone Number"
    }
    if (!REGEX.PASSWORD.test(password)) {
      error.password = "Password must be 8-25 characters long"
    }
    if (!gender) {
      error.gender = "Please select your Gender"
    }
    return error;
  }

  useEffect(() => {
    if (stage == '2') {
      router.push('/verification', 'forward')
    }
    if (stage == '4') {
      router.push('/academic')
    }
  }, [])

  return (
    <>
    {/* // <PageLayout> */}
      {/* <IonButton onClick={()=> {addTodo('Vansh')}}></IonButton>
          <IonButton onClick={()=> {console.log(todos)}}></IonButton> */}
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
        />
      <IonAlert
        isOpen={AlertOpen}
        header="Error"
        message={AlertMessage}
        // message="This is an alert!"
        buttons={['OK']}
        animated={true}
        onDidDismiss={() => setAlertOpen(false)}
        ></IonAlert>

      <IonGrid className="form-grid">
        <IonRow className="form-container ion-align-items-center ion-justify-content-center">

          {(isLogin) ?
            <IonCol class="AuthPages AuthPagesLogin">
              <Login onSubmit={login} loading={loading} />
            </IonCol>
            :
            <IonCol class="AuthPagesSignup">
              <Signup onSubmit={signup} loading={loading} />
            </IonCol>
          }
          <IonFab style={{ margin: '7vh 0' }} vertical="bottom" horizontal="end">
            <IonFabButton>
              <IonIcon icon={helpOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonRow>
      </IonGrid>
    {/* // </PageLayout> */}
          </>
  );
};
