   <template>
    <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="registerModalLabel">Chore Manager Registration</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                If you would like to create an account, please select the "Yes" button below.  This will allow you to save your family and assigned chores. 
                <br/><br/>
                Otherwise to continue as a guest select the "Guest" button. <br/><br/>
                <hr/>
                <div class="form-group text-left">
                <h4><label for="txtfamilyName">Family Name</label></h4>
                <input 
                    class="form-control" 
                    id="txtfamilyName" 
                    type="text" v-model="familyName" autofocus>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Guest</button>
                <button type="button" class="btn btn-primary" v-on:click="registerAccount()">Register</button>
            </div>
            <span id="resultElement"></span>
            </div>
        </div>
    </div>
</template>

<script>

$('body').on('shown.bs.modal', '.modal', function () {
  $('[id$=txtfamilyName]').focus();
})

const axios = require('axios');
import { serverBus } from "../main";   
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
//import $ from 'jquery';

export default {
  name: 'Modal',
  computed: {
    ...mapGetters([
      'getFamilyName',
      'getFamilyId',
      'getMemberName'
    ]),
  },  
  data: function() {
    return {
      fbEmail: '',
      fbID: '',
      fbName: '',
      
      familyId: '',
      familyName: '',
      familyAdminId: '',
      registrationObj: [],
      familyObj: [],
      addFamilyRowIndex:0,
      addFamilyRowArray:[]      
    };
  },
  created: function() {
      this.loadFBData();
  },
  watch: {
    fbEmail: function() {
      var vm = this;
      vm.showModal();
    },
    familyAdminId: function(){
        var vm = this;
        //alert(vm.familyAdminId["Data"]);
        if(vm.familyAdminId["Data"] == -999){
            $('#registerModal').modal('toggle');
        }else{
          vm.getFamilyData();
        }
    },
    familyObj: function(){
      var vm = this;
      
       vm.familyId = vm.familyObj["Data"][0].FamilyId;
       vm.familyName = vm.familyObj["Data"][0].FamilyName;
       serverBus.$emit("familyId", vm.familyId);
       serverBus.$emit("familyName", vm.familyName);

      for(var i = 0; i <= vm.familyObj["Data"].length-1;i++){
        var addFamilyMemberRowObj = {
            arrIndex: i,
            familyName: vm.familyObj["Data"][i].FamilyName,
            familyId: vm.familyId,
            familyMemberName: vm.familyObj["Data"][i].MemberName,
            memberId: vm.familyObj["Data"][i].MemberId,
            isParent: vm.familyObj["Data"][i].isAdmin
        }
        vm.addFamilyRowArray.push(addFamilyMemberRowObj);
      }
      serverBus.$emit("addFamilyRowArray", vm.addFamilyRowArray);
    },
    familyName: function(){
      this.setFamilyName(this.familyName);
    },
    familyId: function(){
      this.setFamilyId(this.familyId);
    },
    registrationObj: function(){
      var vm = this;
      //console.log('FamilyAdminId is : ' + vm.registrationObj["Data"].FamilyAdminId);
      vm.familyAdminId["Data"] = vm.registrationObj["Data"].FamilyAdminId;
      this.setFamilyId(vm.registrationObj["Data"].FamilyAdminId);
    }
  },
  methods: {
    ...mapMutations(['SET_FAMILY_NAME']),
    ...mapMutations(['SET_FAMILY_ID']),
    ...mapMutations(['SET_MEMBER_NAME']),
    ...mapActions(['setFamilyName']),
    ...mapActions(['setFamilyId']),
    ...mapActions(['setMemberName']),  

    showModal() {
      var vm = this;
      axios
        .get("http://localhost:5000/hasLogin?id="+ vm.fbID)
        .then(response => (vm.familyAdminId = response.data));    
    },
    getFamilyData: function(){
      var vm = this;

      axios
        .get("http://localhost:5000/getFamily?id="+ vm.familyAdminId["Data"])
        .then(response => (vm.familyObj = response.data))
        .then(this.setMemberName(this.fbName));
    },      
    registerAccount: function() {
      var vm = this;
      axios
        .get("http://localhost:5000/addRegistration?id="+ vm.fbID + "&email=" + vm.fbEmail + "&familyName=" + vm.familyName + "&memberName=" + vm.fbName)
        .then(response => (vm.registrationObj = response.data))
        .then($('#registerModal').modal('toggle'))
        .then(this.setFamilyName(this.familyName),this.setMemberName(this.fbName));
        
        
        vm.familyAdminId["Data"] = '';
    },
    loadFBData: function(){
        var vm = this;

        // This is called with the results from from FB.getLoginStatus().
        function statusChangeCallback(response) {
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            testAPI();
          } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
              'into this app.';
          }
        }
      
        function checkLoginState() {
          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });
        }
      
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '348410512562337',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.1'
          });
      
          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });
      
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=348410512562337&autoLogAppEvents=1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Here we run a very simple test of the Graph API after login is
        // successful.  See statusChangeCallback() for when this call is made.
        function testAPI() {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', { locale: 'en_US', fields: 'id,name, email' }, function(response) {
            console.log('Successful login for: ' + response.name + ' email : ' + response.email + " ID : " + response.id);
            document.getElementById('status').innerHTML =
              'Thanks for logging in, ' + response.name + '!';
              
              vm.fbEmail = response.email;
              vm.fbID = response.id;
              vm.fbName = response.name;
          });
        }
    }
  }
}
</script>     