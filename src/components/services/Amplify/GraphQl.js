//Text for queries and mutations
const writeBloodPressureText = `mutation Write($User:String!,$typename:String!,$systolic:Int,$diastolyc:Int){
    writeBloodPressure(input: {
        User:$User
        typename:$typename
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
          }
        }
    }
}`;

// const getBloodPressureText = `query `

export { writeBloodPressureText };
