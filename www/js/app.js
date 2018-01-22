// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app=angular.module('starter', ['ionic', 'starter.controllers'])

app.run(function($ionicPlatform,$ionicLoading,$rootScope) {
  $ionicPlatform.ready(function() {
    window.plugins.OneSignal
    .startInit("22396f1c-225a-4996-b617-0a7de7a8b46c")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
     window.plugins.OneSignal.getIds(function(ids) {
  
//console.log('getIds: ' + JSON.stringify(ids));
//console.log("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
   console.log("user id"+ids.userId)
   alert("User id" +ids.userId);
   $rootScope.noteId=ids.userId;

    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
    console.log("User accepted notifications: " + accepted);
    alert("notifications" + accepted);
    var notificationObj = { contents: {en: "message body"},
                          include_player_ids: '02d8a41d-898f-4187-8c75-d81dc0072796'  };
    window.plugins.OneSignal.postNotification(notificationObj,
          function(successResponse)
          { console.log("Notification Post Success:", successResponse);
          },
    function (failedResponse) 
          { console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
  );
});

});


    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      document.addEventListener('deviceready', function() {
        var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();
              
        $rootScope.$on                                                                                                                                                                                                     ('$cordovaNetwork:offline', function(event, networkState){
            var offlineState = networkState;
            showAlert.showAlert("Warning","Please connect to internet").then(function() {})     
        });   
    });


    
  });
  $rootScope.showLoad = function () {
          $ionicLoading.show({
              template: '<p>Please Wait Loading...</p><ion-spinner icon="ios-small" class="spinner-balanced"></ion-spinner>',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
          });
    };
    $rootScope.hideLoad = function () {
      $ionicLoading.hide();
    };
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
    .state('app.signup', {
    url: '/signup',
    //cache: false,
    views:{
      'menuContent': {
      templateUrl: 'templates/signup.html',
      controller: 'SignUpCtrl'
      }
    }
  })

  .state('app.timer', {
    url: '/timer',
    views: {
      'menuContent': {
        templateUrl: 'templates/timer.html',
        controller :'TimerCtrl'
      }
    }
  })
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
