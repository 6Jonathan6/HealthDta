import * as R from 'ramda'
import { callAuthSignIn }  from './AmplifyS'
import { disabledButton } from './Helpers'
import { emitShow, showComponent } from './ShowComponent'
const signIn = R.curry( function(vm,isDisabled,username,password){
    disabledButton(vm,isDisabled)
    return callAuthSignIn(username,password)
})

const succesfulHandler = R.curry(function(vm,obj){
    console.log(obj)
    const showUser = showComponent('User.vue')
    emitShow(vm,{ showMe: showUser })
    
})

export {
    signIn,
    succesfulHandler
}
