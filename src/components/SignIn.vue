<template>
    <div id="signin-container">
        <nav-buttons>  </nav-buttons>
        <form id="signin-form" @submit.prevent="signIn">
            <fieldset >
                <legend>Sign In</legend>
                <ul>
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
                    </li>
                </ul>
            </fieldset>
        </form>
    </div>
</template>
<script>
import Nav from './Nav.vue'
import { catchP, then, writeError } from './services/Helpers.js'


export default {
    components:{
        navButtons:Nav,
    },
    methods:{

    },
    data(){
        return {
            username:null,
            password:null,
            isDisabled:false
        }
    }
}
</script>

<style>
    @import url('./styles/form.css');
</style>

