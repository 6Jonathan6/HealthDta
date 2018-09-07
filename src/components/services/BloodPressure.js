import { enabledButton } from "./Helpers";
import Chart from "chart.js";
import * as R from "ramda";

const pushToArray = function(array, obj) {
  array.push(obj.data.write);
};

//For write Record
const successHandler = R.curry(function(
  vm,
  arrayProp,
  isDisabled,
  propMessage,
  obj
) {
  console.log(obj.data.write);
  const array = vm[arrayProp];
  pushToArray(array, obj);
  setTimeout(() => enabledButton(vm, isDisabled), 500);
  vm[propMessage] = `Saved Data: Systolic: ${
    obj.data.write.Data.systolic
  }, Diastolyc: ${obj.data.write.Data.diastolyc}`;
  vm.systolic = null;
  vm.diastolyc = null;
});

//Parsing Dates for created function
const parseDate = function(obj) {
  obj.CreatedAt = new Date(obj.CreatedAt);
  return obj;
};

export { successHandler, parseDate };
