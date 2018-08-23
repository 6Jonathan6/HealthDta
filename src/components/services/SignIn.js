import * as R from 'ramda'
import { callAuthSignIn, callAuthForgotPassword }  from './AmplifyS'
import { disabledButton, enabledButton } from './Helpers'
import { emitShow, showComponent } from './ShowComponent'
const signIn = R.curry( function(vm,isDisabled,username,password){
    disabledButton(vm,isDisabled)
    return callAuthSignIn(username,password)
})

const succesfulHandler = R.curry(function(vm){
    const showUser = showComponent('User.vue')
    emitShow(vm,{ showMe: showUser })
})


const sendRecoverCode = R.curry(function(vm,isDisabled,username){
    disabledButton(vm,isDisabled)
    setTimeout(()=> enabledButton(vm,isDisabled),1000)
    return callAuthForgotPassword(username)
})

const succesfulCodeHandler = R.curry(function(vm,prop,obj){
    console.log(obj)
    vm[prop] = true
})
export {
    signIn,
    succesfulHandler,
    sendRecoverCode,
    succesfulCodeHandler
}
