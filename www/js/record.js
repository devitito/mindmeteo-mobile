

angular.module('record', ['ngResource', 'session'])
.factory('recordsFactory', ['$resource', '$q', 'backendUrl', '$q', '$timeout',
	function($resource, $q, backendUrl, $q, $timeout){
	var factory = {};
	var resource = $resource(backendUrl+'/record/:id', {id:'@id'}, {
		saveBulk: {method: 'POST', url: backendUrl+'/record/saveBulk'}
	});

	factory.save = function (mindid, delay) {
      return $q(function(resolve, reject) {
        var q = [];

        if (!angular.isUndefined(delay))
          q.push($timeout(function() {}, delay));

        q.push(resource.saveBulk({}, {records: factory.records}).$promise);

        $q.all(q).then(function (success) {
          //Release mem
          factory.records = [];
          resolve(success);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    factory.records = [];

	return factory;
}]);
