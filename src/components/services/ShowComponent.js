import * as R from 'ramda'

const showComponent = R.curry(function(componentName, vm){
        vm.name = componentName
})

const turnOffProp = R.curry(function(prop,obj){
  obj[prop] = false
})

const emitEvent = R.curry(function(topic,obj,payload){
  obj.$emit(topic,payload)
})

const emitShow = emitEvent('show')
const turnOffIsMenu = turnOffProp('isMenu')


export {
  showComponent,
  turnOffProp,
  turnOffIsMenu,
  emitShow
}