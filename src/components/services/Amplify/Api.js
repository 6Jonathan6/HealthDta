import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.js";
import { writeBloodPressureText } from "./GraphQl";

//Configuration
API.configure(Config.Api);

//Mutations
const writeBloodPressure = writeBloodPressureText;

//Queries

function SendRecord(data) {
  return API.graphql(graphqlOperation(writeBloodPressure, data));
}

export { SendRecord };
