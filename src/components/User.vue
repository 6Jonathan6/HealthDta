<template>
    <div id="user-home-container">
        <aside>
            <h1>Health Data</h1>
        </aside>
        <div id="header-container">
            <header>
                <h1> Welcome <br> {{ user }} !</h1>
            </header>
        </div>
        <div id="buttons-container">
            <ul>
                <li>
                    <button id="blood-pressure" title="go to Blood pressure chart" @click="writeRecord"></button>
                    <p> <span> Blood <br> pressure</span></p>
                </li>
                <li>
                    <button id="blood-sugar" title="go to Blood sugar char"></button>
                    <p> <span> Blood <br> sugar</span></p>
                </li>
                <li>
                    <button id="weight" title="go to weight control chart"></button>
                    <p> <span> Weight</span></p>
                </li>
                <li>
                    <button id="signOut" title="sign outn" class="material-icons" >power_settings_new</button>
                    <p> <span>Sign Out</span></p>
                </li>
            </ul>
        </div> 

    </div>
    
</template>
<script>
import * as R from "ramda";
import { callAuthCurrentUser } from "./services/AmplifyS";
import { SendRecord } from "./services/AmplifyApi";
import { then, catchP, getProperty, setProperty } from "./services/Helpers";
export default {
  created() {
    const vm = this;
    const writeError = R.curry(obj => {
      vm.user = "Error!";
      console.log(obj);
    });
    const pathToNickname = ["attributes", "nickname"];
    const getNickname = getProperty(pathToNickname);
    const setNickname = setProperty(vm, "user");
    //composition on getNicknmae and setNickname
    const updateNickname = R.compose(setNickname, getNickname);
    const getAndUpdateNickname = R.compose(
      catchP(writeError),
      then(updateNickname),
      callAuthCurrentUser
    );

    getAndUpdateNickname();
  },

  methods: {
    writeRecord() {
      const data = {
        User: "Jony",
        typename: "BloodPressure",
        systolic: 80,
        diastolyc: 100
      };

      SendRecord(data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  data() {
    return {
      user: ""
    };
  }
};
</script>

<style>
@import url("./styles/user.css");
</style>
