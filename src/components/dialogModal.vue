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
                <h4><label for="familyName">Family Name</label></h4>
                <input 
                    class="form-control" 
                    id="familyName" 
                    type="text" v-model="familyName">
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
const axios = require('axios');
    
export default {
  name: 'Modal',

  data: function() {
    return {
      fbEmail: '',
      fbID: '',
      familyName: '',
      familyId: '',
      logonFound: -999
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
    logonFound: function(){
        var vm = this;
        if(vm.logFound != -999){
            $('#registerModal').modal('toggle');
        }
    }
  },
  methods: {
    showModal() {
      var vm = this;

      axios
        .get("http://localhost:5000/hasLogin?id="+ vm.fbID)
        .then(response => (vm.logonFound = response.data[0]['rowcount']));    
     
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
          });
        }
    },
    getFBData: function(){
      var vm = this;
     
    },      
    registerAccount() {
      var vm = this;

      axios
        .get("http://localhost:5000/addRegistration?id="+ vm.fbID + "&email=" + vm.fbEmail + "&name=" + vm.familyName)
        .then(response => (this.familyId = response.data));    

      //$('#registerModal').modal('toggle');
    }
  }
}
</script>     