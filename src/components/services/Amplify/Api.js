import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.con.js";
import {
  writeBloodPressureText,
  getRecordsText,
  writeBloodSugarLevelText,
  writeWeightText
} from "./GraphQl";
import * as R from "ramda";
//Configuration
API.configure(Config.Api);

//Function Template to save data
const saveData = R.curry(function(mutationText, data) {
  return API.graphql(graphqlOperation(mutationText, data));
});

const fetchData = R.curry(function(queryText, data) {
  return API.graphql(graphqlOperation(queryText, data));
});

//Mutations
const writeBloodPressure = saveData(writeBloodPressureText);
const writeBloodSugarLevel = saveData(writeBloodSugarLevelText);
const writeWeight = saveData(writeWeightText);
//Queries
const getRecords = fetchData(getRecordsText);

export { writeBloodPressure, writeBloodSugarLevel, getRecords, writeWeight };
