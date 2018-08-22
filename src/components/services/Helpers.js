import * as R from "ramda";

class Attributes {
    constructor(nickname, email) {
        this.nickname = nickname
        this.email = email
    }
}

class User {
    constructor(nikcname, email, password) {
        this.username = email
        this.password = password
        this.attributes = new Attributes(nikcname, email)
    }
}


//helper function to handle thenables (resolved Promises)
const then = R.curry(function (fn, thenable) {
    return thenable.then(fn)
})


//helper function to handle rejected promises
const catchP = R.curry(function (errorHandler, promise) {
    return promise.catch(errorHandler)
})


const disabledButton = function (vm, prop) {
    //isDisabled = true
    vm[prop] = true

}


const enabledButton = R.curry(function (vm,prop) {
// isDisabled = false
   vm[prop] = false
})

//isDisabled prop of the vue compenents which handles wether the button is disabled or not
const writeError = R.curry(function (vm, prop, initialMessage, isDisabled, obj) {
    vm[prop] = obj.message
    vm["error"] = true
    const toInitial = function () {
        vm[prop] = initialMessage;
        vm["error"] = false
        enabledButton(vm,isDisabled)

    }
    setTimeout(toInitial, 5000)
})


function createUser(nikcname, email, password, vm, isDisabled) {
    disabledButton(vm, isDisabled)
    return new User(nikcname, email, password)
}

export{
    createUser,
    enabledButton,
    disabledButton,
    then,
    catchP,
    writeError,
}