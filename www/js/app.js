
angular.module('mindmeteo', ['ionic', 'ionic.service.core', 'LocalStorageModule', 'dashboard', 'guest'])

.config(['$stateProvider',
         'localStorageServiceProvider',
         '$urlRouterProvider',
         '$ionicAppProvider', function($stateProvider, localStorageServiceProvider, $urlRouterProvider, $ionicAppProvider) {

    //Ionic app config
    $ionicAppProvider.identify({
        app_id: '1167016d',
        api_key: 'cae419de70fc9fbf4e9bb89e31287f18c5ec3502ee2d4723',
        // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
        // gcm_id: 'YOUR_GCM_ID'
    });

    $stateProvider

    .state('guest', {
        url: '/',
        templateUrl: 'templates/guest.html',
        controller: 'mguestCtrl'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'mnewSessionCtrl'
    })

    /*.state('guest.register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'mguestRegCtrl'
    })*/

    .state('mind', {
        url: '/mind',
        abstract: true,
        templateUrl: 'templates/dashboard.html'
    })

    .state('mind.climate', {
        url: '/climate',
        views: {
          'dash-climate': {
            templateUrl: 'templates/dash-climate.html',
            controller: 'dashClimateCtrl'
          }
        }
    })

    .state('mind.reports', {
        url: '/reports',
        views: {
          'dash-reports': {
            templateUrl: 'templates/dash-reports.html',
            controller: 'dashReportsCtrl'
          }
        }
    })

    $urlRouterProvider.otherwise('/');

    localStorageServiceProvider
        .setStorageType('sessionStorage')
        .setPrefix('mindmeteo')
        .setNotify(true, true);

}])

.run(['$ionicPlatform', '$http', function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        $http.get('/csrfToken').success(function(data){
            $http.defaults.headers.common['x-csrf-token'] = data._csrf;
        });
    });
}]);