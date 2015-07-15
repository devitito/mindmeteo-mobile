
angular.module('mindmeteo', ['ionic', 'LocalStorageModule'])

.config(['$stateProvider', 'localStorageServiceProvider', '$urlRouterProvider', function($stateProvider, localStorageServiceProvider, $urlRouterProvider) {

    $stateProvider
    .state('index', {
        url: '/',
        template: '<h1>Mindmeteo</h1>'
    });

    $urlRouterProvider.otherwise('/');

    localStorageServiceProvider
        .setStorageType('sessionStorage')
        .setPrefix('mindmeteo')
        .setNotify(true, true);

}])

.run(['$ionicPlatform', '$http', function($ionicPlatform, $http) {
    $ionicPlatform.ready(function() {
        $http.get('http://localhost:1337/csrfToken').success(function(data){
            $http.defaults.headers.common['x-csrf-token'] = data._csrf;
        });
    });
}]);
