import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.con.js";
import {
  writeBloodPressureText,
  getRecordsText,
  writeBloodSugarLevelText,
  writeWeightText,
  deleteRecordText
} from "./GraphQl";

import * as R from "ramda";
//Configuration
API.configure(Config.Api);

//Function Template to save  and delete data
//date is an object with all the parameter required by a mutation
const mutateData = R.curry(function(mutationText, data) {
  return API.graphql(graphqlOperation(mutationText, data));
});

const fetchData = R.curry(function(queryText, data) {
  return API.graphql(graphqlOperation(queryText, data));
});

//Mutations
const writeBloodPressure = mutateData(writeBloodPressureText);
const writeBloodSugarLevel = mutateData(writeBloodSugarLevelText);
const writeWeight = mutateData(writeWeightText);
const deleteR = mutateData(deleteRecordText);

//Queries
const getRecords = fetchData(getRecordsText);

export {
  writeBloodPressure,
  writeBloodSugarLevel,
  getRecords,
  writeWeight,
  deleteR
};
