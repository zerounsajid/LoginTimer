var url="http://sitepro.shreewebs.com/Abhilasha/login-webservice/webservice.php?function="
var app=angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$ionicPopup,$state) {


  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

$scope.logout = function() {
    $rootScope.hideLoad();
      $ionicPopup.confirm({
          title: 'System warning',
          cssClass:'myPopup',
          template: 'Are you sure you want to logout?'
        }).then(function(res) {
          if (res) {
               /* sessServ.remove("SESS_UserEmail");
                sessServ.clear();*/
                $state.go("app.login");
          }
        })         
  } 
    
  });

app.controller('LoginCtrl', function($scope,$http,$state,$rootScope) {

$scope.data ={
    username:"",
    password:""  
  };     
      $scope.signup1 = function() {
     $state.go('app.signup');
       };
  $scope.loginData={};

  $scope.doLogin = function() {
   
      if(!$scope.loginData.username && !$scope.loginData.password){


      //alert("a");
        alert("please enter username and password");
        return;

       // $state.go('app.browse');
      }
      if(!$scope.loginData.username){
        alert("please enter username");
        return;
      }

       if(!$scope.loginData.password){
        alert("please enter password");
        return;
      }    
      else{
        $rootScope.showLoad();
      $http({
                    method: "GET",
                    url:url+"login&email="+$scope.loginData.username+"&password="+$scope.loginData.password
                  }).then(function(response){
          
                    console.log("sign res"+JSON.stringify(response.data))
                    if(response.data.result=="failure"){
                        alert("Invalid username or password");
                        $rootScope.hideLoad();
                        //showAlert.showAlert("Failure","Invalid Credentials").then(function() {
                        //});
                    }
                    else if(response.data.result=="Success"){
      
                       // alert("Success");
                        $rootScope.hideLoad();
                        $state.go('app.timer');
                        
                    }
                    else{
                            alert("some error");//$rootScope.hideLoad();
                            $rootScope.hideLoad();
                            }
                    
                    }, function(error){ 
                      alert("Connection to server is failing, please try again after some time")
                      //  $rootScope.hideLoad();
                    }); 
      
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
   }
  }

  });  
 
app.controller('SignUpCtrl', function($scope,$http,$state) {
    $scope.data ={
    fname:"",
    lname:"",
    pass:"",
    email:"",
    num:""
  };          


$scope.setime1 = function() {
    $scope.data ={
      fname:"",
      lname:"",
      pass:"",
      email:"",
      num:""
    };
  }

   $scope.signup = function() {
   // alert("inside signup");

    if(!$scope.data.fname){
        alert("Enter Firstname");
        return;
      }

       if(!$scope.data.lname){
        alert("Enter Lastname");
        return;
      }    

       if(!$scope.data.email){
        alert("Enter Email");
        return;
      }    
       if(!$scope.data.phone){
        alert("Enter Phone Number");
        return;
      }    
       if(!$scope.data.pass){
        alert("Enter Password");
        return;
      }    
       if(!$scope.data.cpass){
        alert("Enter Confirm Password ");
        return;
      }    
      else {
          $scope.showLoad();
          $http({
                  method: "GET",
                  url:url+"sign-up&fname="+$scope.data.fname+"&lname="+$scope.data.lname+"&email="+$scope.data.email+"&mob="+$scope.data.phone+"&pswd="+$scope.data.pass+"&cpswd="+$scope.data.cpass
                }).then(function(response){
                  console.log("sign res"+JSON.stringify(response.data))
                 
                        if(response.data.result=="failure"){
                          console.log(response.data);
                          $scope.hideLoad();
                          alert(response.data.message);
                          return;
                         
                        }
                        
                        if(response.data.result1=="failure1"){
                          console.log(response.data);
                          $scope.hideLoad();
                          alert(response.data.message1);
                          return;
                         
                        }
                      
                       if($scope.data.pass!=$scope.data.cpass)
                           {
                                  $scope.hideLoad();
                                  alert("Password Do not match");
                    //$state.go('app.signup1');
                  }
                        if(response.data.result=="Success"){
                         $scope.hideLoad();
                          alert("success");
                                  $scope.data ={
                                  fname:"",
                                  lname:"",
                                  email:"",
                                  phone:"",
                                  pass:"",
                                  cpass:""
                              };
                              $state.go('app.timer'); 
                           // });
                        }
                        else{
                          $scope.hideLoad();
                         }
                  
                  }, function(error){ 
                     $scope.hideLoad();
                    alert("Connection to server is failing, please try again after some time")
                     // $rootScope.hideLoad();
                  });
          
      }
  };

});

app.controller('TimerCtrl', function($scope,$http,$state,$timeout,$rootScope,$ionicPopup) {

  // When button is clicked, the popup will be shown...
  // $scope.start = function() {
      $scope.data = {}
    
      // Custom popup
      

  var $time;
 
  $scope.mytimer={};
      $scope.mytimer.second=0;
      $scope.mytimer.minute=0;
      $scope.mytimerfixed = 0;
      $scope.radius = 100;
       var timervariable ;

      $scope.mycustomtimer =function() {
        $scope.mytimer.second--;
        if($scope.mytimer.second == -1)
        {  
          $scope.mytimer.minute--;
          $scope.mytimer.second=59;
        }
        if($scope.mytimer.minute === -1)
        { 
             $scope.mytimer.second=0; 
             $scope.mytimer.minute=0;
              //alert('Time up');
             window.plugins.OneSignal.getIds(function(ids) {
  var notificationObj = { contents: {en: "Timer has Stoped  "},
  include_player_ids: ["892bc9e9-8061-4c68-80bc-9cb890cfb1c6"]};
  window.plugins.OneSignal.postNotification(notificationObj,
    function(successResponse) {
      console.log("Notification Post Success:", successResponse);
    },
    function (failedResponse) {
      console.log("Notification Post Failed: ", failedResponse);
      
    }
  );
});

             return;

        }
          else
              $scope.mytimer.second-1;
         timervariable = $timeout($scope.mycustomtimer, 1000);  
      }

    $scope.start =function() {
            timervariable = $timeout($scope.mycustomtimer, 1000);
             $scope.first = false;
             $scope.started=true; 
        };

$scope.start1 =function() {
            timervariable = $timeout($scope.mycustomtimer, 1000);
             $scope.first = false;
             $scope.started=true;
              window.plugins.OneSignal.getIds(function(ids) {
  var notificationObj = { contents: {en: "Timer started "},
  include_player_ids: ["892bc9e9-8061-4c68-80bc-9cb890cfb1c6"]};
  window.plugins.OneSignal.postNotification(notificationObj,
    function(successResponse) {
      console.log("Notification Post Success:", successResponse);
    },
    function (failedResponse) {
      console.log("Notification Post Failed: ", failedResponse);
      //alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
    }
  );
});

           };

    $scope.stop =function()  {
             $scope.mytimer.second=0;
             $scope.mytimer.minute=0;
              $timeout.cancel(timervariable);
             complete(true);

        };


        var complete =function(forcefulabort)
           {
             if(forcefulabort) 
                {
                 //alert('You stopped the timer ');        
                }  
              else 
                  {
                  alert('Timer completed!');
                 }    
                 
                // $scope.mytimer.stopbtn=true; 
          }

          $scope.setime=function() {
           
            //var a=mytimer.value;
            $timeout.cancel(timervariable);
            complete(true);

                  $scope.mytimer.second=0;
                  $scope.mytimer.minute=0;

                   var myPopup = $ionicPopup.show({
         template: '<input type = "number" ng-model = "data.model" placeholder="Number.*" style="width: 50%;text-align: center;margin-left: 25%;border-radius: 18px;">',
         title: 'Specify Time',
         subTitle: 'in Minutes',
         scope: $scope,  
         buttons: [
            { text: 'Cancel',
    type: 'button-default',
    onTap: function(e) {
      // e.preventDefault() will stop the popup from closing when tapped.
      return res=0;
    }
  }, 
            {text: '<b>Ok</b>',
              type: 'button-assertive',
              onTap: function(e)
                {
                  if (!$scope.data.model) 
                    {
                      //don't allow the user to close unless he enters model...
                      e.preventDefault();
                    } else 
                    {
                         /*$scope.mytimer.second=0;
                         $scope.mytimer.minute=0;*/
                        $scope.unit = true; 
                        $scope.first = true;
                        $scope.paused=false;
                        $scope.started = false;
                        $scope.d=false; 
                      return $scope.data.model;
                    }
                }
            }
         ]
      });

      myPopup.then(function(res) {
        if($scope.res!==0)
        {
          $scope.mytimer.minute=res;

        }
        else{
           return $scope.res;
                 
     
        }
     
         console.log('Tapped!', res);
      });

     

     // $scope.started = false;
      
 };

       $scope.pause =function()  {
          $scope.started = false;
          $scope.paused = true;
          $timeout.cancel(timervariable);
            complete(true);
           };


 });
