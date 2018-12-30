<template>
  <div 
    class="container" 
    id="AddChores">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <br ><br ><br >
        <div class="row clearfix">
          <div class="col-md-12 column">
            <div class="jumbotron text-left">
              <h2>
                <span>
                  <a name="chores"><img src="../assets/add-edited-100.png" ></a>
                </span>
                Add your Chores!
              </h2>
              <h3>This is step 2.  Once you have added your kids to your family, now you can add the chores for them to do!</h3>
              <br>
              <h5>Coming Soon: More Chores, the ability to add your own custom chores, more frequencies and the option of Points (instead of Allowances)!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row clearfix">
      <div class="col-md-6 column">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group text-left">
                <h4><label for="inputChore">Chore List:</label></h4>
                <select 
                  class="form-control" 
                  id="inputChore" 
                  v-model="choreValId" 
                  @change="setDefaults()">
                  <option 
                    disabled 
                    value="" 
                    class="optionvue">Select a Chore</option>
                  <option 
                    v-for="chores in chores.Data" 
                    :key="chores.ChoreId" 
                    :value="chores.ChoreId" 
                    :disabled="dailyChoreCheck(chores.ChoreId)">{{ chores.ChoreName }}</option>
                </select>
                <br>
                <span v-show="choreValId === 99999">
                  <h6><label for="inputChore">Custom Chore:</label></h6>
                  <input 
                    type='text' 
                    class="form-control" 
                    id='customChore' 
                    v-model="customChoreValue" 
                    size="50">
                </span>
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <label 
                    class="input-group-text" 
                    for="inputFrequency">Days</label>
                </div>                             
                <select 
                  class="form-control col-sm-3" 
                  id="inputFrequency" 
                  v-model="frequencyValId" 
                  @change="toggleRepeat()">
                  <option 
                    disabled 
                    value="">Select</option>
                  <option 
                    v-for="days in frequency.Data" 
                    :key="days.DayId" 
                    :value="days.DayId">{{ days.Day }}</option>
                </select>
                <div class="input-group-append">
                  <label 
                    class="input-group-text" 
                    for="chkRepeat">Repeat</label>
                </div>
                <input 
                  class="form-control col-sm-1" 
                  type="checkbox" 
                  id="chkRepeat" 
                  :disabled=enableDisable 
                  v-model="repeatable" >
                <div class="input-group-append">
                  <label 
                    class="input-group-text" 
                    for="inputAllowance">Allowance</label>
                </div>
                <select 
                  class="form-control col-sm-3" 
                  id="inputAllowance" 
                  v-model="allowanceValId">
                  <option 
                    disabled 
                    value="">Select</option>
                  <option 
                    v-for="aVal in allowance.Data" 
                    :key="aVal.AllowanceId" 
                    :value="aVal.AllowanceId">{{ aVal.AllowanceValue }}</option>
                </select>
              </div>
              <br>
              <button 
                type="button" 
                class='btn btn-default btn-outline-primary float-right' 
                @click="addChoreRow()">
                <i 
                  class="fas fa-plus-square fa-2x align-middle" 
                  aria-hidden="true"/>
                &nbsp;&nbsp;&nbsp;<span class="align-middle">Add Chore</span>
              </button>
            </form>
          </div>
        </div>                
      </div>
      <div class="col-md-6 column">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-left">
              Chores for : {{familyName}}
            </h4>
            <table 
              class="table table-striped" 
              id="tblChores">
              <tr>
                <th>Name</th>
                <th>Frequency</th>
                <th>Allowance</th>
                <th>Repeatable</th>
                <th>Remove</th>
              </tr>
              <tr 
                v-for="addChoreRowItem in addChoreRowArray" 
                :key="addChoreRowItem.choreId">
                <td>{{ addChoreRowItem.choreName }}</td>
                <td>{{ addChoreRowItem.dayName }}</td>
                <td>{{ addChoreRowItem.allowanceValue }}</td>
                <td v-if="addChoreRowItem.isRepeat === true"><i class="fas fa-check fa-2x"/></td>
                <td v-else-if="addChoreRowItem.isRepeat === false"><i class="fas fa-times fa-2x"/></td>
                <td v-else><i class="fas fa-times fa-2x"/></td>
                <td>
                  <button 
                    type="button" 
                    class='btn btn-default btn-outline-primary' 
                    @click="removeChoreRow(addChoreRowItem.arrIndex,addChoreRowItem.familyChoreId)">
                    <i 
                      class="fas fa-trash-alt" 
                      aria-hidden="true"/>
                  </button>                                    
                </td>
              </tr>
            </table>
            <hr>
            <span class="card-title">
              <button 
                class='btn btn-default btn-outline-primary float-left' 
                type="button" 
                onclick="saveChores();" v-show="familyId == 0">Save Chores locally</button>&nbsp;&nbsp;&nbsp;<span id="siteChoresMessage"/>
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
import { serverBus } from "../main";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: "AddChores",
    data: function() {
        return {
            addChoreRowArray: [],
            addChoreRowIndex: 0,
            allowance: [],
            allowanceVal: "",
            allowanceValId: "",
            choreVal: "",
            chores: [],
            choreValId: "",

            customChoreValue: "",
            enableDisable: true,
            frequency: [],
            frequencyVal: "",
            frequencyValId: "",
            repeatable: "",
            familyName: "",
            familyId: 0,
            familyChoreId: 0,
            returnId: [],
            returnUpdated: '',
            rawChoreReturn: []
        };
  },
  created: function() {
    axios
      .get("http://localhost:5000/getAllowance")
      .then(response => (this.allowance = response.data));
    axios
      .get("http://localhost:5000/getDays")
      .then(response => (this.frequency = response.data));
    axios
      .get("http://localhost:5000/getChores?familyId=")
      .then(response => (this.chores = response.data));
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

    axios
      .get("http://localhost:5000/getChores?familyId="+this.familyId)
      .then(response => (this.chores = response.data));     

    axios
      .get("http://localhost:5000/getFamilyChores?familyId="+this.familyId)
      .then(response => (this.rawChoreReturn = response.data))
      .then(() => (this.addChoresFromDB()));         
    }
  },    
  methods: {
    toggleRepeat: function() {
        var vm = this;
        var frequencyObj = findObjectByKey(
            vm.frequency.Data,
            "DayId",
            vm.frequencyValId
        );
        vm.frequencyVal = frequencyObj.Day;

        if (vm.frequencyVal != "Daily") {
            vm.enableDisable = false;
        } else {
            vm.enableDisable = true;
            vm.repeatable = "";
        }
    },
    setDefaults: function() {
        var vm = this;
        if(vm.frequencyValId == ""){
            vm.frequencyValId = 1;
        }
        if(vm.allowanceValId == ""){
            vm.allowanceValId = 1;
        }
    },
    addChoreRow: function() {
        var vm = this;
        var addChoreRowObj;

        if (vm.customChoreValue === "") {
            var choreObj = findObjectByKey(vm.chores.Data,"ChoreId",vm.choreValId);
            vm.choreVal = choreObj.ChoreName;

            var frequencyObj = findObjectByKey(vm.frequency.Data,"DayId",vm.frequencyValId);
            vm.frequencyVal = frequencyObj.Day;

            var allowanceObj = findObjectByKey(vm.allowance.Data,"AllowanceId",vm.allowanceValId);
            vm.allowanceVal = allowanceObj.AllowanceValue;
        } else {
            vm.choreVal = vm.customChoreValue;
        }


        axios
          .get("http://localhost:5000/addFamilyChore?familyId="+ vm.familyId+"&choreId="+vm.choreValId+'&dayId='+vm.frequencyValId+'&allowanceId='+vm.allowanceValId+'&isRepeatable='+vm.repeatable)
          .then(response => (vm.returnId = response.data))
          .then(() => (vm.familyChoreId =  vm.returnId["Data"][0].id))
          .then(() => (vm.addChoreRowIndex = vm.addChoreRowIndex + 1))
          .then(() =>(
            addChoreRowObj = {
            arrIndex: vm.addChoreRowIndex,
            familyChoreId: familyChoreId,
            choreId: vm.choreValId,
            choreName: vm.choreVal,
            dayId: vm.frequencyValId,
            dayName: vm.frequencyVal,
            isRepeat: vm.repeatable,
            allowanceId: vm.allowanceValId,
            allowanceValue: vm.allowanceVal
            },
            vm.addChoreRowArray.push(addChoreRowObj)
          ))
          .then(() => (vm.customChoreValue = "",
                       vm.setDefaults()
          ))
          .then(() =>(serverBus.$emit("choresArr", vm.addChoreRowArray)));  


        // vm.addChoreRowIndex = vm.addChoreRowIndex + 1;

        // var addChoreRowObj = {
        //     arrIndex: vm.addChoreRowIndex,
        //     choreId: vm.choreValId,
        //     choreName: vm.choreVal,
        //     dayId: vm.frequencyValId,
        //     dayName: vm.frequencyVal,
        //     isRepeat: vm.repeatable,
        //     allowanceId: vm.allowanceValId,
        //     allowanceValue: vm.allowanceVal
        // };

        // vm.addChoreRowArray.push(addChoreRowObj);
        // vm.customChoreValue = "";

        // vm.setDefaults();
        
        // serverBus.$emit("choresArr", vm.addChoreRowArray);
    },
    addChoresFromDB: function(){
        var vm = this;
        vm.addChoreRowArray = vm.rawChoreReturn.Data;
        vm.setDefaults();
        serverBus.$emit("choresArr", vm.addChoreRowArray);
    },
    removeChoreRow: function(indexVal,familyChoreId) {
        var vm = this;
        axios
          .get("http://localhost:5000/removeChore?familyChoreId="+familyChoreId);         


        vm.addChoreRowArray = vm.addChoreRowArray.filter(
            item => item.arrIndex !== indexVal
        );
        serverBus.$emit("choresArr", vm.addChoreRowArray);
    },
    dailyChoreCheck: function(selectedChoreId) {
        var vm = this;
        if (vm.addChoreRowArray.length > 0) {
            var disabledItems = vm.addChoreRowArray.filter(function(item) {
                return item.choreId == selectedChoreId && item.dayName == "Daily";
            });

            if (disabledItems.length > 0) {
                return disabledItems;
            }
        }
    }
  }
};

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}
</script>