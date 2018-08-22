<template>
    <div id="signin-container">
        <nav-buttons @show="goTo">  </nav-buttons>
        <form id="recoverPasswordForm" @submit.prevent="recoverPassword" v-if="isForgotten">
            <fieldset >
                <legend>Recover Password</legend>
                <ul>
                    <li>
                        <p class="message">
                            A code will be send to your email in order to recover 
                            your password
                        </p>
                    </li>
                    <li>
                        <input type="email" v-model="username" id="username" required>
                        <label for="username">Username</label>
                    </li>
                    <li>
                        <input type="submit"  value="Send code">
                    </li>
                </ul>
            </fieldset>
        </form>
        <form id="signin-form" @submit.prevent="signIn" v-else>
            <fieldset >
                <legend>Sign In</legend>
                <ul>
                    <li class="read-only-container">
                        <i class="material-icons" v-show="error">
                            error
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
import { signIn, succesfulHandler } from './services/SignIn.js'
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
</style>

