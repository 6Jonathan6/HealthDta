import Auth from "@aws-amplify/auth";
import { AuthConfig } from "./Config.js";

Auth.configure( AuthConfig )

//SingUp
function callAuthsignUp(user) {
    return Auth.signUp(user)
}

function callAuthConfirmSignUp(username,code){
    return Auth.confirmSignUp(username,code)
}
function callAuthResendSignUp(username){
    return Auth.resendSignUp(username)
}


//SignIn
function callAuthSignIn(username,password){
    return Auth.signIn(username,password)
}

function callAuthForgotPassword(username){
    return Auth.forgotPassword(username);
}

function submitForgotPassword(username,code,newPassword){
    return Auth.forgotPasswordSubmit(username,code,newPassword)
}
export {
    callAuthsignUp,
    callAuthConfirmSignUp,
    callAuthResendSignUp,
    callAuthSignIn,
    callAuthForgotPassword,
    submitForgotPassword,

}
