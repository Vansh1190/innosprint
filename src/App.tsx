import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useParams } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Test from './components/USER/Test';
import Certificate from './components/USER/Certificate/Certificate';
import Login from './components/AUTH/Login';
import Signup from './components/AUTH/Signup';
import Verification from './components/AUTH/Verification';
import { useState } from 'react';
import RegisterExam from './components/USER/RegisterExam';
// import Page from './components/AUTH/Page';

setupIonicReact();

const App: React.FC = () => {

  const [UserInfo, setUserInfo] = useState('')
  const [LoggedIn, setLoggedIn] = useState('')

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Page/>
            </Route>
            <Route path="/Test" exact={true}>
              <Test />
            </Route>
            <Route path="/RegisterExam" exact={true}>
              <RegisterExam />
            </Route>
            <Route path="/page/Certificate" exact={true}>
              <Certificate />
            </Route>
            <Route path="/login" exact={true}>
              <Login isLoggesIn = {setLoggedIn} UserInfo = {setUserInfo}/>
            </Route>
            <Route path="/signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/verify" exact={true}>
              <Verification />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
