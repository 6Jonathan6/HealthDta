<template>
    <div id="home-container">

        <div class="title-container">
            <h1>Health <br> Data</h1>
        </div>
        <div class="title-figure"></div>
        <nav class="menu-container">
            <button id="about" class="button" @click.prevent="showAbout">About</button>
            <button id="Signin" class="button" @click.prevent="showSignUp">Sign Up</button>
            <button id="Login" class="button" @click.prevent="showSignIn">Sign In</button>
        </nav>
        <!-- <h1 class="title">Health Data</h1> -->
    </div>
</template>
<script>
import * as R from "ramda";
import { showComponent, emitShow } from "./services/ShowComponent.js";
import { callAuthCurrentUser } from "./services/Amplify/Auth.js";
import { catchP, then } from "./services/Helpers.js";
export default {
  created() {
    const vm = this;
    const credentials = R.curry(function(vm, obj) {
      const showUser = {
        showMe: showComponent("User.vue"),
        username: obj.username
      };
      emitShow(vm, showUser);
    });
    const noCredentials = error => error;
    const checkForCredentials = R.compose(
      catchP(noCredentials),
      then(credentials(vm)),
      callAuthCurrentUser
    );
    checkForCredentials();
  },
  methods: {
    showAbout() {
      showComponent;
      const showAbout = showComponent("About.vue");
      const vm = this;
      emitShow(vm, { showMe: showAbout });
    },
    showSignUp() {
      const vm = this;
      const showSignUp = showComponent("SignUp.vue");
      emitShow(vm, { showMe: showSignUp });
    },
    showSignIn() {
      const vm = this;
      const showSignIn = showComponent("SignIn.vue");
      emitShow(vm, { showMe: showSignIn });
    }
  }
};
</script>

<style>
@import url("./styles/home.css");
</style>
