<template>
    <div id="user-form-container">
        <form @submit.prevent = "save">
            <fieldset >
                <legend>Weight Control</legend>
                <ul>
                    <li>
                        <label for="weight">Weight:</label>
                        <input type="number" v-model="weight" min="0" max="200" step="0.01" id="weight" required>
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
            <caption>Weight </caption>
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
                  <td>{{ item.Data.weight}}</td>
                  <td> <button @click.prevent = "deleteRecord" :id="item.CreatedAt.toISOString()" class="delete-buttons" title="Delete">X</button></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Units Kg </td>
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
import { writeWeight, getRecords, deleteR } from "../services/Amplify/Api";
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
    const setData = setProperty(vm, "weightR");
    const pathToItems = ["data", "getUserDataByType", "items"];
    const getItems = getProperty(pathToItems);
    const successHandler = R.compose(setData, getItems);
    const type = { type: "Weight" };

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
      const data = vm.weightR;
      const recordDate = evt.target.id;
      const recordIndex = R.findIndex(
        R.propEq("CreatedAt", new Date(recordDate))
      )(data);
      const obj = data[recordIndex];

      const message = `You are about to delete this record ${obj.CreatedAt.toLocaleString()} Level: ${
        obj.Data.weight
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
            vm.weightR.splice(recordIndex, 1);
          }),
          deleteR
        );
        deleteRComp({ date: recordDate });
      }
    },
    showChart() {
      const data = R.pluck("Data", this.weightR);
      const weight = R.pluck("weight", data);
      const dates = R.pluck("CreatedAt", this.weightR);
      const ctx = this.$refs.canvas;
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              data: weight,
              label: "Weight",
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
            text: "Weight",
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
      const arrayProp = "weightR";
      const propMessage = "message";
      const type = "Weight";

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
          weight: vm.weight
        }
      );

      const saveData = R.compose(
        catchP(errorHandler),
        then(successHandlerCurried),
        writeWeight
      );
      saveData(data);
    }
  },

  data() {
    return {
      weightR: [],
      weight: null,
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
      const array = this.weightR.map(parseDate);
      return R.reverse(array);
    }
  }
};
</script>

<style>
@import url("../styles/userArticle.css");
</style>