<template>
    <div id="nav-container" >

    <button id="menu" class="material-icons" @click="showItems">{{ symbol }} </button>
    <transition-group name="show-menu">
    <div id="items-container" v-show="isMenu" key="items">
        <button id="home" class="material-icons menu-item" @click="goHome">home</button>
        <button id="signin" class="menu-item" @click="goSignUp">Sign Up</button>
    </div>
    </transition-group>
    </div>
</template>
<script>
import { showComponent, turnOffIsMenu, emitShow }from './services/ShowComponent.js'
export default {
    methods:{
        showItems(){
            this.isMenu = !this.isMenu
        },
        goHome(){
            const vm = this
            turnOffIsMenu(vm)
            const showHome = showComponent('Home.vue')
            emitShow(vm,{showMe:showHome})
        },
        goSignUp(){
            const vm = this
            turnOffIsMenu(vm)
            const showSignUp = showComponent('SignUp.vue')
            emitShow(vm,{showMe:showSignUp})
        }
    },
    data(){
        return {
            isMenu:false
        }
    },
    computed:{
        symbol(){
            return !this.isMenu ? "menu" : "close"
        }
    }

}
</script>

<style>
 @import url('./styles/nav.css');
</style>

