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
                                    <a name="build"><img src="../assets/addaccount-edited-100.png" /></a>
                                </span>
                                Build your Family!
                            </h2>
                            <h3>
                                Here is Step 1!  You can add or remove people to assign the chores to.  With the subscribed version you can add 
                                and save all of your kids as well as more features like sending them texts when new chores have been assigned!
                            </h3>
                            <br/>
                            <h5>Coming Soon: Text Message your childs chores to them for the week!</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-md-12">
                <br/><br/><br/>
            </div>
        </div> 

        <div class="row clearfix">
            <div class="col-md-6 column">
                <form role="form">
                    <div class="form-group text-left">
                        <label for="inputName">Name</label><input class="form-control" id="inputName" type="text"/>
                    </div>
                    <button class="btn btn-default float-right" type="button" onclick="addFamilyRow();">Add Family Member</button>
                </form>
            </div>
            <div class="col-md-6 column">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title text-left">
                            Family
                        </h4>
                        <table class="table table-striped card-text" id="tblFamily">
                            <tr id="row-family-id-0">
                                <th>Name</th>
                                <th>Cell Phone #</th>
                                <th align="center">Remove</th>
                            </tr>
                        </table>
                        <hr/>
                        <span class="card-title">
                        <button class="btn btn-default float-left" type="button" onclick="saveFamily();">Save Family Locally!</button>&nbsp;&nbsp;&nbsp;<span id="siteFamilyMessage"></span>                        
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
export default {
  name: 'Family',
  props: {
    msg: String
  }
}
</script>   