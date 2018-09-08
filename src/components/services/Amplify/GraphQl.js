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
const writeBloodSugarLevelText = `mutation Write($level:Float!){
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

const writeWeightText = `mutation Write($weight:Float!){
    write(input: {
        weight:$weight
        Type:Weight
    }){ 
        CreatedAt
        Data {
          ...on Weight{
            weight
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
                ...on Weight {
                    weight
                }
            }
        }
    }
}`;
// const getBloodPressureText = `query `

export {
  writeBloodPressureText,
  getRecordsText,
  writeBloodSugarLevelText,
  writeWeightText
};
