<template>
<div id="about-container">
<h1>About:</h1>
<p>
    With health data you will be able to keep track of your blood sugar level,
    blood pressure and even keep track of your work out plan in order to analyze your results
    and decide wheter you are achieving your goals or not.
</p>
<nav-buttons @show="goTo"></nav-buttons>
<div class="path-title interactive-right"></div>
<div class="triangle-p interactive-left"></div>
</div>
</template>
<script>
import Nav from './Nav.vue'
export default {
    components:{
        navButtons:Nav,
    },
    methods:{
        goTo(obj){
            this.$emit('show',obj)
        }
    }
}
</script>

<style>
#about-container{
    width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 3fr 90px 1fr;
    grid-template-rows: 5px auto auto 1fr;
    color:#b47b44;
}
#about-container h1 {
    grid-area: 2 / 2 / 3 / 3;
    grid-row-gap:0.2rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 4rem;
}
#about-container p {
    min-width: 200px;
    grid-area: 3 / 2 / 5 / 3;
    text-align: left;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 400;
    font-size: 1.7rem;
    z-index: 2;
    padding:0.25rem;
    color: white;
}

div.path-title{
    width: 100%;
        color:#b47b44;
    grid-area: 1 / 1 / -1 / 4;
    background: #0f1e32;
    z-index: -2;
    clip-path: polygon(0% 38%, 11% 99%, 98% 2%, 2% 1%);
}

div.triangle-p{
    grid-area:  3 / 2 / 5 / -1;
    clip-path: polygon(100% 50%, 1% 1%, 1% 100%);
        color:#b47b44;
    z-index: -1;
    background: #9b5b1d;
    opacity: 0.8;
}

div.interactive-right{
    animation: start 1s ease-in-out  0.1s forwards alternate;
}
div.interactive-left{
    animation: start2 1s ease-in-out 0.1s forwards alternate;
}

@keyframes start {
    from{
        transform: rotate(-25deg)
    }
    to{
        transform: rotate(0deg)
    }
}

@keyframes start2 {
    from{
        transform: rotate(25deg)
    }
    to{
        transform: rotate(0deg)
    }
}
</style>



