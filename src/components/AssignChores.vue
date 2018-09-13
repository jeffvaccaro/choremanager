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
                                        <a name="assign"><img src="../assets/select_edited-150.png" /></a>
                                    </span>
                                    Assign the Chores!
                                </h2>
                                <h3>This is Step 3!  This is the final step before the Calendar gets generated.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="row clearfix" id="choreAssignments"></div>
        <div class="row clearfix">
            <div class="col-md-4 column" v-for="choreItem in choresArr" :key="choreItem.arrIndex">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group text-left">
                            <h4>{{choreItem.choreName}}</h4>
                            <button class='btn btn-default btn-outline-primary float-left' type="button">{{choreItem.dayName}} <i v-show="choreItem.isRepeat === true" class="fas fa-redo-alt"></i></button>
                            <br/><br/><br/>
                        </div>
                        <div class="input-group" v-for="familyMember in familyArr" :key="familyMember.arrIndex">
                            <div class="input-group-prepend">
                                <h5><label class="input-group-text" for="chkAssign">Assign to:</label></h5>
                            </div>
                            <input type='text' class="form-control" id='memberName' disabled=true v-bind:value="familyMember.familyMemberName">
                            <input type='checkbox' class="form-control">
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
  }
 },
 created() {
  // Using the service bus
  serverBus.$on('choresArr', (choresArr) => {
   this.choresArr = choresArr;
  });
   serverBus.$on('familyArr', (familyArr) => {
   this.familyArr = familyArr.filter((item)=>item.isParent!==true);
  }); 
 }
}
</script>