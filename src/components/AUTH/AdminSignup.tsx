import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonPage, useIonRouter } from "@ionic/react";
import { ReactNode, useEffect, useState } from "react";
import { IonInputNew } from "../components/CustomComp/IonInputNew";
import { IonSelectNew } from "../components/CustomComp/IonSelectNew";
import { API, GENDER } from "../../constants";
import './Style/Signup.css'
import Axios from "axios";
// import IonProgress from "../components/CustomComp/IonProgress";
// import '../Page.css'



export const SocietySignup: React.FC<any> = () => {
  const router = useIonRouter();
  const [fullName, setFullName] = useState("dwdwwdd");
  const [email, setEmail] = useState("s@gndec.ac.in");
  const [phoneNumber, setPhoneNumber] = useState("8585858585");
  const [password, setPassword] = useState("47859636");
  const [gender, setGender] = useState("male");
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [ConvenorName, setConvenorName] = useState("Sangam");
  const [error, setError] = useState<any>({})
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDataLoaded(true);
  }, [])
  // if (dataLoaded && localStorage.getItem('Identity')) {
  //   return <></>
  // }
  const CreateAccount = () => {
    Axios.post(API.SOCIETY_SIGNUP, {
      name: fullName,
      email: email,
      password: password,
      phone: phoneNumber,
      gender: gender,
      progressValue:'2',
      convenername:ConvenorName,
    }).then((e) => {
      console.log(e);
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    // hello this is Me
    <IonPage className="BackgroundSignUp">
      <IonContent className="BackgroundSignUp">
        {/* <IonCol className="BackgroundSignUp"> */}
        {/* <IonProgress value={'UserDetail'} /> */}
        <div className='card-container'>
          <IonCard className="AuthCardSignup AuthCard" >
            <IonCardHeader style={{ padding: '20px 15px' }}>
              <IonCardTitle>Signup for EMS</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form
                // method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  CreateAccount();
                  // setError(errors);
                }}
              >
                <IonInputNew
                  title="Society Name"
                  ionIcon='person'
                  value={fullName}
                  onChange={setFullName}
                  error={error?.fullName}
                />

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
                  ionIcon='lock'
                  type="password"
                  value={password}
                  onChange={setPassword}
                  error={error?.password}
                />
               
                <IonInputNew
                  title="Phone Number"
                  maxlength={10}
                  type='tel'
                  ionIcon='phone'
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  error={error?.phoneNumber}
                />

                <IonInputNew
                  title="Convenor Name"
                  type='text'
                  ionIcon='person'
                  value={ConvenorName}
                  onChange={setConvenorName}
                  error={error?.ConvenorName}
                />
                <IonItem lines="none">
                  <IonCheckbox style={{ maxWidth: '15%' }} color="danger" checked={acknowledgement} onIonChange={e => setAcknowledgement(!acknowledgement)} />
                  <p style={{ maxWidth: "85%", textAlign: "justify", margin: "20px auto 0 auto" }}>
                    I have verified my information and I acknowledge that I won't be able to change my information later on by myself.
                  </p>
                </IonItem>
                <IonButton
                  style={{ height: "50px", maxWidth: "300px", margin: '12px auto' }}
                  className='item-text-wrap AuthButtons'
                  onClick={() => { setAcknowledgement(!acknowledgement) }}
                  color='primary'
                  disabled={!acknowledgement}
                  expand='full'
                  shape="round"
                  type='submit'
                  fill='solid'
                >
                  Signup
                </IonButton>
                <IonButton
                  style={{ height: "50px", maxWidth: "300px", margin: '12px auto' }}
                  className='item-text-wrap AuthButtons'
                  onClick={() => {
                    localStorage.setItem('stage', '3');
                    router.push('/login')
                  }}
                  color='light'
                  expand='full'
                  shape="round"
                  type="button"
                  fill='solid'
                >
                  Login
                </IonButton>
                {/* <IonButton
                  onClick={() => {
                    localStorage.setItem('stage', '3');
                    router.push('/auth')
                  }}
                  fill="solid"
                  // buttonType="clear"
                  color="secondary"
                  // style={{height:"55px", borderRadius:'15px'}}
                  // expand=''
                  // fill='outline'
                  // shape="round"
                  // className="item-text-wrap"
                >
                  Click Here to Login
                </IonButton> */}
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent >
    </IonPage>
  );
}

export default SocietySignup;
