import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonCol, IonContent, IonGrid, IonItem, IonLoading, IonPage, IonToast, useIonRouter, useIonToast } from "@ionic/react";
import { ReactNode, useEffect, useState } from "react";
import { IonInputNew } from "../../components/CustomComp/IonInputNew";
import { IonSelectNew } from "../../components/CustomComp/IonSelectNew";
import { API, ARCHITECTURE, BRANCH, B_BUSINESS_ADMINISTRATION, B_COMPUTER_APPLICATION, COURSE, FIVE_YEARS, FOUR_YEARS, M_BUSINESS_ADMINISTRATION, M_COMPUTER_APPLICATION, THREE_YEARS, TWO_YEARS, REGEX } from "../../constants";
import './Style/Signup.css'
import IonProgress from "../../components/CustomComp/IonProgress";
import { isEmpty } from "lodash";
import Axios from "axios";
import { globe, trendingDown } from "ionicons/icons";
import { PageLayout } from "../../components/CustomComp/PageLayout";
import { useStoreActions, useStoreState } from "easy-peasy";

export const Signup: React.FC<any> = () => {
    const [showToast] = useIonToast();
    const router = useIonRouter();

    const [course, setCourse] = useState("");
    const [IsOpen, setIsOpen] = useState(false);
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const [AlertMessage, setAlertMessage] = useState("");
    const [urn, setUrn] = useState("");
    const [UserData, setUserData]:any = useState({});
    const [UserDetailsPending, setUserDataPending] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acknowledgement, setAcknowledgement] = useState(false);
    const [error, setError] = useState<any>({});

    // const UserID = '64ca032f60b1b1856cae0b5f';
    const UserID = localStorage.getItem('Identity');
    const UserIdentity = useStoreState<any>((state) => state.UserIdentity)
    const UpdateUserInfo = useStoreActions<any>((state) => state.UpdateUserInfo)
    const UserInfo = useStoreState<any>((state) => state.UserInfo)

    const validateUser = (data: any) => {
        const error: any = {}
        if (!REGEX.UNIVERSITY_NO.test(data.urn)) {
            error.urn = "Please enter a valid urn"
        }
        if (data.urn == '') {
            error.urn = 'Please enter a valid urn';
        }
        if (data.branch == '') {
            error.branch = 'Please choose a valid branch'
        }
        if (data.course == '') {
            error.course = 'Please choose a valid course'
        }
        if (data.year == '') {
            error.year = 'Please choose a valid years'
        }
        return error
    }

    const onSubmit = (course: any, branch: any, year: any) => {
        const FormData = {
            email: 'emial',
            urn: urn,
            course: course,
            branch: branch,
            year: year,
        }
        const errors = validateUser(FormData);
        if (!isEmpty(errors)) {
            console.log(errors);
            return errors;
        }
        setLoading(true)
        Axios.post(API.RECORD_USER_DETAILS+`/${UserData.user._id}`, FormData).then((e) => {
            setLoading(false);
            localStorage.removeItem('stage')
            showToast('Academic details recorded.', 900)
            router.push('/dashboard', 'none', 'replace');
        }).catch((err) => {
            console.log(err)
            setLoading(false);
            setIsOpen(true)
            setAlertMessage(err.response.data.message)
            // showToast(err.response.data.message + " Please contact Sports Department", 3000)
        })
    }


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

    useEffect(() => { }, [course, IsOpen, UserData])

    useEffect(() => {
        setLoading(true)
        Axios.get(API.GET_USERINFO, {
            headers: {
                'auth-token': UserIdentity.authToken
            }
        }).then((response) => {
            setUserData(response.data);
            UpdateUserInfo(response.data.user);
            setLoading(false)
            if(response.data.user.hasOwnProperty('academicInfo')){
                console.log(response.data.user.hasOwnProperty('academicInfo'))
                router.push('/dashboard','forward','pop')
            }
        })
    },[])
   
    return (
        <>
        {/* {(UserData) ?  <UserInfoMenu/>: null } */}
        
            {/* <UserInfoMenu/> */}
            <IonLoading isOpen = {loading}>

            </IonLoading>
            {(!UserDetailsPending) ? 
            <IonPage className="BackgroundSignUp" id="main-content">
                <IonContent>

                <IonAlert
                    isOpen={IsOpen}
                    header="Error"
                    message= {AlertMessage}
                    // message="This is an alert!"
                    buttons={['OK']}
                    animated={true}
                    onDidDismiss={() => setIsOpen(false)}
                    ></IonAlert>
                <IonLoading
                    isOpen={loading}
                    message={'Hold on... Enjoy the wheater meanwhile!'}
                    />
                {/* <PageLayout className='BackgroundSignUp'> */}
                    <IonProgress value={'AcademicDetail'} />
                    <div className='card-container'>
                        <IonCard className="AuthCardSignup AuthCard" >
                            <IonCardHeader style={{ padding: '20px 15px' }}>
                                <IonCardTitle>Welcome {UserInfo.name}, <br/> <small>Fill your academic details.</small></IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <form
                                    // method="post"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const errors = onSubmit(
                                            course,
                                            branch,
                                            year
                                            )
                                            setError(errors);
                                        }}
                                        >
                                    <IonInputNew
                                        title="URN"
                                        ionIcon='degree'
                                        value={urn}
                                        onChange={setUrn}
                                        error={error?.urn}
                                        />
                                    <IonSelectNew
                                        title="Course"
                                        ionIcon='degree'
                                        value={course}
                                        onChange={setCourse}
                                        data={COURSE}
                                        error={error?.course}
                                        />
                                    <IonSelectNew
                                        title="Branch"
                                        ionIcon='degree'
                                        value={branch}
                                        onChange={setBranch}
                                        data={getBranchCourse(course)}
                                        error={error?.branch}
                                        />
                                    <IonSelectNew
                                        title="Year"
                                        ionIcon='degree'
                                        value={year}
                                        onChange={setYear}
                                        data={getYearCourse(course)}
                                        error={error?.year}
                                        />

                                    <IonItem lines="none">
                                        <IonCheckbox style={{ maxWidth: '15%' }} color="danger" checked={acknowledgement} onIonChange={e => setAcknowledgement(!acknowledgement)} />
                                        <p style={{ maxWidth: "85%", textAlign: "justify", margin: "20px auto 0 auto" }}>
                                            I have verified my information and I acknowledge that I won't be able to change my information later on by myself.
                                        </p>
                                    </IonItem>
                                    <IonButton
                                        className='item-text-wrap'
                                        onClick={() => { setAcknowledgement(!acknowledgement) }}
                                        color='primary'
                                        disabled={!acknowledgement}
                                        expand='full'
                                        type='submit'
                                        fill='solid'
                                        >
                                        Submit Details
                                    </IonButton>
                                    <IonButton
                                        onClick={() => {
                                            localStorage.setItem('stage', '3');
                                            router.push('/auth')
                                            
                                        }}
                                        buttonType="clear"
                                        color="secondary"
                                        expand="block"
                                        fill='outline'
                                        className="item-text-wrap"
                                        disabled={loading}
                                        >
                                        Click Here to Login
                                    </IonButton>
                                </form>
                            </IonCardContent>
                        </IonCard>
                    </div>
                {/* </PageLayout> */}
            </IonContent>
            </IonPage> 
            
            : null
            }
        </>
        );
    }
    
    export default Signup;
    