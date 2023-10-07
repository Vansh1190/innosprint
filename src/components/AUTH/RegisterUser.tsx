import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter, useIonToast } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import './RegisterUser.css'
import { IonInputNew } from './components/CustomComp/IonInputNew';
import { isEmpty } from "lodash";
import { useEffect, useState } from 'react';
import { IonSelectNew } from './components/CustomComp/IonSelectNew';
import { API, ARCHITECTURE, BRANCH, B_BUSINESS_ADMINISTRATION, B_COMPUTER_APPLICATION, COURSE, FIVE_YEARS, FOUR_YEARS, M_BUSINESS_ADMINISTRATION, M_COMPUTER_APPLICATION, REGEX, THREE_YEARS, TWO_YEARS } from '../constants';
import Axios  from 'axios';
import { Route, useParams } from 'react-router';
import Login2 from './Login2';

const RegisterUser: React.FC = () => {
  const [showToast] = useIonToast();
  const { id }:any = useParams();
  console.log(id)
  const [UserInfo, setUserInfo] = useState({});
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [StudentName, setStudentName] = useState('');
  const [ID, setID] = useState('');
  const [URN, setURN] = useState('');
  const [CRN, setCRN] = useState('');
  const [Branch, setBranch] = useState('');
  const [Course, setCourse] = useState('');
  const [error, setError] = useState<any>({});
  const [Year, setYear] = useState('');
  const [Phone, setPhone] = useState('');
  const [email, setemail] = useState('');

  const router = useIonRouter(); 


  // const [EventName, setEventName] = useState('');
  const validateUser = (data: any) => {
    const error: any = {}
    if (!REGEX.UNIVERSITY_NO.test(data.urn)) {
      error.urn = "Please enter a valid urn"
    }
    if (data.urn == '') {
      error.urn = 'Please enter a valid urn';
    }
    if (data.name == '') {
        error.name = 'Please enter a valid name';
    }
    if (data.email == '') {
      error.email = 'Please enter a valid email';
    }
    if (data.crn == '') {
        error.crn = 'Please enter a valid crn';
      }
      if (data.branch == '') {
        error.branch = 'Please choose a valid branch'
      }
      if (data.course == '') {
        error.course = 'Please choose a valid course'
      }
      if (data.year == '') {
        error.year = 'Please choose a valid year'
      }
      return error
    }
  // const [EventName, setEventName] = useState('');
  // const [EventName, setEventName] = useState('');
  // const [, setSocietyName] = useState('');
  const onSubmit = () => {
    // console.log(EventName,SocietyName)
    console.log(StudentName, Branch, Course, Year, email, URN, CRN)
    
    const FormData = {
      email: email,
      urn: URN,
      crn: CRN,
      name: StudentName,
      course: Course,
      branch: Branch,
      year: Year,
    }
    const errors = validateUser(FormData);
    // console.log(errors)
    if (!isEmpty(errors)) {
      console.log(errors);
      // setError('error')
      return errors;
    }
    console.log("Sdeo")
    Axios.post(API.REGISTER_USER+ID,{
      name: StudentName,
      email: email,
      phone: Phone,
      gender:'Male',
      progressValue: 80,
      course: Course,
      branch: Branch,
      urn:URN,
      year: 'Year65',
      crn: CRN
      
    }).then((e) => {
      console.log(e);
      showToast('Registered successfully', 5000)
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  useEffect(()=>{
      console.log('updated')
      setID(id);
  },[IsLoggedIn])
  
  const getBranchCourse = (SelectedCourse: any) => {
    switch (SelectedCourse) {
        case 'b_tech':
          case 'm_tech':
            return BRANCH;
            case 'b_arch':
              return ARCHITECTURE;
              case 'bca':
                return B_COMPUTER_APPLICATION
                case 'mca':
                  return M_COMPUTER_APPLICATION
                  case 'bba':
                    return B_BUSINESS_ADMINISTRATION
                  case 'mba':
            return M_BUSINESS_ADMINISTRATION
        default:
            return []
    }
}


const getYearCourse = (SelectedCourse: any) => {
    switch (SelectedCourse) {
        case 'b_tech':
            return FOUR_YEARS;
        case 'm_tech':
            return TWO_YEARS;
        case 'bca':
            return THREE_YEARS;
        case 'mca':
            return TWO_YEARS;
        case 'bba':
            return THREE_YEARS;
        case 'mba':
            return TWO_YEARS;
        case 'b_arch':
            return FIVE_YEARS;
        default:
            return [];
    }
}
if(!localStorage.getItem('Identity')){
  return(
      <Login2 UpdateisLoggedIn = {setIsLoggedIn}/> 
  )
}    

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonCard>
    {/* {console.log(error)} */}

    <form id='RegisterForm'
                                    // method="post"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const errors = onSubmit()
                                            setError(errors);
                                        }}
                                        >
          <IonInputNew
          
            title="Enter your Name"
            type='text'
            value={StudentName}
            label='Enter new name'
            minlength={5}
            onChange={setStudentName}
            labelPlacement="floating"
            error={error?.name}
          />
          <IonInputNew
          
            title="Enter URN"
            type='text'
            value={URN}
            label='Enter URN'
            minlength={5}
            onChange={setURN}
            labelPlacement="floating"
            error = {error?.urn}
            />
          <IonInputNew
          
            title="CRN"
            type='text'
            value={CRN}
            label='Enter new name'
            minlength={5}
            onChange={setCRN}
            labelPlacement="floating"
            error = {error?.crn}
            />
          <IonInputNew
          
            title="Enter your Email"
            type='text'
            value={email}
            label='Enter new name'
            minlength={5}
            onChange={setemail}
            labelPlacement="floating"
            error = {error?.email}
            />

          <IonInputNew
          
            title="Enter your Phone Number"
            type='text'
            value={Phone}
            label='Enter your Phone Number'
            minlength={5}
            onChange={setPhone}
            labelPlacement="floating"
            error = {error?.phone}
            />
          <IonSelectNew
            title="Course"
            ionIcon='degree'
            value={Course}
            onChange={setCourse}
            data={COURSE}
            // error={error?.course}
            error = {error?.course}
            />
          <IonSelectNew
            title="Branch"
            ionIcon='degree'
            value={Branch}
            onChange={setBranch}
            data={getBranchCourse(Course)}
            // error={error?.branch}
            error = {error?.branch}
            />
          <IonSelectNew
            title="Year"
            ionIcon='degree'
            value={Year}
            onChange={setYear}
            data={getYearCourse(Course)}
            // error={error?.year}
            error = {error?.year}
            />
          {/* <IonInputNew
          
            title="Event Name"
            type='text'
            value={EventName}
            label='Enter new name'
            minlength={5}
            onChange={setEventName}
            labelPlacement="floating"
          /> */}
          {/* <IonInputNew
            title="Date"
            type='text'
            value={(new Date).toLocaleDateString()}
            label='Enter new name'
            minlength={5}
            onChange={setEventName}
            labelPlacement="floating"
          /> */}
          {/* {console.log(} */}
          
          {/* <IonInputNew
                                        title="Announcement Link"
                                        type='text'
                                        value={NewAnnouncementLink}
                                        label='Enter new name'
                                        minlength={5}
                                        onChange={setNewAnnouncementLink}
                                        labelPlacement="floating"
                                    /> */}
                                     <IonButton
                                        className='item-text-wrap'
                                        // onClick={() => { setAcknowledgement(!acknowledgement) }}
                                        color='primary'
                                        // disabled={!acknowledgement}
                                        expand='full'
                                        type='submit'
                                        fill='solid'
                                        >
                                        Submit Details
                                    </IonButton>
                                    </form>
        </IonCard>
        {/* <IonButton onClick={} className="ion-margin">Submit</IonButton> */}
      </IonContent>

    </IonPage>
  );
};

export default RegisterUser;
