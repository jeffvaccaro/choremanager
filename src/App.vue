<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Intro msg="Introduction to ChoreManager"/>
    <BuildFamily msg="Build your Family"/>
    <AddChores msg="Add your Chores"/>
    <AssignChores msg="Assign your Chores"/>
    <Calendar msg="Generate your Calendar"/>
    <NavBar msg="Navigation for ChoreManager"/>    
  </div>
</template>

<script>

import Intro from './components/Intro.vue'
import BuildFamily from './components/BuildFamily.vue'
import AddChores from './components/AddChores.vue'
import AssignChores from './components/AssignChores.vue'
import Calendar from './components/Calendar.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Intro,
    BuildFamily,
    AddChores,
    AssignChores,
    Calendar
  },
  mounted: function () {
    //var vm = this
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FF6600;
  margin-top: 60px;
}
</style>
