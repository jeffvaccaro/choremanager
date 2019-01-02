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
        :key="choreItem.choreId">
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
              :key="familyMember.memberId">
              <div class="input-group-prepend  col-md-4">
                <h6 v-if="assignedCheck(choreItem.choreId,familyMember.memberId) === true"><label class="input-group-text bg-primary text-white" for="chkAssign">Assigned:</label></h6>
                <!-- <h6 v-if="assignedCheckVal === true"><label class="input-group-text bg-primary text-white" for="chkAssign">Assigned:</label></h6> -->
                <h6 v-else><label 
                  class="input-group-text bg-light text-black" 
                  for="chkAssign">Assign to:</label></h6>
              </div>
              <div class="input-group-append col-md-7">
                <label class="form-control border-primary" v-if="assignedCheck(choreItem.choreId,familyMember.memberId) === true">{{ familyMember.familyMemberName }}</label>
                <!-- <label class="form-control border-primary" v-if="assignedCheckVal === true">{{ familyMember.familyMemberName }}</label> -->
                <label 
                  class="form-control" 
                  v-else>{{ familyMember.familyMemberName }}</label>
              </div>
              <input 
                type='checkbox' 
                class="form-control col-md-1" 
                @click="assignChores(choreItem.choreId,familyMember.memberId)">
            </div>                          
          </div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>               
  </div>
</template>

<script>
import { serverBus } from "../main";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    name: 'AssignChores',
    data: function () {
    return {
        choresArr: [],
        familyArr: [],
        assignedChoresArr: [],
        assignedChoresRowIndex: 0,
        fId:0

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
   computed: {
    ...mapGetters({ familyName: 'getFamilyName', familyId: 'getFamilyId',assignedChoresArr: 'getAssignedChoresArr'}),
  },  
  watch: {
    // getFamilyName (newName, oldName) {
    //   this.familyName = newName;
    // },
    // getFamilyId (newId, oldId) {
    //   this.familyId = newId;

    // axios
    //   .get("http://localhost:5000/getAssignments?familyId="+this.familyId)
    //   .then(response => (this.assignedChoresArr = response.data));

    //   serverBus.$on('choresArr', (choresArr) => {
    //       this.choresArr = choresArr;
    //   });
    //   serverBus.$on('familyArr', (familyArr) => {
    //       this.familyArr = familyArr.filter((item)=>item.isParent!==true);
    //   }); 

    // },
  },  
   methods: {
    assignChores: function(choreId, memberId){
        var vm = this;

        var found = vm.assignedChoresArr.filter(obj => obj.choreId == choreId && obj.memberId == memberId)
        if(found.length == 0){
          var memberObj = vm.familyArr.find(item => item.memberId === memberId);
          var choreObj = vm.choresArr.find(item=>item.choreId === choreId);
          var comboObj = {
              arrIndex: vm.assignedChoresRowIndex,
              //choreIndex: choreIndx,
              //memberIndex: memberIndx,
              memberId: memberObj.memberId,
              choreId: choreObj.choreId,
              allowanceId: choreObj.allowanceId
          }

          axios
            .get("http://localhost:5000/addAssignment?memberId="+comboObj.memberId+"&choreId="+comboObj.choreId+"&allowanceId="+comboObj.allowanceId)
            .then(() => (vm.assignedChoresArr.push(comboObj)))
            .then(() => (vm.assignedChoresRowIndex = vm.assignedChoresRowIndex + 1));
            
          //  vm.assignedChoresArr.push(comboObj);
          //  vm.assignedChoresRowIndex = vm.assignedChoresRowIndex + 1;
        }else{
          try{
          var removeIndex = vm.assignedChoresArr.map(function(item) { return item.arrIndex; })
                              .indexOf(found[0].arrIndex);

          var assignedChoreObj = vm.assignedChoresArr.find(item => item.arrIndex === removeIndex);

          //The following link explains the ~ operator: https://wsvincent.com/javascript-tilde/            
          axios
            .get("http://localhost:5000/removeAssignment?memberId="+assignedChoreObj.memberId+"&choreId="+assignedChoreObj.choreId)
            .then(() => (~removeIndex && vm.assignedChoresArr.splice(removeIndex, 1)))
            .then(() => (vm.assignedChoresRowIndex = vm.assignedChoresRowIndex - 1));   

          //~removeIndex && vm.assignedChoresArr.splice(removeIndex, 1);
          //vm.assignedChoresRowIndex = vm.assignedChoresRowIndex - 1;

          }catch(err){
            alert("Remove Assignment Error: " + err);
          }
        }

        serverBus.$emit('assignedChores', vm.assignedChoresArr); 
    },
    assignedCheck: function(cId, mId){
        var vm = this;
        //var found = vm.assignedChoresArr.filter(obj => obj.choreIndex == choreIndx && obj.memberIndex == memberIndx)
        console.log(cId + " : " + mId);
        //console.log(vm.assignedChoresArr.length);
         var found = vm.assignedChoresArr.filter(obj => obj.choreId === cId && obj.memberId === mId)
         if(found.length > 0){
             return true;
         }else{
             return false;
         }
    }
   }
}
</script>