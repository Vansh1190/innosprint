import { REGEX } from "../../constants";
import { SignupData } from "../../interface";

export const ValidateData = (userData: SignupData) => {
    const error: any = {};
    console.log(userData, 'validatEdata');
    const { name, email, phone, password, gender } = userData;
    if (!name) {
        error.fullName = "Please enter your name"
    }
    if (!REGEX.EMAIL.test(email)) {
        error.email = "Please use GNDEC college Email"
    }
    if (!REGEX.PHONE_NUMBER.test(phone)) {
        error.phoneNumber = "Please enter valid Phone Number"
    }
    if (!REGEX.PASSWORD.test(password)) {
        error.password = "Password must be 8-25 characters long"
    }
    if (!gender) {
        error.gender = "Please select your Gender"
    }
    return error;
}