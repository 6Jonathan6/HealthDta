import API, { graphqlOperation } from "@aws-amplify/api";
import { Config } from "./Config.js";

API.configure(Config.Api);

const writeBloodPressure = `mutation Write($User:String!,$typename:String!,$systolic:Int,$diastolyc:Int){
    writeBloodPressure(input:{
        User:$User
        typename:$typename
        systolic:$systolic
        diastolyc:$diastolic
        Type:BloodPressure
    }){
        UseId
    }
}`;

function SendRecord(data) {
  return API.graphql(graphqlOperation(writeBloodPressure, data));
}

export { SendRecord };
