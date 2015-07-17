

angular.module('dashboard', ['statement'])
.controller('dashClimateCtrl', ['$scope', function($scope) {
}])
.controller('dashReportsCtrl', ['$scope', 'statementsFactory', 'identityService', function($scope, statementsFactory, identityService) {
    identityService.get().then(function(mind) {
        return statementsFactory.get({id: mind.id}).$promise;
    }).then(function(statements) {
        $scope.statements = statements;
    });
}]);
