<template>
  <div 
    class="container" 
    id="AssignChores">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <br ><br ><br >
        <div class="row clearfix">
          <div class="col-md-12 column">
            <div class="jumbotron text-left">
              <h2>
                <span>
                  <a name="assign"><img src="../assets/select_edited-150.png" ></a>
                </span>
                Assign the Chores!
              </h2>
              <h3>This is Step 3!  This is the final step before the Calendar gets generated.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="row clearfix" 
      id="choreAssignments"/>
    <div class="row clearfix">
      <div 
        class="col-md-4 column" 
        v-for="choreItem in choresArr" 
        :key="choreItem.arrIndex">
        <div class="card">
          <div class="card-body">
            <div class="form-group text-left">
              <h4>{{ choreItem.choreName }}</h4>
              <button 
                class='btn btn-default btn-outline-primary float-left col-md-12' 
                type="button">{{ choreItem.dayName }} <i 
                  v-show="choreItem.isRepeat === true" 
                  class="fas fa-redo-alt"/></button>
              <br><br><br>
            </div>
            <div 
              class="input-group" 
              v-for="familyMember in familyArr" 
              :key="familyMember.arrIndex">
              <div class="input-group-prepend  col-md-4">
                <h6 v-if="assignedCheck(choreItem.arrIndex,familyMember.arrIndex) === true"><label 
                  class="input-group-text bg-primary text-white" 
                  for="chkAssign">Assigned:</label></h6>
                <h6 v-else><label 
                  class="input-group-text bg-light text-black" 
                  for="chkAssign">Assign to:</label></h6>
              </div>
              <div class="input-group-append col-md-7">
                <label 
                  class="form-control border-primary" 
                  v-if="assignedCheck(choreItem.arrIndex,familyMember.arrIndex) === true">{{ familyMember.familyMemberName }}</label>
                <label 
                  class="form-control" 
                  v-else>{{ familyMember.familyMemberName }}</label>
              </div>
              <input 
                type='checkbox' 
                class="form-control col-md-1" 
                @click="assignChores(choreItem.arrIndex,familyMember.arrIndex)">
            </div>                          
          </div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>               
  </div>
</template>

<script>
import { serverBus } from '../main';
export default {
    name: 'AssignChores',
    data: function () {
    return {
        choresArr: [],
        familyArr: [],
        assignedChoresArr: [],
        assignedChoresRowIndex: 0
    }
 },
 created: function() {
  // Using the service bus
    serverBus.$on('choresArr', (choresArr) => {
        this.choresArr = choresArr;
    });
    serverBus.$on('familyArr', (familyArr) => {
        this.familyArr = familyArr.filter((item)=>item.isParent!==true);
    }); 
 },
   methods: {
    assignChores: function(choreIndx, memberIndx){
        var vm = this;
        var found = vm.assignedChoresArr.filter(obj => obj.choreIndex == choreIndx && obj.memberIndex == memberIndx)
        if(found.length == 0){
          var comboObj = {
              arrIndex: vm.assignedChoresRowIndex,
              choreIndex: choreIndx,
              memberIndex: memberIndx
          }
          vm.assignedChoresArr.push(comboObj);
          vm.assignedChoresRowIndex = vm.assignedChoresRowIndex + 1;
        }else{
          var removeIndex = vm.assignedChoresArr.map(function(item) { return item.arrIndex; })
                              .indexOf(found[0].arrIndex);
          ~removeIndex && vm.assignedChoresArr.splice(removeIndex, 1);               
        }

        serverBus.$emit('assignedChores', vm.assignedChoresArr); 
    },
    assignedCheck: function(choreIndx, memberIndx){
        var vm = this;
        var found = vm.assignedChoresArr.filter(obj => obj.choreIndex == choreIndx && obj.memberIndex == memberIndx)
        if(found.length > 0){
            return true;
        }else{
            return false;
        }
    }
   }
}
</script>