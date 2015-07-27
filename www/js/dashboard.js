

angular.module('dashboard', ['report', 'emocicones', 'stats', 'climate', 'googlechart', 'helper'])
.controller('dashClimateCtrl', [
  '$scope',
  'statsFactory',
  'climateChartHelper',
  'identity',
  '$timeout',
  '$state',
  function($scope, statsFactory, climateChartHelper, identity, $timeout, $state) {
    statsFactory.climate(identity.name).then(function (climate) {
      climateChartHelper.load($scope, climate);
    }).catch(function (error) {
      $scope.showError(error);
    });

    $scope.showError = function (error) {
      $scope.error = error;
      $timeout(function() {
        $scope.error = undefined;
      }, 5000);
    };

    $scope.record = function() {
      $state.go('record');
    };
}])
.controller('dashReportsCtrl', ['$scope', 'statements', 'reportCategories', 'emociconeService', function($scope, statements, reportCategories, emociconeService) {
  $scope.statements = statements.data;

  $scope.getImgByCategory = function (category) {
    var img = reportCategories.img(category);
    return img;
  };

  $scope.getEmocicone = function (range) {
    var img = emociconeService.range2img(range);
    return img;
  };
}]);
