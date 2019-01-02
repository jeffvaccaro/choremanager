<template>
  <div 
    class="container" 
    id="Intro">
    <div class="col-md-12 column">
      <br>
      <div class="jumbotron text-left">
        <h2>
          Welcome to the Family Chore Manager!
        </h2>
        <br>
        <h5>
          The Family Chore Manager was born when I noticed my wife compiling a weekly chore list and my kids arguing with her that "it's not fair..." OR "I just did that chore!". '
          I decided at that time that we needed a way to track who does what chore and when, as well as provide tools utilizing the technology that our kids are using.
        </h5>
        <br>
        <h5>
          This site is brand new.  In fact it is so new, this is only a Free preview for the UI!  There is tons of work left to do!  I'm sure you'll find some bugs or have some 
          suggestions.  You can contact me using the following outlets:
          <ul>
            <li>Use the feedback tool (at the bottom of the screen - green bubble)</li>
            <li>Go to the <a 
              href="https://www.facebook.com/webdad3/" 
              target="_blank">webdad3 technologies</a> page on facebook!</li>
            <li>Tweet me at <a 
              href="https://twitter.com/webdad3" 
              target="_blank">@webdad3</a></li>
          </ul>
        </h5>
        <br>
        <h5>
          Coming Soon: Ability to register using facebook, twitter or google & use your information on any device!
          Recent Updates (v0.1) - You can now save your family & chores locally & bug fixes.
        </h5>
      </div>
      <div class="row clearfix">
        <div 
          class="col-md-3 column" 
          style="display:table-cell; vertical-align:middle; text-align:center;">
          <h2>
            Step 1:
          </h2>
          <h3>Build your Family!</h3>
          <p>
            <a 
              href="#" 
              @click="activity('BuildFamily')" 
              v-scroll-to="'#BuildFamily'"><img src="../assets/addaccount-edited-100.png" ></a>
          </p>                        
        </div>
        <div 
          class="col-md-3 column" 
          style="display:table-cell; vertical-align:middle; text-align:center;">
          <h2>
            Step 2:
          </h2>
          <h3>Add your Chores!</h3>
          <p>
            <a 
              href="#" 
              @click="activity('AddChores')" 
              v-scroll-to="'#AddChores'"><img src="../assets/add-edited-100.png" ></a>
          </p>
        </div>
        <div 
          class="col-md-3 column" 
          style="display:table-cell; vertical-align:middle; text-align:center;">
          <h2>
            Step 3:
          </h2>
          <h3> Assign your Chores!!</h3>
          <p>
            <a 
              href="#" 
              @click="activity('AssignChores')" 
              v-scroll-to="'#AssignChores'"><img src="../assets/select_edited-150.png" ></a>
          </p>
        </div>
        <div 
          class="col-md-3 column" 
          style="display:table-cell; vertical-align:middle; text-align:center;">
          <h2>
            Step 4:
          </h2>
          <h3> Print your Calendar!</h3>
          <p>
            <a 
              href="#" 
              @click="activity('GenerateCalendar')" 
              v-scroll-to="'#GenerateCalendar'"><img src="../assets/calendar-edited-100.png" ></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverBus } from "../main";
export default {
  name: "Intro",
  data: function(){
    return {
      isIntroActive: false,
      isBuildFamilyActive: false,
      isAddChoresActive: false,
      isAssignChoresActive: false,
      isGenerateCalendarActive: false        
    }      
   
  },
  methods: {
    activity: function(menuVal){
      var vm = this;
      vm.setFalse();
      switch(menuVal) {
          case "Intro":
              vm.isIntroActive = true;
              serverBus.$emit("isIntroActive", vm.isIntroActive);      
              break;
          case "BuildFamily":
              vm.isBuildFamilyActive = true;
              serverBus.$emit("isBuildFamilyActive", vm.isBuildFamilyActive);   
              break;
          case "AddChores":
              vm.isAddChoresActive = true;
              serverBus.$emit("isAddChoresActive", vm.isAddChoresActive);   
              break;
          case "AssignChores":
              vm.isAssignChoresActive = true;     
              serverBus.$emit("isAssignChoresActive", vm.isAssignChoresActive);  
              break;
          case "GenerateCalendar":
              vm.isGenerateCalendarActive = true;       
              serverBus.$emit("isGenerateCalendarActive", vm.isGenerateCalendarActive);                           
              break;
          default:
              vm.isIntroActive = true;
              serverBus.$emit("isIntroActive", vm.isIntroActive);      
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
      
      serverBus.$emit("isIntroActive", vm.isIntroActive);      
      serverBus.$emit("isBuildFamilyActive", vm.isBuildFamilyActive);      
      serverBus.$emit("isAddChoresActive", vm.isAddChoresActive);      
      serverBus.$emit("isAssignChoresActive", vm.isAssignChoresActive);      
      serverBus.$emit("isGenerateCalendarActive", vm.isGenerateCalendarActive);      

    }      
  }
};
</script> 