<template>
    <div id="user-form-container">
        <form @submit.prevent = "save">
            <fieldset >
                <legend>Blood Presure</legend>
                <ul>
                    <li>
                        <label for="systolic">Systolic:</label>
                        <input type="number" v-model="systolic" min="0" max="1000" id="systolic" required>
                    </li>
                    <li>
                        <label for="systolic">Diastolyc</label>
                        <input type="number" v-model="diastolyc" min="0" max="1000" id="systolic" required>
                    </li>
                    <li>
                        <input type="submit" value="Save" >
                    </li>
                </ul>
            </fieldset>
        </form>
        <div id="data-table">
            <h1>Hello otro div</h1>
        </div>
    </div>
</template>
<script>
import { writeBloodPressure } from "../services/Amplify/Api";
import { catchP, then } from "../services/Helpers";
import * as R from "ramda";
export default {
  methods: {
    save() {
      const vm = this;
      const data = Object.assign(
        {},
        {
          systolic: vm.systolic,
          diastolyc: vm.diastolyc
        }
      );

      const log = obj => {
        console.log(obj);
      };
      const saveData = R.compose(catchP(log), then(log), writeBloodPressure);
      saveData(data);
    }
  },

  data() {
    return {
      systolic: null,
      diastolyc: null
    };
  }
};
</script>

<style>
@import url("../styles/userArticle.css");
</style>

