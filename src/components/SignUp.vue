<template>
    <div id="signup-container">
        <nav-buttons @show="goTo"></nav-buttons>
    <transition name="confirmation">
        <form id="code-confirmation"  @submit.prevent="confirm" role="form" v-show="!signingUp" > 
            <fieldset >
                <legend>Confirmation</legend>
                <ul>
                    <li class="read-only-container">
                        <i class="material-icons" v-show="error">
                            warning
                        </i>
                        <p class="message"> {{ confirmCodeMessage }} </p>
                    </li>
                    <li class="code-input-container">
                        <input id="code" type="number"  v-model="code" max="999999" pattern="\d{6}" title="Confirmation code is formed of  6 numbers" required>
                        <label for="code">Code</label>
                    </li>
                    <li>
                        <input id="confirm-button"  :class="classObject" type="submit" value="Confirm" :disabled="isDisabled">
                        <button id="resend-button" :class="classObject" @click.prevent="resendCode" title="Resent confirmation code" :disabled="isDisabled" >Resend</button>
                    </li>
                </ul>
            </fieldset>
        </form>
    </transition>
    <transition name="signup">
        <form id="signup-form" @submit.prevent="signUpM" role="form" v-show="signingUp">
            <fieldset>
                <legend>Sign Up</legend>
                <ul>
                <li class="read-only-container">
                    <i class="material-icons" v-show="error">
                        warning
                    </i>
                    <p class="message">{{ signUpMessage }}</p>
                </li>
                <li>
                    <input  id="nickname" type="text" v-model="nickname"  required>
                    <label   for="nickname">Nickname</label> 
                </li>
                <li>
                    <input id="email" type="email" v-model="email" required>
                    <label for="email">Email</label> 
                </li>
                <li>
                    <input id="password" :type="showPassword ? 'text' : 'password' " 
                      v-model="password" 
                      pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,}" 
                      title="Must contain  at least 1 number, 1 uppercase and 1 lowercase letter  and 1 special character" 
                      required >
                    <label for="password">Password</label>
                    <p class="invalid-password-message">At least 1 lowercase and  1 uppercase letter, 1 number and 1 special character</p>
                    <button id="eye" @click.prevent="show" class="material-icons">{{ icon }} </button>
                </li>
                <li>
                    <input  id="signUpButton" :class="classObject" type="submit" value="Sign In" :disabled="isDisabled" >
                </li>
                </ul>
            </fieldset>
        </form>
        </transition>
    </div>
</template>
<script>
import * as R from 'ramda'
import{ emitShow, showComponent } from './services/ShowComponent.js'
import{ then, catchP, writeError } from './services/Helpers.js'
import{ 
    senCodeAgain,
    signUp, 
    responseHandler,
    confirmCode,
    confirmResponseH,
    writeSuccesMessage
}from './services/SingUp.js'

import Nav from './Nav.vue'


export default {
    components:{
        navButtons:Nav,
    },


    data(){
        return {
            showPassword:false,
            nickname:null,
            email:null,
            password:null,
            signingUp:true,
            signUpMessage:"",
            confirmCodeMessage:"Please write the six-digit code you were sent.",
            error:false,
            sub:null,
            code:null,
            isDisabled:false
        }
    },


    methods:{
        signUpM(){
            const vm = this
            vm.signUpMessage = "Sending info"
            const email = this.email
            const nickname = this.nickname
            const password = this.password
            const goToConfirmation = responseHandler(vm,"isDisabled")
            const writesignUpError = writeError(vm,"signUpMessage","","isDisabled")
            const signUpC = R.compose( catchP(writesignUpError), then(goToConfirmation), signUp)

            signUpC(nickname,email,password,vm,"isDisabled")

        },


        confirm(){
            const vm = this
            const initialMessage = vm.confirmCodeMessage
            const code = vm.code
            const username = vm.sub
            const writeConfirmError = writeError(vm,"confirmCodeMessage",initialMessage,"isDisabled")
            const sendCode = confirmCode(username,vm,"isDisabled")
            const confirmResponseHandler = confirmResponseH(vm,"confirmCodeMessage",emitShow,showComponent)
            const sendConfirmation = R.compose(catchP(writeConfirmError),then(confirmResponseHandler),sendCode)
            sendConfirmation(code)
        },


        resendCode(){
            const vm = this
            const username = vm.sub
            const isDisabled = "isDisabled"
            const initialMessage = vm.confirmCodeMessage
            const writeErrorCode =writeError(vm,"confirmCodeMessage",initialMessage,isDisabled)
            const writeSuccesMessageC = writeSuccesMessage(vm,"confirmCodeMessage")
            const resenCode = R.compose(catchP(writeErrorCode),then(writeSuccesMessageC),senCodeAgain)
            resenCode(username,vm,isDisabled)
        },


        goTo(obj){
            const vm = this
            emitShow(vm,obj)
        },


        show(){
            this.showPassword = !this.showPassword
        }
    },


    computed:{
        
        classObject(){
            return this.isDisabled ? { disabled : true } : { disabled : false } 
        },

        icon(){
            return this.showPassword ? "visibility_off" : "visibility"
        }
    }
}
</script>

<style>
   @import url('./styles/form.css');
    @import url('./styles/disabled.css');
    @import url('./styles/formsChrome.css')

</style>
