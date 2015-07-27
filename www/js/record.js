

angular.module('record', ['ngResource', 'session'])
.factory('recordsFactory', ['$resource', '$q', 'backendUrl',
	function($resource, $q, backendUrl){
	var factory = {};
	var resource = $resource(backendUrl+'/record/:id', {id:'@id'}, {
		saveBulk: {method: 'POST', url: backendUrl+'/record/saveBulk'}
	});

	factory.save = function (mindid, records) {
		var deferred = $q.defer();
		resource.saveBulk({}, {records: records}).$promise
		.then(function (success) {
			deferred.resolve(success);
		})
		.catch(function (error) {
			deferred.reject(error);
		});
		//deferred.resolve('ok');
		return deferred.promise;
	}

	return factory;
}]);
