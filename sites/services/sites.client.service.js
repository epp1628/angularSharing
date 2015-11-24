// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'sites' service
angular.module('sites').factory('Sites', ['$resource', function($resource) {
	// Use the '$resource' service to return a site '$resource' object
    return $resource('/api/admin/sites/:siteId', {
        siteId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);