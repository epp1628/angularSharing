// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'companies' module routes
angular.module('companies').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/companies', {
			templateUrl: 'companies/views/list-companies.client.view.html'
		}).
		when('/companies/create', {
			templateUrl: 'companies/views/create-company.client.view.html'
		}).
		when('/companies/:companyId', {
			templateUrl: 'companies/views/view-company.client.view.html'
		}).
		when('/companies/:companyId/edit', {
			templateUrl: 'companies/views/edit-company.client.view.html'
		});
	}
]); 