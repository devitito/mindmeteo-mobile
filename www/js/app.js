
angular.module('mindmeteo', ['ionic', 'ionic.service.core', 'LocalStorageModule', 'dashboard'])

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
    .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        templateUrl: 'templates/dashboard.html'
    })

    .state('dashboard.climate', {
        url: '/climate',
        views: {
          'dash-climate': {
            templateUrl: 'templates/dash-climate.html',
            controller: 'dashClimateCtrl'
          }
        }
    })

    .state('dashboard.reports', {
        url: '/reports',
        views: {
          'dash-reports': {
            templateUrl: 'templates/dash-reports.html',
            controller: 'dashReportsCtrl'
          }
        }
    })

    /*.state('dashboard.profile', {
        url: '/profile',
        views: {
          'dash-profile': {
            templateUrl: 'templates/dash-profile.html',
            controller: 'dashProfileCtrl'
          }
        }
    });*/

    $urlRouterProvider.otherwise('/dashboard/climate');

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
