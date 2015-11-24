// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'sites' controller
angular.module('sites').controller('SitesController', ['$scope', '$routeParams', '$location', 'Authentication','Companies', 'Sites',
    function($scope, $routeParams, $location, Authentication, Sites,Companies) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;
        $scope.MyCompanies = Companies.data;

        // Create a new controller method for creating new companies
        $scope.create = function() {
        	// Use the form fields to create a new site $resource object
            var site = new Sites({
                name: this.name,
                is_enabled:'true'
            });
            
    /*        var mcompany = new Companies({
                company_id : this._id,
                company_name : this.company_name
            }); */

            // Use the company '$save' method to send an appropriate POST request
            site.$save(function(response) {
            	// If an company was created successfully, redirect the user to the companies page 
                $location.path('sites/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of articles
        $scope.find = function() {
        	// Use the companies 'query' method to send an appropriate GET request
            $scope.sites = Sites.query();
        };

        // Create a new controller method for retrieving a single company
        $scope.findOne = function() {
        	// Use the article 'get' method to send an appropriate GET request
            $scope.site = Sites.get({
                siteId: $routeParams.siteId
            });
        };

        // Create a new controller method for updating a single company
        $scope.update = function() {
        	// Use the company '$update' method to send an appropriate PUT request
            $scope.site.$update(function() {
            	// If an company was updated successfully, redirect the user to the company's page 
                $location.path('sites/' + $scope.site._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single company
        $scope.delete = function(site) {
        	// If an company was sent to the method, delete it
            if (site) {
            	// Use the article '$remove' method to delete the article
                site.$remove(function() {
                	// Remove the article from the articles list
                    for (var i in $scope.sites) {
                        if ($scope.sites[i] === site) {
                            $scope.sites.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the article '$remove' method to delete the company
                $scope.site.$remove(function() {
                    $location.path('sites');
                });
            }
        };
    }
]);