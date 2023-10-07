// import Fuse from "fuse.js";
// import { difference } from "lodash";
import { peopleOutline, mailUnreadOutline, mailOutline, lockClosedOutline, callOutline, maleFemaleOutline, school, personAdd,checkmarkCircleOutline,logIn, personAddOutline, checkmarkCircle, mailSharp, personOutline, medalOutline, footballOutline, americanFootballOutline, americanFootball, clipboardOutline, golfOutline, closeCircleOutline, newspaperOutline, trophyOutline, megaphone, gridOutline, shirtOutline, navigateOutline, ribbonOutline, cloudDownloadOutline, qrCodeSharp, barChartOutline, gameControllerOutline, buildOutline, flagOutline, maleOutline, femaleOutline, addOutline } from "ionicons/icons";
import { Container } from "react-dom";

export const ICON:any = {
  person: peopleOutline,
  email: mailOutline,
  password: lockClosedOutline,
  phone: callOutline,
  otp: mailUnreadOutline,
  gender: maleFemaleOutline,
  degree:school,
  qrscanner: qrCodeSharp,
  gamepad: gameControllerOutline,
  newAdd:personAdd,
  verify: checkmarkCircle,
  login:logIn,
  shirt: shirtOutline,
  male:maleOutline,
  female:femaleOutline,
  grid: gridOutline,
  newspaper:newspaperOutline,
  speaker: megaphone,
  trophy: trophyOutline,
  user: personOutline,
  barchart:barChartOutline,
  medal: medalOutline,
  golf: golfOutline,
  add: addOutline,
  checkmark: checkmarkCircleOutline,
  football: americanFootball,
  build:buildOutline,  
  flag: flagOutline,
  ribbon: ribbonOutline,
  navigate: navigateOutline,
  register: clipboardOutline,
  closeIcon: closeCircleOutline,
  download: cloudDownloadOutline
}

const API_BASE_URL = 'https://sih-gndec-backend.onrender.com'

export const API = {
  LOGIN: `${API_BASE_URL}/api/login`,
  SIGNUP: `${API_BASE_URL}/api/useraccount`,
  SOCIETY_SIGNUP: `${API_BASE_URL}/api/societyaccount`,
  // ME: "/me",

  // ALL_USERS: "/users",
  VERIFY_USER: `${API_BASE_URL}/api/sendotp`,
  VERIFY_USER_NOW: `${API_BASE_URL}/api/mannually/userverify`,
  VERIFY_OTP: `${API_BASE_URL}/api/verify`,
  RECORD_USER_DETAILS: `${API_BASE_URL}/api/auth/academicinfo`,
  FORGET_PASSWORD: `${API_BASE_URL}/api/password/forgotpassword`,
  RESET_PASSWORD: `${API_BASE_URL}/api/password/resetpassword`,
  GET_USERINFO: `${API_BASE_URL}/api/getuser`,
  GET_SOCIETYINFO: `${API_BASE_URL}/api/societyuser`,
  GET_ALLWINNERS: `${API_BASE_URL}/api/view/resultall`,

  ENROLL_EVENTS: `${API_BASE_URL}/api/sports/addevent`,
  MAKE_AMDIN: `${API_BASE_URL}/api/update/makeadmin`,
  PARTICULAR_SPORTS_ENROLLMENTS: `${API_BASE_URL}/api/sportsUser/users`,
  GETALL_ENROLLMENTS: `${API_BASE_URL}/api/fetch/allstudents`,
  GET_USER_ENROLLMENTS: `${API_BASE_URL}/api/sports/eachstudentsports`,
  IS_CERTIFICATES_LOCKED: `${API_BASE_URL}/api/iscertificate`,
  TOGGLE_CERTIFICATE_LOCK: `${API_BASE_URL}/api/sendcertificate`,
  // MARK_UNMARKED_ABSENT: "/event/attendance/kill`,
  MARK_RESULT: `${API_BASE_URL}/api/result/update`,
  DELETE_USER_EVENT: `${API_BASE_URL}/api/update/deleteevent`,
  ADD_USER_EVENT: `${API_BASE_URL}/api/update/addevent`,
  TOGGLE_EVENT: `${API_BASE_URL}/api/enable/event`,
  DISABLE_ALL_EVENTS: `${API_BASE_URL}/api/enable/eventall`,
  
  
  
  
  
  CREATE_EVENT : `${API_BASE_URL}/api/event`,
  //  : `${API_BASE_URL}/api/event`,
  REGISTER_USER: `${API_BASE_URL}/api/addStudent/`,
  ALL_EVENTS: `${API_BASE_URL}/api/allEvents`,
  SOCIETY_EVENTS: `${API_BASE_URL}/api/societyallevents`,
  EVENT_DETAILS: `${API_BASE_URL}/api/usersByEvent/`,
  MARK_ATTENDANCE: `${API_BASE_URL}/api/update/`,
  CERTIFICATE: `${API_BASE_URL}/api/userAndEvents/`,
  // ALL_EVENTS: `${API_BASE_URL}/api/allEvents/`,
  // ADD_TEAM: "/event/team`
  // PROMOTE_EVENTS: "/event/promote`
  
  GET_SPORTS: `${API_BASE_URL}/api/sports/getallsports`,
  // TOGGLE_SPORT: "/sport/toggle`
  
  UPDATE_USER: `${API_BASE_URL}/api/update/updateuser`,
  DELETE_USER: `${API_BASE_URL}/api/update/deleteuser`,
  GET_ANNOUNCEMENTS: `${API_BASE_URL}/api/announcement`,
  SEND_NOTIFICATION: `https://onesignal.com/api/v1/notifications`,
  CREATE_ANNOUNCEMENTS: `${API_BASE_URL}/api/announcement`,
  DELETE_ANNOUNCEMENTS: `${API_BASE_URL}/api/deleteannouncement`,
}


export interface ConstantData {
  title: string;
  value: string;
}

export interface ConstantDataNumber {
  title: string;
  value: number;
}

export const GENDER: ConstantData[] = [
  { title: 'Female', value: 'Female' },
  { title: 'Male', value: 'Male' },
];

export const ATTENDANCE: ConstantData[] = [
  { title: 'Not Marked', value: 'not_marked' },
  { title: 'Present', value: 'present' },
  { title: 'Absent', value: 'absent' }
];

export const RESULT: ConstantDataNumber[] = [
  { title: 'None', value: 0 },
  { title: '1st', value: 1 },
  { title: '2nd', value: 2 },
  { title: '3rd', value: 3 },
]

export const USER_RESULT: ConstantDataNumber[] = [
  { title: 'Participant', value: 0 },
  { title: '1st', value: 1 },
  { title: '2nd', value: 2 },
  { title: '3rd', value: 3 },
]

export const ATTENDANCE_COLOR: any = {
  not_marked: "warning",
  present: "success",
  absent: "danger"
}

export const COURSE: ConstantData[] = [
  { title: 'B.Tech', value: 'b_tech' },
  { title: 'M.Tech', value: 'm_tech' },
  { title: 'B.Arch', value: 'b_arch' },
  { title: 'BCA', value: 'bca' },
  { title: 'MCA', value: 'mca' },
  { title: 'BBA', value: 'bba' },
  { title: 'MBA', value: 'mba' },
];

export const BRANCH: ConstantData[] = [
  { title: 'Computer Science', value: 'cse' },
  { title: 'Information Technology', value: 'it' },
  { title: 'Electrical Engineering', value: 'ee' },
  { title: 'Electronics Engineering', value: 'ece' },
  { title: 'Mechanical Engineering', value: 'me' },
  { title: 'Civil Engineering', value: 'ce' },
  { title: 'Production Engineering', value: 'pe' },
];

export const ARCHITECTURE: ConstantData[] = [
  { title: 'Bachelor of Architecture', value: 'b_arch' },
]

export const B_COMPUTER_APPLICATION: ConstantData[] = [
  { title: 'Bachelor of Computer Application', value: 'bca' },
];

export const M_COMPUTER_APPLICATION: ConstantData[] = [
  { title: 'Master of Computer Application', value: 'mca' },
];

export const B_BUSINESS_ADMINISTRATION: ConstantData[] = [
  { title: 'Bachelor of Business Administration', value: 'bba' },
];

export const M_BUSINESS_ADMINISTRATION: ConstantData[] = [
  { title: 'Master of Business Administration', value: 'mba' },
];

export const SPORT_TYPE = [
  { title: 'Field', value: 'field' },
  { title: 'Track', value: 'track' },
  { title: 'Tug of war', value: 'tugofwar' },
  { title: 'Relay', value: 'relay' }
];

export const TWO_YEARS: ConstantData[] = [
  { title: 'First', value: 'first' },
  { title: 'Second', value: 'second' },
];

export const THREE_YEARS: ConstantData[] = [
  { title: 'First', value: 'first' },
  { title: 'Second', value: 'second' },
  { title: 'Third', value: 'third' },
];

export const FOUR_YEARS: ConstantData[] = [
  { title: 'First', value: 'first' },
  { title: 'Second', value: 'second' },
  { title: 'Third', value: 'third' },
  { title: 'Fourth', value: 'fourth' },
];

export const appPages: any = [
  {
    title: 'Profile',
    url: '/page/Profile',
    icon: 'user',
    role: ['user', 'admin']
  },
  {
    title: 'My Registered Exams',
    url: '/page/Analytics',
    icon:'barchart',
    role: ['admin']
    
  },
  {
    title: 'Announcements',
    url: '/page/Announcements',
    icon:'speaker',
    role: ['user', 'admin']
  
  },
  {
    title: 'Trending Courses',
    url: '/page/TrendingCourses',
    role:['user', 'admin'],
    icon: 'grid',
  
  },
  {
    title: 'My Exams',
    url: '/test',
    role: ['user', 'admin'],
    icon: 'navigate'
 
  },
  {
    title: 'Leaderboard',
    url: '/page/Leaderboard',
    role: ['user', 'admin'],
    icon: 'trophy',
   
  },
  {
    title: 'Certificate',
    url: '/page/Certificate',
    role: ['user', 'admin'],
    icon: 'ribbon'
   
  },
  {
    title: 'All Users',
    url: '/page/AllUsers',
    role: ['admin', 'superAdmin'],
    icon: 'person'

  },
  {
    title: 'Enrolled Users',
    url: '/page/EnrolledUsers',
    role: ['admin', 'superAdmin'],
    icon: 'person'
    
  },
  {
    title: 'Attendence',
    url: '/page/Attendence',
    role: ['admin', 'superAdmin'],
    icon: 'register'
  },
  {
    title: 'Mark Result',
    url: '/page/UpdateResult',
    role: 'superAdmin',
    icon: 'medal'
  },
  {
    title: 'Export',
    url: '/page/Export',
    role: 'superAdmin',
    icon: 'download'

  },
  {
    title: 'Configure Events',
    url: '/page/ConfigureEvents',
    role: 'superAdmin',
    icon: 'grid'
  
  },
 
];


export const FIVE_YEARS: ConstantData[] = [
  { title: 'First', value: 'first' },
  { title: 'Second', value: 'second' },
  { title: 'Third', value: 'third' },
  { title: 'Fourth', value: 'fourth' },
  { title: 'Fifth', value: 'fifth' },
];


export const mapValue = (key: string, selectedValue: string) => {
  let data: (ConstantData | ConstantDataNumber)[];
  switch (key) {
    case 'GENDER':
      data = GENDER;
      break;
    case 'ATTENDANCE':
      data = ATTENDANCE;
      break;
    case 'COURSE':
      data = COURSE;
      break;
    case 'BRANCH':
      data = [
        ...BRANCH,
        ...ARCHITECTURE,
        ...B_COMPUTER_APPLICATION,
        ...M_COMPUTER_APPLICATION,
        ...B_BUSINESS_ADMINISTRATION,
        ...M_BUSINESS_ADMINISTRATION
      ];
      break;
    case 'SPORT_TYPE':
      data = SPORT_TYPE;
      break;
    case 'RESULT':
      data = RESULT;
      break;
    case 'USER_RESULT':
      data = USER_RESULT;
      break;
    case 'YEARS':
      data = FIVE_YEARS;
      break;
    default:
      data = [];
  }
  if (data.length) {
    const found: ConstantData | ConstantDataNumber | undefined = data
      .find((node: ConstantData | ConstantDataNumber) => node.value.toString() === selectedValue?.toString());
    return found ? found.title : '';
  }
  return '';
}

export const REGEX = {
  PHONE_NUMBER: /^[0-9]{10}$/,
  UNIVERSITY_NO: /^[0-9]{7}$/,
  PASSWORD: /^[\s\S]{8,25}$/,
  // EMAIL: /^[a-zA-Z0-9]+@gndec.ac.in$/i
}

export const mergeSearch = ({ search, data, options: newOptions, sort = () => { } }: { search: string; data: any, options: any, sort?: any }) => {
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    threshold: 0.3,
    ...newOptions
  };
  // const fuse = new Fuse(data, options);
  // const searchedItems = fuse.search(search).map((node) => node.item);
  // if (searchedItems.length) {
  //   const allOtherObjects = (difference(data, searchedItems));
  //   return [...searchedItems.map((node: any) => ({ ...node, isSearched: true })), ...(allOtherObjects.sort(sort))]
  // }
  return data.sort(sort);
}
