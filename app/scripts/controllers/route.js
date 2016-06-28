'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('RouteCtrl', ['$scope', function ($scope, $http) {
        L.mapbox.accessToken = 'pk.eyJ1IjoiY2FtZXJvbmxvY2tlIiwiYSI6ImNpbzl5ejVlOTAzNHl2YWtqbWt6emUybTkifQ.QALitpbrNxEN31Uc07olEw';
        var map = L.mapbox.map('map', 'mapbox.streets', {zoomControl: false}).setView([40, -74.50], 9);
       // map.attributionControl.setPosition('bottomleft');
       // L.control.zoom({position:'bottomright'});

        $scope.map = map;

        $scope.origin = {
            placeHolder: 'Origin',
            location: "",
            address: ""
        };

        $scope.destination = {
            placeHolder: 'Destination',
            location: "",
            address: ""
        };

        $scope.calculateRoute = function() {
            var request = ;
            $http({
                method  : 'GET',
                url     : 'process.php',
                data    : $.param($scope.formData),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(data) {
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = data.errors.name;
                        $scope.errorSuperhero = data.errors.superheroAlias;
                    } else {
                        // if successful, bind success message to message
                        $scope.message = data.message;
                    }
                });
        }

    }]);