import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode, useEffect, useState } from "react";
import { IonInputNew } from "../components/CustomComp/IonInputNew";
import { IonSelectNew } from "../components/CustomComp/IonSelectNew";
import { API, GENDER } from "../../constants";
import './Style/Login.css'
import './Style/HomePage.css'
// import IonProgress from "../components/CustomComp/IonProgress";
import { Link } from "react-router-dom";
import Axios from "axios";

// import { useStoreActions, useStoreState } from "easy-peasy";
// import { refreshState } from "../../components/CustomFunctions/refreshState";

export const HomePage: React.FC<any> = ({ onSubmit }) => {
  const router = useIonRouter();

  const [email, setEmail] = useState("dwdww@gndec.ac.in");
  const [password, setPassword] = useState("47859636");
  const [error, setError] = useState<any>({})
  useEffect(() => {
    // setEmail(localStorage.getItem('email') as string)
  }, [])

  const Login = () => {
    Axios.post(API.LOGIN, {
      email: email,
      password: password
    }).then((e) => {
      console.log(e);
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
          <div className='card-container'>

            <IonCard className="AuthCardLogin" >
              <IonCardHeader style={{ padding: '20px 15px' }}>
                <IonCardTitle class="ion-text-center HomepageTitle">Welcome to EMS</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <img className="LogoIMG" src="https://mail.gndec.ac.in/gne_logo.png" alt="" />
                  <IonButton
                    className="item-text-wrap AuthButtons"
                    style={{ height: "50px", maxWidth: "300px", margin: '55px auto 5px auto' }}
                    color='primary'
                    onClick={() => {
                        localStorage.removeItem('stage')
                        router.push('/login')
                    }}
                    shape="round"
                    expand='full'
                    type='button'
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
              </IonCardContent>
            </IonCard>
          </div>
        </IonCol>
      </IonContent >
    </IonPage>
  );
}

export default HomePage;
