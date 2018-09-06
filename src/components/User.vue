<template>
    <div id="user-home-container">
    <transition name= "toggle">   
    <div class="form-user-active" v-if="isArticleActive" >
      <article id="blood-pressure-form" class="user-article">
          <button id="exit" class="material-icons " @click.prevent="closeSection">close</button>
          <component :is="componentName" ></component>
      </article>
    </div>
    </transition>
        <aside>
            <h1>Health Data</h1>
        </aside>
        <div id="header-container">
            <header>
                <h1> Welcome <br> {{ user }} </h1>
            </header>
        </div>
        <div id="buttons-container">
            <ul>
                <li>
                    <button id="blood-pressure"  class="user-menu" title="go to Blood pressure chart" @click.prevent="goToArticle"></button>
                    <p class="flag"> <span> Blood <br> pressure</span></p>
                </li>
                <li>
                    <button id="blood-sugar" class="user-menu" title="go to Blood sugar char"></button>
                    <p class="flag"> <span> Blood <br> sugar</span></p>
                </li>
                <li>
                    <button id="weight" class="user-menu" title="go to weight control chart"></button>
                    <p class="flag"> <span> Weight</span></p>
                </li>
                <li>
                    <button id="signOut" class="user-menu material-icons" title="sign out"  @click.prevent="SignOut">power_settings_new</button>
                    <p class="flag"> <span>Sign Out</span></p>
                </li>
            </ul>
        </div> 

    </div>
    
</template>
<script>
import * as R from "ramda";
import { callAuthCurrentUser, callAuthSignOut } from "./services/Amplify/Auth";
import { SendRecord } from "./services/Amplify/Api";
import { then, catchP, getProperty, setProperty } from "./services/Helpers";

export default {
  created() {
    const vm = this;

    const errorHandler = R.curry(function(vm, obj) {
      vm.user = "Error!";
      console.log(obj);
    });

    //Get and set Nickname
    const pathToNickname = ["attributes", "nickname"];
    const getNickname = getProperty(pathToNickname);
    const setNickname = setProperty(vm, "user");

    //composition on getNicknmae and setNickname
    const getAndSetNickname = R.compose(setNickname, getNickname);

    //Get and set sub
    const pathToSub = ["username"];
    const getSub = getProperty(pathToSub);
    const setSub = setProperty(vm, "sub");

    //composition on getSub and setSub
    const getAndSetSub = R.tap(R.compose(setSub, getSub));

    const setData = R.compose(
      catchP(errorHandler(vm)),
      then(R.compose(getAndSetNickname, getAndSetSub)),
      callAuthCurrentUser
    );

    setData();
  },

  methods: {
    closeSection() {
      this.isArticleActive = false;
      this.articleName = null;
    },
    SignOut() {
      const reload = obj => {
        location.reload();
      };
      const signOut = R.compose(
        catchP(error => {
          console.log(error);
        }),
        then(reload),
        callAuthSignOut
      );
      signOut();
    },
    goToArticle(evt) {
      const vm = this;
      const buttonId = evt.target.id;
      switch (buttonId) {
        case "blood-pressure":
          const articleName = "BloodPressure.vue";
          vm.articleName = articleName;
          vm.isArticleActive = true;
          break;
      }
    }
  },

  computed: {
    componentName() {
      const vm = this;
      if (!vm.isArticleActive) {
        return;
      }
      return () => import(`./UserForms/${vm.articleName}`);
    }
  },

  data() {
    return {
      user: "",
      sub: "",
      systolic: 50,
      diastolyc: 100,
      articleName: "",
      isArticleActive: false
    };
  }
};
</script>

<style>
@import url("./styles/user.css");
</style>
