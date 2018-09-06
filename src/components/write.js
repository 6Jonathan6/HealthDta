const vm = this;
const data = Object.assign(
  {},
  {
    User: vm.sub,
    typename: "BloodPressure",
    systolic: vm.systolic,
    diastolyc: vm.diastolyc
  }
);

SendRecord(data)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
