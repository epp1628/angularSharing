// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'companies' service
angular.module('companies').factory('Companies', ['$resource', function($resource) {
	// Use the '$resource' service to return an company '$resource' object
    return $resource('/api/admin/companies/:companyId', {
        companyId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);