<template>
    <div id="signin-container">
        <nav-buttons @show="goTo">  </nav-buttons>


        <transition name="recovery">
        <form id="recoverPasswordForm" @submit.prevent="recoverPassword" v-if="isForgotten">
            <fieldset >
                <legend>Forgot Password </legend>
                <ul>
                    <li>
                        <i class="material-icons" v-show="error">warning</i>
                       <p class="message">{{ errorRecoverCode}}</p>
                    </li>


                    <!-- New password and write conformation code form -->

                    <li v-if="codeWasSent">
                        <input type="number" v-model="code" id="code" required>
                        <label for="code">Code</label>
                    </li>
                    <li v-if="codeWasSent">
                        <input id="password" :type="showPassword ? 'text' : 'password' " 
                        v-model="password" 
                        pattern="(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,}" 
                        title="Must contain  at least 1 number, 1 uppercase and 1 lowercase letter  and 1 special character" 
                        required >
                        <label for="password"> New Password</label>
                        <p class="invalid-password-message">At least 1 lowercase and  1 uppercase letter, 1 number and 1 special character</p>
                        <button id="eye" @click.prevent="show" class="material-icons">{{ icon }} </button>
                    </li>
                    <li v-if="codeWasSent">
                        <button  class="generic-buttons" @click.prevent="submitNewPassword"  :disabled="isDisabled"> Submit </button>
                    </li>


                    <!-- Send code to username form -->

                    <li v-if="!codeWasSent">
                        <p class="message">
                            <i class="material-icons"> info </i>
                            A code will be send to your email in order to recover 
                            your password
                        </p>
                    </li>
                    <li v-if="!codeWasSent">
                        <input type="email" v-model="username" id="username" required>
                        <label for="username">Username</label>
                    </li>
                    <li v-if="!codeWasSent">
                        <input  :class="classObject" type="submit"  value="Send code" :disabled="isDisabled">
                        <button id="back" class="generic-buttons" @click.prevent="backToSignIn" >Back</button>
                    </li>
                </ul>
            </fieldset>
        </form>
        </transition>


        <!-- Sign In form -->
        <form id="signin-form" @submit.prevent="signIn" v-if="!isForgotten">
            <fieldset >
                <legend>Sign In</legend>
                <ul>
                    <li class="read-only-container">
                        <i class="material-icons" v-show="error">
                            warning
                        </i>
                        <span>{{ signInMessage }}</span>
                    </li>
                    <li>
                        <input id="signin-email-input" type="email" v-model="username" required>
                        <label for="signin-email-input">Email</label>
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
                        <input :class="classObject" type="submit" value="Sign In" :disabled="isDisabled">
                        <button id="forgotButton" :class="classObject" @click.prevent="forgotPassword" > Forgotten password </button>
                    </li>
                </ul>
            </fieldset>
        </form>
    </div>

</template>


<script>
import * as R from 'ramda'
import Nav from './Nav.vue'

import { 
    signIn, 
    succesfulHandler, 
    sendRecoverCode, 
    succesfulCodeHandler,
    createNewPassword,
    newPasswordHandler, 

} from './services/SignIn.js'
        
import { catchP, then, writeError } from './services/Helpers.js'
import { emitShow } from './services/ShowComponent';


export default {
    components:{
        navButtons:Nav,
    },
    methods:{
        signIn(){
            this.signInMessage = "Sending info..."
            const vm = this
            const prop = "signInMessage"
            const isDisabled = "isDisabled"
            const initialMessage = ""
            const username = vm.username
            const password = vm.password
            const writeSignInError = writeError(vm,prop,initialMessage,isDisabled)
            const SignIn =  signIn(vm,isDisabled)
            const succesfulSignIn = succesfulHandler(vm)
            const sendSignIn = R.compose( catchP(writeSignInError),then(succesfulSignIn), SignIn)
            sendSignIn(username,password)


        },
        show(){
            this.showPassword = !this.showPassword
        },
        goTo(obj){
            const vm = this
            emitShow(vm,obj)
        },
        forgotPassword(){
            this.isForgotten = true;
        },
        recoverPassword(){
            const vm = this
            const prop = "codeWasSent"
            const isDisabled = "isDisabled"
            const username = vm.username
            const writeErrorC = writeError(vm,"errorRecoverCode","",isDisabled)
            const succesfulHandler = succesfulCodeHandler(vm,prop)
            const sendCode = R.compose(catchP(writeErrorC),then(succesfulHandler),sendRecoverCode)
            sendCode(vm,isDisabled,username)
        },
        submitNewPassword(){
            console.log('start')
            const vm = this
            const isDisabled = "isDisabled"
            const newPasswordHandlerC = newPasswordHandler(vm)
            const writeErrorC = writeError(vm,"errorRecoverCode","",isDisabled)
            const newPassword = R.compose(catchP(writeErrorC),then(newPasswordHandlerC),createNewPassword)
            newPassword(vm,isDisabled)
        },

        backToSignIn(){
            this.isForgotten = false;
        }


    },
    data(){
        return {
            username:null,
            password:null,
            isDisabled:false,
            showPassword:false,
            signInMessage: "",
            error:false,
            isForgotten:false,
            errorRecoverCode:"",
            codeWasSent: false,
            code:null,
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
    @import url('./styles/formsChrome.css');
    #eye{
        margin-left: 2rem;
    }
    .recovery-enter-active{
        transition: all 0.5s ease-in;
    }
    .recovery-enter{
        opacity: 0;
    }
</style>

