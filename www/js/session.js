
angular.module('session', ['ngResource', 'angularMoment', 'LocalStorageModule', 'ionic'])
  .factory('identityService', ['$resource', '$rootScope', '$q', 'moment', 'localStorageService',
  function($resource, $rootScope, $q, moment, localStorageService){
	var factory = {};
	//var cache = $cacheFactory('identity');

	$rootScope.$on("mind.post.edit", function(event, args) {
		//Remove current identity from cache if it was modified
		if (args.id == factory.getId()) {
			//cache.removeAll();
			factory.set(args);
		}
	});

	factory.getId = function () {
		var localid = localStorageService.get('identity');
		if (localid) return localStorageService.get('identity').id;
		else return null;
	};

	factory.get = function () {
		var deferred = $q.defer();
		var localid = localStorageService.get('identity');
		if (localid) {
			moment.locale(localid.locale);
			deferred.resolve(localid);
		}
		else
          deferred.reject('An error occured while retreiving the identity');

		return deferred.promise;
	};

	factory.set = function(data) {
		localStorageService.set('identity', data);
		moment.locale(data.locale);
	};

	factory.remove = function () {
		localStorageService.remove('identity');
	};

	factory.isSelf = function (id) {
		if (id == factory.getId())
			return true;
		else
			return false;
	};

	return factory;
}])
  .factory('sessionFactory', ['$resource', '$q', '$http', 'identityService', 'backendUrl', function($resource, $q, $http, identityService, backendUrl){
	var factory = {};

	var resource = $resource('/session', {}, {
		create: {method:'POST', url: backendUrl+'/session/create'},
		destroy: {method: 'GET', url: backendUrl+'/session/destroy'},
        fetch: {method: 'GET', url: backendUrl+'/session/fetch'}
	});

	factory.create = function (credentials) {
		var deferred = $q.defer();

		resource.create({}, credentials).$promise
		.then(function(success) {
			identityService.set(success);
			deferred.resolve(success);
		})
		.catch(function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	factory.destroy = function () {
		var deferred = $q.defer();

		resource.destroy().$promise
		.then(function(success) {
          identityService.remove();
          $http.get('/csrfToken').success(function(data){
            $http.defaults.headers.common['x-csrf-token'] = data._csrf;
            deferred.resolve();
    	 }).error(function(data) {
            deferred.resolve(data);
          });
		})
		.catch(function (error) {
			deferred.reject(error);
		});

		return deferred.promise;
	};

	return factory;
}])
.factory('backendUrl', [function() {
    if(ionic.Platform.isWebView())
        return 'https://mindmeteo.net';
    else
        return '';

}]);
