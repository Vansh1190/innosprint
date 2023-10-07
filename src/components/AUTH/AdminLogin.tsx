import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode, useEffect, useState } from "react";
import { IonInputNew } from "../components/CustomComp/IonInputNew";
import { IonSelectNew } from "../components/CustomComp/IonSelectNew";
import { API, GENDER } from "../../constants";
import './Style/Login.css'
// import IonProgress from "../components/CustomComp/IonProgress";
import { Link } from "react-router-dom";
import Axios from "axios";
// import { useStoreActions, useStoreState } from "easy-peasy";
// import { refreshState } from "../../components/CustomFunctions/refreshState";

export const SocietyLogin: React.FC<any> = ({ isLoggesIn , updateUserRole}) => {
  const router = useIonRouter();

  const [email, setEmail] = useState("s@gndec.ac.in");
  const [password, setPassword] = useState("47859636");
  const [error, setError] = useState<any>({})
  useEffect(() => {
    // if(localStorage.getItem('Identity')){
    //   router.push('/home')
    // }
    
    // setEmail(localStorage.getItem('email') as string)
  }, [])

  const Login = () => {
    Axios.post(API.LOGIN, {
      email: email,
      password: password
    }).then((e) => {
      console.log(e);
      if(e.data.success){
        localStorage.setItem('Identity', e.data.authtoken);
        
        isLoggesIn(true);
        Axios.get(API.GET_SOCIETYINFO, {
            headers: {
                'auth-token' : e.data.authtoken
            }
        }).then((res) => {
            console.log(res);
            updateUserRole(res.data.user.role)
            localStorage.setItem('Identity2', res.data.user.role)
            router.push('/home')
        }).catch((er) => {
            console.log(er);
        })
    
        // router.push('/home')
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // if (localStorage.getItem('email')) {
  //   setEmail(localStorage.getItem('email'))
  // }
  return (
    <IonPage>
      <IonContent >
        <IonCol class="AuthPages AuthPagesLogin">

          {/* <IonProgress value='Login' /> */}
          <div className='card-container'>

            <IonCard className="AuthCardLogin" >
              <IonCardHeader style={{ padding: '20px 15px' }}>
                <IonCardTitle>Login for EMS</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Login()
                    // setEmail('')
                    // setPassword('')
                    // setError(errors);
                  }}
                >
                  <IonInputNew
                    title="Society Email"
                    ionIcon='email'
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={error?.email}
                  />
                  <IonInputNew
                    title="Password"
                    type="password"
                    ionIcon='password'
                    value={password}
                    onChange={setPassword}
                    error={error?.password}
                  />


                  <Link style={{ position:'absolute', right: '40px' }} to={'/Forget'}>
                    Forget Password ?
                  </Link>
                  <IonButton
                    className="item-text-wrap AuthButtons"
                    style={{ height: "50px", maxWidth: "300px", margin: '55px auto 5px auto' }}
                    color='primary'
                    shape="round"
                    expand='full'
                    type='submit'
                    fill='solid'
                    >
                    Login
                  </IonButton>
                  <IonButton
                    onClick={() => {
                      localStorage.removeItem('stage')
                      router.push('/signup')
                    }}
                    style={{ height: "50px", maxWidth: "300px", margin: '12px auto' }}
                    shape="round"
                    color="light"
                    expand="full"
                    fill='solid'
                    className="item-text-wrap AuthButtons"
                    >
                    New User! Sign up
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </div>
        </IonCol>
      </IonContent >
    </IonPage>
  );
}

export default SocietyLogin;
