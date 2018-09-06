import * as R from "ramda";

class Attributes {
  constructor(nickname, email) {
    this.nickname = nickname;
    this.email = email;
  }
}

class User {
  constructor(nikcname, email, password) {
    this.username = email;
    this.password = password;
    this.attributes = new Attributes(nikcname, email);
  }
}

//helper function to handle thenables (resolved Promises)
const then = R.curry(function(fn, thenable) {
  return thenable.then(fn);
});

//helper function to handle rejected promises
const catchP = R.curry(function(errorHandler, promise) {
  return promise.catch(errorHandler);
});

const disabledButton = function(vm, prop) {
  //isDisabled = true
  vm[prop] = true;
};

const enabledButton = R.curry(function(vm, prop) {
  // isDisabled = false
  vm[prop] = false;
});

//isDisabled prop of the vue compenents which handles wether the button is disabled or not
const writeError = R.curry(function(vm, prop, initialMessage, isDisabled, obj) {
  vm[prop] = obj.message;
  vm["error"] = true;
  const toInitial = function() {
    vm[prop] = initialMessage;
    vm["error"] = false;
    enabledButton(vm, isDisabled);
  };
  setTimeout(toInitial, 5000);
});

function createUser(nikcname, email, password, vm, isDisabled) {
  disabledButton(vm, isDisabled);
  const mail = email.toLowerCase();
  return new User(nikcname, mail, password);
}

/*
    path is an array for example to get "o" in  

    { x:{ o: 6 } }

    the path will be ["x","o"]
*/
const getProperty = R.curry(function(path, obj) {
  const lensPath = R.lensPath(path);
  const value = R.view(lensPath, obj);
  return value;
});

//update a  attribute of vm
const setProperty = R.curry(function(vm, prop, value) {
  vm[prop] = value;
});

export {
  createUser,
  enabledButton,
  disabledButton,
  then,
  catchP,
  writeError,
  getProperty,
  setProperty
};
