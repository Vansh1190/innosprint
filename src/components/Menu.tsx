import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';
// import { useStoreState } from 'easy-peasy';
import { ICON, appPages } from '../constants';
import { useState } from 'react';

interface AppPage {
  url: string;
  icon: string;
  mdIcon: string;
  title: string;
  role: string;
}

const MenuPages: AppPage[] = appPages
// const appPages: AppPage[] = [
//   {
//     title: 'Inbox',
//     url: '/page/Inbox',
//     iosIcon: mailOutline,
//     mdIcon: mailSharp
//   },
//   {
//     title: 'Outbox',
//     url: '/page/Outbox',
//     iosIcon: paperPlaneOutline,
//     mdIcon: paperPlaneSharp
//   },
//   {
//     title: 'Favorites',
//     url: '/page/Favorites',
//     iosIcon: heartOutline,
//     mdIcon: heartSharp
//   },
//   {
//     title: 'Archived',
//     url: '/page/Archived',
//     iosIcon: archiveOutline,
//     mdIcon: archiveSharp
//   },
//   {
//     title: 'Trash',
//     url: '/page/Trash',
//     iosIcon: trashOutline,
//     mdIcon: trashSharp
//   },
//   {
//     title: 'Spam',
//     url: '/page/Spam',
//     iosIcon: warningOutline,
//     mdIcon: warningSharp
//   }
// ];


const Menu: React.FC = ({ UserData }: any) => {

  const location = useLocation();
  console.log(location.pathname)
  // const [UserInfo, setUserInfo]:any = useState({
  // });
  const [UserInfo, setUserInfo]:any = useState({
    name: 'vansh',
    email: 'vanshk605@gmail.com',
    role: 'user'
  });
  // const UserInfo = useStoreState<any>((state) => state.UserInfo)
  const denied_routes = ['/login', '/signup' ]
  return (
    <IonMenu contentId="main" type="overlay"  >
      <IonContent>
        <IonList id="allRoutes">
          <IonListHeader>{UserInfo.name}</IonListHeader>
          <IonNote>{UserInfo.email}</IonNote>

          <IonMenuToggle  autoHide={false}>
            
            {MenuPages.map((MenuItem, index) => {
              if(denied_routes.includes(location.pathname)){
                return (
                  <IonItem key={index}>

                  </IonItem>
                )
              }
              // console.log(MenuItem)
              if (UserInfo.role === 'superAdmin') {
                return (
                  <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                    <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                    <IonLabel>{MenuItem.title}</IonLabel>
                  </IonItem>
                );
              }
              else if(UserInfo.role === 'admin'){
                  if(MenuItem.role.includes('admin')){
                    return (
                      <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                      <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                      <IonLabel>{MenuItem.title}</IonLabel>
                    </IonItem>
                  )
                }
              }
              else {
                if (MenuItem.role.includes('user')) {
                  console.log(MenuItem, location)
                  return (
                    <IonItem key={index} className={location.pathname === MenuItem.url ? 'selected' : ''} routerLink={MenuItem.url} routerDirection='none' lines='full' >
                      <IonIcon icon={ICON[MenuItem.icon]} className='ion-padding-horizontal'></IonIcon>
                      <IonLabel>{MenuItem.title}</IonLabel>
                    </IonItem>
                  )
                }
              }
            })}
          </IonMenuToggle>
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
