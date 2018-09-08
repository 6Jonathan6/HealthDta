//Text for queries and mutations
const writeBloodPressureText = `mutation Write($systolic:Int,$diastolyc:Int){
    write(input: {
        systolic:$systolic
        diastolyc:$diastolyc
        Type:BloodPressure
    }){
        CreatedAt
        Data {
          __typename
          ...on BloodPressure{
            systolic
            diastolyc
          }
        }
    }
}`;
const writeBloodSugarLevel = `mutation Write($level:Int!){
    write(input: {
        level:$level
        Type:BloodSugarLevel
    }){ 
        CreatedAt
        Data {
          ...on BloodSugarLevel{
            level
          }
        }
    }
}`;

const getRecordsText = `query getUserDataByType ($type: String!) {
    getUserDataByType(type: $type){
        items {
            CreatedAt
            Data {
                ...on BloodPressure {
                    systolic
                    diastolyc
                }
                ...on BloodSugarLevel {
                    level
                }
            }
        }
    }
}`;
// const getBloodPressureText = `query `

export { writeBloodPressureText, getRecordsText, writeBloodSugarLevelText };
