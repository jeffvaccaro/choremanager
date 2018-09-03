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
                <form role="form">
                    <div class="form-group text-left">
                        <label for="inputChore">Chore</label>
                        <select class="form-control" id="inputChore">
                            <option v-for="chores in chores.Data" :key="chores.ChoreId">{{chores.ChoreName}}</option>
                        </select>
                    </div>

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputFrequency">Days</label>
                        </div>                             
                        <select class="form-control" id="inputFrequency" v-model="frequencyVal" v-on:change="toggleRepeat(frequencyVal)">
                            <option disabled value="">Select one</option>
                            <option v-for="days in frequency.Data" :key="days.DayId">{{days.Day}}</option>
                        </select>
                        <!-- <div class="input-group-append">&nbsp;&nbsp;&nbsp;</div> -->
                        <div class="input-group-append">
                            <label class="input-group-text" for="chkRepeat">Repeat</label>
                        </div>
                        <input class="form-control col-md-1" type="checkbox" id="chkRepeat" :disabled=enableDisable />
                        <div class="input-group-append">
                            <label class="input-group-text"  for="inputAllowance">Allowance</label>
                        </div>
                        <select class="form-control col-md-2" id="inputAllowance">
                            <option v-for="aVal in allowance.Data" :key="aVal.AllowanceId" placeholder="Chore Value">{{aVal.AllowanceValue}}</option>
                        </select>
                    </div>
                    <br/>
                    
                    
                    <button class='btn btn-default float-right'>
                        <i class="fas fa-plus-square fa-2x align-middle" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp;<span class="align-middle">Add Chore</span>
                    </button>
                    <!-- <button class="btn btn-default float-right" type="button" onclick="addChoreRow();">Submit</button> -->
                </form>
            </div>
            <div class="col-md-6 column">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title text-left">
                            Chores
                        </h4>
                        <table class="table table-striped" id="tblChores">
                            <tr>
                                <th>Name</th>
                                <th>Frequency</th>
                                <th>Allowance</th>
                                <th>Remove</th>
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
  data: function() {
    return {
      allowance: [],
      frequency: [],
      chores:[],
      frequencyVal: '',
      allowanceVal: '',
      choreVal: '',
      enableDisable: true
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
      toggleRepeat: function(val){
          var vm = this;
        if(val != "Daily"){
            vm.enableDisable = false;
        }else{
            vm.enableDisable = true;
        }
      }
   }
};
</script>