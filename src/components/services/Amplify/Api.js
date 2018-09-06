import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.con.js";
import { writeBloodPressureText } from "./GraphQl";
import * as R from "ramda";
//Configuration
API.configure(Config.Api);

//Function Template to save data
const saveData = R.curry(function(mutationText, data) {
  return API.graphql(graphqlOperation(mutationText, data));
});

//Mutations
const writeBloodPressure = saveData(writeBloodPressureText);

//Queries

export { writeBloodPressure };
