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
  } from '@ionic/react';
  
  import { useLocation } from 'react-router-dom';
  import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
  import './Menu.css';
  import { useStoreState } from 'easy-peasy';
  
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }
  
  const appPages: AppPage[] = [
    {
      title: 'Inbox',
      url: '/page/Inbox',
      iosIcon: mailOutline,
      mdIcon: mailSharp
    },
    {
      title: 'Outbox',
      url: '/page/Outbox',
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp
    },
    {
      title: 'Favorites',
      url: '/page/Favorites',
      iosIcon: heartOutline,
      mdIcon: heartSharp
    },
    {
      title: 'Archived',
      url: '/page/Archived',
      iosIcon: archiveOutline,
      mdIcon: archiveSharp
    },
    {
      title: 'Trash',
      url: '/page/Trash',
      iosIcon: trashOutline,
      mdIcon: trashSharp
    },
    {
      title: 'Spam',
      url: '/page/Spam',
      iosIcon: warningOutline,
      mdIcon: warningSharp
    }
  ];
  
  const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  const UserInfoMenu: React.FC<any> = () => {
    const location = useLocation();

    const UserIdentity = useStoreState<any>((state) => state.UserIdentity)
    const UserInfo = useStoreState<any>((state) => state.UserInfo)

    return (  
      <IonMenu contentId="main-content" type="overlay" >
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>{UserInfo.name}</IonListHeader>
            <IonNote>{UserInfo.email}</IonNote>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default UserInfoMenu;
  