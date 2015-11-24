// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'sites' module routes
angular.module('sites').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/sites', {
			templateUrl: 'sites/views/list-sites.client.view.html'
		}).
		when('/sites/create', {
			templateUrl: 'sites/views/create-site.client.view.html'
		}).
		when('/sites/:siteId', {
			templateUrl: 'sites/views/view-site.client.view.html'
		}).
		when('/sites/:siteId/edit', {
			templateUrl: 'sites/views/edit-site.client.view.html'
		});
	}
]); 