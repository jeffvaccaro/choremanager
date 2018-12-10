<template>
  <div id="app">
    <Intro msg="Introduction to ChoreManager"/>
    <BuildFamily msg="Build your Family"/>
    <AddChores msg="Add your Chores"/>
    <AssignChores msg="Assign your Chores"/>
    <Calendar msg="Generate your Calendar"/>
    <NavBar msg="Navigation for ChoreManager"/>   
    <Modal msg="Modal"/>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'
import Intro from './components/Intro.vue'
import AddChores from './components/AddChores.vue'

import BuildFamily from './components/BuildFamily.vue'
import AssignChores from './components/AssignChores.vue'
import Calendar from './components/Calendar.vue'
import Modal from './components/dialogModal.vue'
import $ from 'jquery';

export default {
  name: 'App',
  components: {
    Intro,
    NavBar,
    BuildFamily,
    AssignChores,
    Calendar,
    Modal,
    AddChores 
  },
  mounted: function () {
    //var vm = this
  },
  methods:{
  	showModal() {
      let element = this.$refs.modal.$el
      $(element).modal('show');
    }    
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
