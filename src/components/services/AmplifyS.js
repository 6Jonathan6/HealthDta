import Auth from "@aws-amplify/auth";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.js";

Auth.configure(Config.Auth);
API.configure(Config.Api);

const writeBloodPressure = `mutation Write($User:String!,$typename:String!,$systolic:Int,$diastolyc:Int){
    writeBloodPressure(input: {
        User:$User
        typename:$typename
        systolic:$systolic
        diastolyc:$diastolyc
        Type:BloodPressure
    }){
        UserId
        Type
        Data {
          __typename
          ...on BloodPressure{
            systolic
          }
        }
    }
}`;

function SendRecord(data) {
  return API.graphql(graphqlOperation(writeBloodPressure, data));
}

//SingUp
function callAuthsignUp(user) {
  return Auth.signUp(user);
}

function callAuthConfirmSignUp(username, code) {
  return Auth.confirmSignUp(username, code);
}
function callAuthResendSignUp(username) {
  return Auth.resendSignUp(username);
}

//SignIn
function callAuthSignIn(username, password) {
  return Auth.signIn(username, password);
}

function callAuthForgotPassword(username) {
  return Auth.forgotPassword(username);
}

function submitForgotPassword(username, code, newPassword) {
  return Auth.forgotPasswordSubmit(username, code, newPassword);
}

function callAuthCurrentUser() {
  return Auth.currentAuthenticatedUser();
}

//User properties

export {
  callAuthsignUp,
  callAuthConfirmSignUp,
  callAuthResendSignUp,
  callAuthSignIn,
  callAuthForgotPassword,
  submitForgotPassword,
  callAuthCurrentUser,
  SendRecord
};
