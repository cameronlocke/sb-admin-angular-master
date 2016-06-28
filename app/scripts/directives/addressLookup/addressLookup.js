'use strict';

angular.module('sbAdminApp')
    .directive('addressLookup',function(){
        return {
            link: function(scope, element, attrs, model) {
                var opts = [];
                var newAutocomplete = function() {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        scope.addressLookup.location = scope.gPlace.getPlace().geometry.location;
                        scope.addressLookup.address = scope.gPlace.getPlace().formatted_address;
                        scope.map.setView([scope.gPlace.getPlace().geometry.location.lat(), scope.gPlace.getPlace().geometry.location.lng()], 15);
                        //scope.$apply(function() {
                        //    scope.origin = scope.gPlace.getPlace();
                        //});

                        if(scope.marker) {
                            scope.marker.setLatLng([scope.gPlace.getPlace().geometry.location.lat(), scope.gPlace.getPlace().geometry.location.lng()]);
                            scope.marker.update();
                        } else {
                            scope.marker = L.marker([scope.gPlace.getPlace().geometry.location.lat(), scope.gPlace.getPlace().geometry.location.lng()]);
                            scope.marker.addTo(scope.map);
                        }
                    })
                }
                newAutocomplete()

            },
            scope: {
                addressLookup: '=type',
                map: '=map'
            },
            templateUrl:'scripts/directives/addressLookup/addressLookup.html',
            restrict: 'E',
            replace: true
        }
    });


