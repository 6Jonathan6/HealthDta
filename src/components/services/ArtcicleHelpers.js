import { enabledButton } from "./Helpers";
import * as R from "ramda";

const pushToArray = function(array, obj) {
  array.push(obj.data.write);
};

//For "save" method
const successHandler = R.curry(function(
  vm,
  arrayProp,
  isDisabled,
  propMessage,
  type,
  obj
) {
  const array = vm[arrayProp];
  pushToArray(array, obj);
  setTimeout(() => enabledButton(vm, isDisabled), 500);
  if (type == "BloodPressure") {
    vm[propMessage] = `Saved Data: Systolic: ${
      obj.data.write.Data.systolic
    }, Diastolyc: ${obj.data.write.Data.diastolyc}`;
    vm.systolic = null;
    vm.diastolyc = null;
  } else if (type == "BloodSugarLevel") {
    vm[propMessage] = `Saved Blood Sugar Level: ${obj.data.write.Data.level}`;
  } else {
    vm[propMessage] = `Saved Weight: ${obj.data.write.Data.weight}`;
  }
});

//Parsing Dates for created function
const parseDate = function(obj) {
  obj.CreatedAt = new Date(obj.CreatedAt);
  return obj;
};

export { successHandler, parseDate };
