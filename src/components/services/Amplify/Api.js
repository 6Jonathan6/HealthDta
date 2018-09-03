import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.js";
import { writeBloodPressureText } from "./GraphQl";

API.configure(Config.Api);

const writeBloodPressure = writeBloodPressureText;

function SendRecord(data) {
  return API.graphql(graphqlOperation(writeBloodPressure, data));
}

export { SendRecord };
