<template>
  <div 
    class="container" 
    id="BuildFamily">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <br ><br ><br >
        <div class="row clearfix">
          <div class="col-md-12 column">
            <div class="jumbotron text-left">
              <h2>
                <span>
                  <a name="build"><img src="../assets/addaccount-edited-100.png" ></a>
                </span>
                Build your Family!
              </h2>
              <h3>Here is Step 1!  You can add or remove people to assign the chores to.  
              If you register, you can build your family, assign the chores and build a monthly calendar.  
              Registered users will get more features as they become available.</h3>
              <br>
              <h5>You can also use the app as a guest, however, you won't be able to save your family, chores or assignments & the calendar will only be for 1 week.</h5>
              <br>
              <h5>Coming Soon: Text Messaging!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-md-12">
        <br><br><br>
      </div>
    </div> 

    <div class="row clearfix">
      <div class="col-md-6 column">
        <div class="card">
          <div class="card-body">
            <form role="form">
              <div class="form-group text-left">
                <h4><label for="familyName">Family Name</label></h4>
                <input 
                  class="form-control" 
                  id="familyName" 
                  type="text" 
                  v-model="familyName">
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <label 
                    class="input-group-text" 
                    for="memberName">Name</label>
                </div>                             
                <input 
                  type='text' 
                  class="form-control" 
                  id='memberName' 
                  ref='memberName' 
                  v-model="memberName" 
                  size="50" 
                  :disabled="familyName === ''">
                <div class="input-group-append">
                  <label 
                    class="input-group-text" 
                    for="chkIsParent">Is this a parent?</label>
                </div>
                <input 
                  class="form-control col-sm-1" 
                  type="checkbox" 
                  id="chkIsParent" 
                  :disabled="familyName === ''" 
                  v-model="isParent" >
              </div>                    
              <br>
              <button 
                type="button" 
                class='btn btn-default btn-outline-primary float-right' 
                @click="addFamilyMemberRow()">
                <i 
                  class="fas fa-plus-square fa-2x align-middle" 
                  aria-hidden="true"/>
                &nbsp;&nbsp;&nbsp;<span class="align-middle">Add Family Member</span>
              </button>                    
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 column">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-left">
              Family: {{ familyName }}
            </h4>
            <table 
              class="table table-striped card-text" 
              id="tblFamily">
              <tr>
                <th>Name</th>
                <th/>
                <th align="center">Edit | Remove</th>
              </tr>
              <tr 
                v-for="addFamilyMemberRow in addFamilyRowArray" 
                :key="addFamilyMemberRow.arrIndex">
                <td>{{ addFamilyMemberRow.familyMemberName }}</td>
                <td><i 
                  class="far fa-star" 
                  v-show="addFamilyMemberRow.isParent === true"/></td>
                <td>
                  <button 
                    type="button" 
                    class='btn btn-default btn-outline-primary' 
                    @click="editFamilyMemberRow(addFamilyMemberRow.arrIndex)">
                    <i class="fas fa-edit"/> 
                  </button>&nbsp;&nbsp;&nbsp;
                  <button 
                    type="button" 
                    class='btn btn-default btn-outline-primary' 
                    @click="removeFamilyRow(addFamilyMemberRow.arrIndex)">
                    <i class="fas fa-trash-alt"/>
                  </button>                                          
                </td>
              </tr>
            </table>
            <hr>
            <span class="card-title">
              <button 
                class="btn btn-default btn-outline-primary float-left" 
                type="button" onclick="saveFamily();" v-show="familyId == 0">
                Save Family Locally!
              </button>
                &nbsp;&nbsp;&nbsp;
            <span id="siteFamilyMessage"/>                        
            </span>
          </div>
        </div>
      </div>
    </div>    
    <div class="row clearfix">
      <div class="col-md-12">
        <br><br><br>
        <br><br><br>
      </div>
    </div>             
  </div>
</template>

<script>

const axios = require('axios');
import { serverBus } from '../main';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'BuildFamily',
  data: function() {
    return {
        //familyName:'',
        familyName: '',
        familyId: 0,
        memberName:'',
        memberId: 0,
        isParent:'',
        editArrIndex:0,
        isEdit: false,
        returnId: [],
        returnUpdated: '',
        addFamilyRowIndex:0,
        addFamilyRowArray:[]
    };
  },
  computed: {
    ...mapGetters([
      'getFamilyName',
      'getFamilyId'
    ])
  },  
  watch: {
    getFamilyName (newName, oldName) {
      this.familyName = newName;
    },
    getFamilyId (newId, oldId) {
      this.familyId = newId;
    }    
  },  
  created: function() {
    // Using the service bus
      serverBus.$on('addFamilyRowArray', (addFamilyRowArray) => {
          this.addFamilyRowArray = addFamilyRowArray;
          serverBus.$emit('familyArr', this.addFamilyRowArray); 
          this.addFamilyRowIndex = this.addFamilyRowArray.length;
      });            
  },

   methods: {
        addFamilyMemberRow: function(){
            var vm = this;
            try{
              var addFamilyMemberRowObj;
              if(vm.isEdit === false){
                axios
                  .get("http://localhost:5000/addMember?familyId="+ vm.familyId+"&memberName="+vm.memberName+"&isAdmin="+vm.isParent)
                  .then(response => (vm.returnId = response.data))
                  //.then(() => console.log(vm.returnId["Data"][0].id))
                  .then(() => (vm.memberId =  vm.returnId["Data"][0].id))
                  .then(() => (vm.addFamilyRowIndex = vm.addFamilyRowIndex + 1))
                  //.then(() => console.log(vm.memberId))
                  .then(() =>(
                      addFamilyMemberRowObj = {
                      arrIndex: vm.addFamilyRowIndex,
                      familyId: vm.familyId,
                      familyName: vm.familyName,
                      familyMemberName: vm.memberName,
                      memberId: vm.memberId,
                      isParent: vm.isParent},
                      vm.addFamilyRowArray.push(addFamilyMemberRowObj)
                      ))
                  .then(() => (vm.memberName = "",
                               vm.memberId = 0
                               ,vm.isParent = false
                  ))
                  .then(() =>(serverBus.$emit('familyArr', vm.addFamilyRowArray)));  
              }else{
                axios
                  .get("http://localhost:5000/updateMember?memberId="+ vm.memberId+"&memberName="+vm.memberName+"&isAdmin="+vm.isParent)
                  .then(response => (vm.returnUpdated = response.data))
                  .then(() => (
                    vm.addFamilyRowArray[vm.editArrIndex].familyName = vm.familyName,
                    vm.addFamilyRowArray[vm.editArrIndex].familyId = vm.familyId,
                    vm.addFamilyRowArray[vm.editArrIndex].familyMemberName = vm.memberName,
                    vm.addFamilyRowArray[vm.editArrIndex].memberId = vm.memberId,
                    vm.addFamilyRowArray[vm.editArrIndex].isParent = vm.isParent,
                    vm.isEdit = false, 
                    vm.editArrIndex = 0,
                    vm.isEdit = false,
                    vm.editArrIndex = 0,
                    vm.memberName = "",
                    vm.memberId = 0,
                    vm.isParent = false                  
                    ))
                  .then(() => (serverBus.$emit('familyArr', vm.addFamilyRowArray))); 
              }
              vm.$refs.memberName.focus();
            }catch(err) {
              console.log(err);
            }
        },
        editFamilyMemberRow: function(arrIndex){
            var vm = this;
            vm.isEdit = true;
            vm.editArrIndex = arrIndex;

            var memberObj = vm.addFamilyRowArray.find(item => item.arrIndex === arrIndex);
            vm.familyName = memberObj.familyName;
            vm.memberName = memberObj.familyMemberName;
            vm.memberId = memberObj.memberId;
            vm.isParent = memberObj.isParent;
        },
        removeFamilyRow: function(arrIndex){
            var vm = this;
            vm.addFamilyRowArray = vm.addFamilyRowArray.filter((item) => item.arrIndex !== arrIndex);
            serverBus.$emit('familyArr', vm.addFamilyRowArray);
      },        

  }
}
</script>   