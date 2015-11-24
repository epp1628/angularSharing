// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'companies' controller
angular.module('companies').controller('CompaniesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Companies',
    function($scope, $routeParams, $location, Authentication, Companies) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new companies
        $scope.create = function() {
        	// Use the form fields to create a new company $resource object
            var company = new Companies({
                company_name: this.company_name,
                is_enabled: this.is_enabled,
                tin:this.tin,
                google_plus_url:this.google_plus_url,
                facebook_url:this.facebook_url,
                twitter_url:this.twitter_url,
                youtube_url:this.youtube_url,
                creator:this.creator
            });

            // Use the company '$save' method to send an appropriate POST request
            company.$save(function(response) {
            	// If an company was created successfully, redirect the user to the companies page 
                $location.path('companies/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of articles
        $scope.find = function() {
        	// Use the companies 'query' method to send an appropriate GET request
            $scope.companies = Companies.query();
        };

        // Create a new controller method for retrieving a single company
        $scope.findOne = function() {
        	// Use the article 'get' method to send an appropriate GET request
            $scope.company = Companies.get({
                companyId: $routeParams.companyId
            });
        };

        // Create a new controller method for updating a single company
        $scope.update = function() {
        	// Use the company '$update' method to send an appropriate PUT request
            $scope.company.$update(function() {
            	// If an company was updated successfully, redirect the user to the company's page 
                $location.path('companies/' + $scope.company._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single company
        $scope.delete = function(company) {
        	// If an company was sent to the method, delete it
            if (company) {
            	// Use the article '$remove' method to delete the article
                company.$remove(function() {
                	// Remove the article from the articles list
                    for (var i in $scope.companies) {
                        if ($scope.companies[i] === company) {
                            $scope.companies.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the article '$remove' method to delete the company
                $scope.company.$remove(function() {
                    $location.path('companies');
                });
            }
        };
    }
]);