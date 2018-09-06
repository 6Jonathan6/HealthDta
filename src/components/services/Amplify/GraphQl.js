//Text for queries and mutations
const writeBloodPressureText = `mutation Write($systolic:Int,$diastolyc:Int){
    write(input: {
        systolic:$systolic
        diastolyc:$diastolyc
        Type:BloodPressure
    }){
        UserId
        Type
        Data {
          __typename
          ...on BloodPressure{
            systolic
            diastolyc
          }
        }
    }
}`;

// const getBloodPressureText = `query `

export { writeBloodPressureText };
