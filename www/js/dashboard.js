

angular.module('dashboard', ['report', 'emocicones'])
.controller('dashClimateCtrl', ['$scope', function($scope) {
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
