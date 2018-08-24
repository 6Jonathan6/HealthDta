import * as R from 'ramda'
import { callAuthSignIn, callAuthForgotPassword, submitForgotPassword }  from './AmplifyS'
import { disabledButton, enabledButton } from './Helpers'
import { emitShow, showComponent } from './ShowComponent'


const signIn = R.curry( function(vm,isDisabled,username,password){
    disabledButton(vm,isDisabled)
    const uname =  username.toLowerCase()
    return callAuthSignIn(uname,password)
})

const succesfulHandler = R.curry(function(vm, obj){
    const showUser = showComponent('User.vue')
    emitShow(vm,
    { 
        showMe: showUser,
        user:obj.username
    })
})


const sendRecoverCode = R.curry(function(vm,isDisabled,username){
    disabledButton(vm,isDisabled)
    setTimeout(()=> enabledButton(vm,isDisabled),1000)
    return callAuthForgotPassword(username)
})

const succesfulCodeHandler = R.curry(function(vm,prop,obj){
    vm[prop] = true
})

const createNewPassword = R.curry(function(vm,isDisabled){
    disabledButton(vm,isDisabled)
    return submitForgotPassword(vm.username,vm.code,vm.password)
})

const newPasswordHandler = R.curry(function(vm,response){
    console.log(response)
    vm.codeWasSent = false
    vm.isForgotten = false
    vm.isDisabled = false
})

export {
    signIn,
    succesfulHandler,
    sendRecoverCode,
    succesfulCodeHandler,
    createNewPassword,
    newPasswordHandler,
}
