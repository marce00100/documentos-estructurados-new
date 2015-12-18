angular.module("appDND", ["ngRoute", "dndLists"])
        .config(function ($routeProvider) {
            $routeProvider

                    .when('/creacion-plantilla', {
                        templateUrl: 'creacion-plantilla/creacion-plantilla.html',
                        controller: 'CreacionPlantillaListsDndController'
                    })

                    .otherwise({redirectTo: '/creacion-plantilla'});
        })
        .controller("CreacionPlantillaListsDndController", function ($scope) {

            $scope.componentes = {
                selected: null,
                biblioteca: biblioteca,
                componentesPlantilla: {
                    "lista": [],
                }
            };
        })

