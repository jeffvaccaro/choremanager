<template>

<nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Chore Manager : [v 1.1]</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"  v-bind:class="{ active: isIntroActive }">
        <a class="nav-link" href="#" v-on:click="activity('Intro')" v-scroll-to="'#Intro'">Intro</a>
      </li>
      <li class="nav-item" v-bind:class="{ active: isBuildFamilyActive }">
        <a class="nav-link" href="#" v-on:click="activity('BuildFamily')" v-scroll-to="'#BuildFamily'">Build Family</a>
      </li>
      <li class="nav-item" v-bind:class="{ active: isAddChoresActive }">
        <a class="nav-link" href="#" v-on:click="activity('AddChores')" v-scroll-to="'#AddChores'">Add Chores</a>
      </li>      
      <li class="nav-item" v-bind:class="{ active: isAssignChoresActive }">
        <a class="nav-link" href="#" v-on:click="activity('AssignChores')" v-scroll-to="'#AssignChores'">Assign Chores</a>
      </li>            
      <li class="nav-item" v-bind:class="{ active: isGenerateCalendarActive }">
        <a class="nav-link" href="#" v-on:click="activity('GenerateCalendar')" v-scroll-to="'#GenerateCalendar'">Generate Calendar</a>
      </li>                  
    </ul>

    <span class="navbar-text">
      <a class="nav-link" href="#">Register [Coming Soon!]</a>
    </span>    
  </div>
</nav>

</template>           

<script>
import { serverBus } from "../main";
export default {
  name: 'NavBar',
  data: function() {
    return {
      isIntroActive: true,
      isBuildFamilyActive: false,
      isAddChoresActive: false,
      isAssignChoresActive: false,
      isGenerateCalendarActive: false
    };
  },
  created: function() {
    // Using the service bus
    serverBus.$on('isIntroActive', (isIntroActive) => {
        this.isIntroActive = isIntroActive;
    });
    serverBus.$on('isBuildFamilyActive', (isBuildFamilyActive) => {
        this.isBuildFamilyActive = isBuildFamilyActive;
    }); 
    serverBus.$on('isAddChoresActive', (isAddChoresActive) => {
        this.isAddChoresActive = isAddChoresActive;
    });
    serverBus.$on('isAssignChoresActive', (isAssignChoresActive) => {
        this.isAssignChoresActive = isAssignChoresActive;
    });     
    serverBus.$on('isGenerateCalendarActive', (isGenerateCalendarActive) => {
        this.isGenerateCalendarActive = isGenerateCalendarActive;
    });         
  }
  ,  
  methods: {
    activity: function(menuVal){
      var vm = this;
      vm.setFalse();
      switch(menuVal) {
          case "Intro":
              vm.isIntroActive = true;
              break;
          case "BuildFamily":
              vm.isBuildFamilyActive = true;
              break;
          case "AddChores":
              vm.isAddChoresActive = true;
              break;
          case "AssignChores":
              vm.isAssignChoresActive = true;      
              break;
          case "GenerateCalendar":
              vm.isGenerateCalendarActive = true;                            
              break;
          default:
              vm.isIntroActive = true;
              break;
      }      
    },
    setFalse: function(){
      var vm = this;

      vm.isIntroActive = false;
      vm.isBuildFamilyActive = false;
      vm.isAddChoresActive = false;
      vm.isAssignChoresActive = false;
      vm.isGenerateCalendarActive = false;
    }
  }
}
</script>     