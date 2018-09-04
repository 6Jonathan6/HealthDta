<template>
  <div id="app">
    <transition name = "fade" mode="out-in">
    <component :is="showResponse" @show="listenShow"/>
    <!-- <home @show="listenShow"  v-show="isActiveHome" key="home"></home> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      name: null
    };
  },
  methods: {
    listenShow(component) {
      const vm = this;
      component.showMe(vm);
    }
  },
  computed: {
    showResponse() {
      if (this.name === null) {
        return () => import("./components/Home");
      }
      let component = this.name;
      return () => import(`./components/${component}`);
    }
  }
};
</script>

<style>
html {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html * {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
body {
  background-color: #5886af;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.15s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

ul {
  list-style: none;
  border: none;
}

fieldset {
  border: none;
  height: 100%;
}
</style>
