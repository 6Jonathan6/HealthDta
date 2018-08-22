import * as R from 'ramda'

import { 
    createUser, 
    disabledButton, 
    enabledButton, 

}from './Helpers.js'

import {
  callAuthsignUp,
  callAuthConfirmSignUp,
  callAuthResendSignUp

} from "./AmplifyS.js";


//go  from signUp to confirmation code from
const signUp = R.compose(callAuthsignUp,createUser)


// handler to succesful signUp
const responseHandler = R.curry (function(vm,isDisabled,obj){
    vm.password = ''
    vm.sub = obj.userSub
    vm.signingUp = false
    setTimeout(()=> enabledButton(vm,isDisabled),0)
})


//confirmation code
const confirmCode = R.curry(function (username, vm, isDisabled,code){
    disabledButton(vm, isDisabled)
    return callAuthConfirmSignUp(username,code)
})


//response handler for succesful  confimation code 
const confirmResponseH = R.curry(function(vm,prop,emitShow,showComponent,response){
    vm[prop] = response
    const showLogin = showComponent('SignIn.vue')
    emitShow(vm,{showMe:showLogin})
})


const senCodeAgain = function(username,vm,isDisabled){
    disabledButton(vm,isDisabled)
    setTimeout( () => enabledButton(vm,isDisabled), 5000);
    return callAuthResendSignUp(username)
}

const writeSuccesMessage = R.curry(function(vm,prop,obj){
    vm[prop] =  "Code was sent to " + obj.CodeDeliveryDetails.Destination
})

export {
    signUp,
    responseHandler,
    enabledButton,
    confirmCode,
    confirmResponseH,
    senCodeAgain,
    writeSuccesMessage
}
