<template>
    <div id="nav-container" >

    <button id="menu" class="material-icons" @click="showItems">menu</button>
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
    }
}
</script>

<style>
#nav-container{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1rem;
}
#menu{
    width: 60px;
    height: 60px;
    background:rgba(128, 128, 128, 0.692);
    border: none;
    border-radius: 15%;
    border: 2px outset blanchedalmond;
}
#menu:hover{
    transform: scale(1.1)
}

#menu:active{
    transform: scale(0.95)
}

.menu-item{
    border: 1.5px outset blanchedalmond;
    width: 60px;
    height: 60px;
    background:rgba(128, 128, 128, 0.849);
    border-radius: 50%; 
    animation: rebound 0.2s ease-out 0.2s forwards;
}
.menu-item:hover{
    transform: scale(1.1);

}
.menu-item:active{
    transform: scale(0.95);
}
.material-icons{
    font-size: 48px;
    color:blanchedalmond;
}

.show-menu-enter-active{
    animation:slideDown 0.2s ease-in forwards;
}
.show-menu-leave-active{
    animation: slideDown 0.2s ease-in-out reverse;
}
@keyframes slideDown {
    0%{
        margin-top: -100%;
        opacity: 0;
    }
    25%{
        margin-top: -75%;
        opacity: 0.25;
    }
    50%{
        margin-top: 25%;
        opacity: 0.50; 
    }
    75%{
        margin-top: 10%;
        opacity: 0.75; 
        
    }
    100%{
        margin-top: 0%;
        opacity: 1; 

    }

}
@keyframes rebound {
    from {
        margin-top:-3px;
    }
    to{
        margin-top: 15px;
    }
}

</style>

