<template>
    <div id="user-form-container">
        <form @submit.prevent = "save">
            <fieldset >
                <legend>Blood Pressure</legend>
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
                        <input id="submit-button" :class="disabledButton" type="submit" value="Save"  :disabled="isDisabled">
                    </li>
                    <li>
                        <p>  
                            <i class="material-icons" v-show="error">warning</i>
                             {{ message }}
                        </p>
                    </li>
                </ul>
            </fieldset>
        </form>
        <div id="data-table">
          <table>
            <caption>Blood Pressure Table </caption>
            <thead>
              <tr>
                <th scope="column">Date</th>
                <th scope="column">Time</th>
                <th scope="column" title="Systolic Blood Pressure"><abbr>SBP</abbr></th>
                <th scope="column"> <abbr title="Diastolyc Blood Pressure">DBP</abbr> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index ) in parsedDateTime" :key="index">
                  <td class="time-cell"> <p> {{ item.CreatedAt.toLocaleDateString() }} </p> </td>
                  <td class="time-cell"> <p> {{ item.CreatedAt.toLocaleTimeString() }} </p> </td>
                  <td>{{ item.Data.systolic}}</td>
                  <td>{{ item.Data.diastolyc }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Units mmHg </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div id="chart-container">
        <button @click.prevent="showChart">Update chart</button>
          <canvas  id="chart" ref="canvas" width="400" height="400"></canvas>
        </div>
    </div>
</template>
<script>
import { writeBloodPressure, getRecords } from "../services/Amplify/Api";
import {
  catchP,
  then,
  disabledButton,
  writeError,
  setProperty,
  getProperty
} from "../services/Helpers";
import { successHandler, parseDate } from "../services/ArtcicleHelpers";
import * as R from "ramda";
import Chart from "chart.js";
export default {
  created() {
    const vm = this;
    const setData = setProperty(vm, "bloodPressureData");
    const pathToItems = ["data", "getUserDataByType", "items"];
    const getItems = getProperty(pathToItems);
    const successHandler = R.compose(setData, getItems);
    const type = { type: "BloodPressure" };

    const errorHandler = error => {
      alert(error);
    };
    const getRecordsCom = R.compose(
      catchP(errorHandler),
      then(successHandler),
      getRecords
    );

    getRecordsCom(type);
  },
  methods: {
    showChart() {
      const data = R.pluck("Data", this.bloodPressureData);
      const systolic = R.pluck("systolic", data);
      const diastolyc = R.pluck("diastolyc", data);
      const dates = R.pluck("CreatedAt", this.bloodPressureData);
      const ctx = this.$refs.canvas;
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: systolic,
              label: "Sytolic",
              borderColor: "#d81a08",
              borderWidth: 2,
              fill: true
            },
            {
              data: diastolyc,
              label: "Diastolyc",
              borderColor: "#0820d8",
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Blood Pressure",
            fontSize: 25
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "series",
                time: {
                  unit: "day"
                }
              }
            ]
          }
        }
      });
    },
    save() {
      const vm = this;
      const isDisabled = "isDisabled";
      const arrayProp = "bloodPressureData";
      const propMessage = "message";
      const type = "BloodPressure";

      disabledButton(vm, isDisabled);

      const errorHandler = writeError(vm, propMessage, "", isDisabled);

      const successHandlerCurried = successHandler(
        vm,
        arrayProp,
        isDisabled,
        propMessage,
        type
      );

      const data = Object.assign(
        {},
        {
          systolic: vm.systolic,
          diastolyc: vm.diastolyc
        }
      );

      const saveData = R.compose(
        catchP(errorHandler),
        then(successHandlerCurried),
        writeBloodPressure
      );
      saveData(data);
    }
  },

  data() {
    return {
      bloodPressureData: [],
      systolic: null,
      diastolyc: null,
      message: "",
      error: false,
      isDisabled: false
    };
  },
  computed: {
    disabledButton() {
      return this.isDisabled
        ? { disabledButton: true }
        : { disabledButton: false };
    },
    parsedDateTime() {
      const array = this.bloodPressureData.map(parseDate);
      return R.reverse(array);
    }
  }
};
</script>

<style>
@import url("../styles/userArticle.css");
</style>

