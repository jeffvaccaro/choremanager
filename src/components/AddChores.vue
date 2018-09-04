<template>
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-12 column">
                <br /><br /><br />
                <div class="row clearfix">
                    <div class="col-md-12 column">
                        <div class="jumbotron text-left">
                            <h2>
                                <span>
                                    <a name="chores"><img src="../assets/add-edited-100.png" /></a>
                                </span>
                                Add your Chores!
                            </h2>
                            <h3>This is step 2.  Once you have added your kids to your family, now you can add the chores for them to do!</h3>
                            <br/>
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
                                <select class="form-control" id="inputChore" v-model="choreValId">
                                    <option disabled value="">Select a Chore</option>
                                    <option v-for="chores in chores.Data" :key="chores.ChoreId" v-bind:value="chores.ChoreId">{{chores.ChoreName}}</option>
                                </select>
                            </div>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputFrequency">Days</label>
                                </div>                             
                                <select class="form-control col-sm-3" id="inputFrequency" v-model="frequencyValId" v-on:change="toggleRepeat()">
                                    <option disabled value="">Select</option>
                                    <option v-for="days in frequency.Data" :key="days.DayId" v-bind:value="days.DayId">{{days.Day}}</option>
                                </select>
                                <div class="input-group-append">
                                    <label class="input-group-text" for="chkRepeat">Repeat</label>
                                </div>
                                <input class="form-control col-sm-1" type="checkbox" id="chkRepeat" :disabled=enableDisable v-model="repeatable" />
                                <div class="input-group-append">
                                    <label class="input-group-text"  for="inputAllowance">Allowance</label>
                                </div>
                                <select class="form-control col-sm-3" id="inputAllowance" v-model="allowanceValId">
                                    <option disabled value="">Select</option>
                                    <option v-for="aVal in allowance.Data" :key="aVal.AllowanceId"  v-bind:value="aVal.AllowanceId">{{aVal.AllowanceValue}}</option>
                                </select>
                            </div>
                            <br/>
                            <button type="button" class='btn btn-default float-right' v-on:click="addChoreRow()">
                                <i class="fas fa-plus-square fa-2x align-middle" aria-hidden="true"></i>
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
                            Custom Chores:
                        </h4>
                        <table class="table table-striped" id="tblChores">
                            <tr>
                                <th>Name</th>
                                <th>Frequency</th>
                                <th>Allowance</th>
                                <th>Repeatable</th>
                                <th>Remove</th>
                            </tr>
                            <tr v-for="customChore in customChores" :key="customChore.choreId">
                                <td>{{customChore.choreName}}</td>
                                <td>{{customChore.dayName}}</td>
                                <td>{{customChore.allowanceValue}}</td>
                                <td v-if="customChore.isRepeat === true"><i class="fas fa-check"></i></td>
                                <td v-else-if="customChore.isRepeat === ''"><i class="fas fa-times"></i></td>
                                <td><i class="fas fa-trash-alt"></i></td>
                            </tr>
                        </table>
                        <hr/>
                        <span class="card-title">
                            <button class="btn btn-default float-left" type="button" onclick="saveChores();">Save Chores locally</button>&nbsp;&nbsp;&nbsp;<span id="siteChoresMessage"></span>
                        </span>
                    </div>                    
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-md-12">
                <br/><br/><br/>
                <br/><br/><br/>
            </div>
        </div>                      
    </div>
</template>
<script>
module.exports = {
  name: 'AddChores',
  data: function() {
    return {
      allowance: [],
      allowanceVal: '',
      allowanceValId: '',
      choreVal: '',
      chores:[],
      choreValId: '',
      customChores:[],
      enableDisable: true,
      frequency: [],
      frequencyVal: '',
      frequencyValId: '',
      repeatable: ''
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
      .get("http://localhost:5000/getChores")
      .then(response => (this.chores = response.data));      
  },
   methods: {
      toggleRepeat: function(){
          var vm = this;
          
          var frequencyObj = findObjectByKey(vm.frequency.Data, 'DayId', vm.frequencyValId);
          vm.frequencyVal = frequencyObj.Day;       

        if(vm.frequencyVal != "Daily"){
            vm.enableDisable = false;
        }else{
            vm.enableDisable = true;
            vm.repeatable = '';
        }
      },
      addChoreRow: function(){
          var vm = this;
          var choreObj = findObjectByKey(vm.chores.Data, 'ChoreId', vm.choreValId);
          vm.choreVal = choreObj.ChoreName;
          var frequencyObj = findObjectByKey(vm.frequency.Data, 'DayId', vm.frequencyValId);
          vm.frequencyVal = frequencyObj.Day;
          var allowanceObj = findObjectByKey(vm.allowance.Data, 'AllowanceId', vm.allowanceValId);
          vm.allowanceVal = allowanceObj.AllowanceValue;

          var customChoreObj = {
              choreId: vm.choreValId,
              choreName: vm.choreVal,
              dayId: vm.frequencyValId,
              dayName: vm.frequencyVal,
              isRepeat: vm.repeatable,
              allowanceId: vm.allowanceValId,
              allowanceValue: vm.allowanceVal
          }

          vm.customChores.push(customChoreObj);
      }
   },
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