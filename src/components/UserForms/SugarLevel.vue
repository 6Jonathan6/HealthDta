<template>
    <div id="user-form-container">
        <form @submit.prevent = "save">
            <fieldset >
                <legend>Blood Sugar Level</legend>
                <ul>
                    <li>
                        <label for="level">Level:</label>
                        <input type="number" v-model="level" min="0" max="1000" step="0.01" id="level" required>
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
            <caption>Blood Sugar </caption>
            <thead>
              <tr>
                <th scope="column">Date</th>
                <th scope="column">Time</th>
                <th scope="column"> Level </th>
                <th scope="column"> Delete </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index ) in parsedDateTime" :key="index">
                  <td class="time-cell"> <p> {{ item.CreatedAt.toLocaleDateString() }} </p> </td>
                  <td class="time-cell"> <p> {{ item.CreatedAt.toLocaleTimeString() }} </p> </td>
                  <td>{{ item.Data.level}}</td>
                  <td> <button @click.prevent = "deleteRecord" :id="item.CreatedAt.toISOString()" class="delete-buttons" title="Delete">X</button></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Units mM </td>
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
import {
  writeBloodSugarLevel,
  getRecords,
  deleteR
} from "../services/Amplify/Api";
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
    const setData = setProperty(vm, "bloodSugarLevelR");
    const pathToItems = ["data", "getUserDataByType", "items"];
    const getItems = getProperty(pathToItems);
    const successHandler = R.compose(setData, getItems);
    const type = { type: "BloodSugarLevel" };

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
    deleteRecord(evt) {
      const vm = this;
      const data = vm.bloodSugarLevelR;
      const recordDate = evt.target.id;
      const recordIndex = R.findIndex(
        R.propEq("CreatedAt", new Date(recordDate))
      )(data);
      const obj = data[recordIndex];

      const message = `You are about to delete this record ${obj.CreatedAt.toLocaleString()} Level: ${
        obj.Data.level
      }`;

      const confirmation = window.confirm(message);
      if (confirmation) {
        const deleteRComp = R.compose(
          catchP(error => {
            console.log(error);
            alert(error.errors[0].message);
          }),
          then(response => {
            console.log(response);
            vm.bloodSugarLevelR.splice(recordIndex, 1);
          }),
          deleteR
        );
        deleteRComp({ date: recordDate });
      }
    },
    showChart() {
      const data = R.pluck("Data", this.bloodSugarLevelR);
      const level = R.pluck("level", data);
      const dates = R.pluck("CreatedAt", this.bloodSugarLevelR);
      const ctx = this.$refs.canvas;
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: level,
              label: "Level",
              borderColor: "#d81a08",
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "Blood Sugar Level",
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
      const arrayProp = "bloodSugarLevelR";
      const propMessage = "message";
      const type = "BloodSugarLevel";

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
          level: vm.level
        }
      );

      const saveData = R.compose(
        catchP(errorHandler),
        then(successHandlerCurried),
        writeBloodSugarLevel
      );
      saveData(data);
    }
  },

  data() {
    return {
      bloodSugarLevelR: [],
      level: null,
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
      const array = this.bloodSugarLevelR.map(parseDate);
      return R.reverse(array);
    }
  }
};
</script>

<style>
@import url("../styles/userArticle.css");
</style>