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
 @import url('./styles/about.css');
</style>



