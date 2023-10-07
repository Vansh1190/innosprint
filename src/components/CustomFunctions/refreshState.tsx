import Axios from "axios";
import { API } from "../../constants";
// import { useStoreActions, useStoreState } from "easy-peasy";
// import { API } from "../../../constants";

export const refreshState = () => {
  return new Promise((resolve, reject) => {
    // const UpdateUserInfo = useStoreActions<any>((state) => state.UpdateUserInfo);

    Axios.get(API.GET_SOCIETYINFO, {
      headers: {
        'auth-token': localStorage.getItem('Identity')
      }
    })
    .then((response) => {
      console.log(response.data);
      if(response.data.user == null){
         localStorage.removeItem('isSignedUp')
         localStorage.removeItem('Identity')
         localStorage.removeItem('stage')
         window.location.href = '/'
      }
      // UpdateUserInfo(response.data.user);
      console.log(response.data.user);
      resolve(response.data); // Resolve with the desired value or data if needed
    })
    .catch((error) => {
      reject(error); // Reject with the error object if the request fails
    });
  });
};
