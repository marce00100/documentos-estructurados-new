angular.module("appDND", ["ngRoute", "dndLists"])
        .config(function ($routeProvider) {
            $routeProvider

                    .when('/creacion-plantilla', {
                        templateUrl: 'creacion-plantilla/creacion-plantilla.html',
                        controller: 'CreacionPlantillaListsDemoController'
                    })

                    .otherwise({redirectTo: '/creacion-plantilla'});
        })
        .controller("CreacionPlantillaListsDemoController", function ($scope) {

            $scope.models = {
                selected: null,
                dropzones: {
                    "PlantillaContenido": [],
                }
            };
            $scope.models.templates = biblioteca;
            console.log($scope.models.templates);

            $scope.$watch('models.dropzones', function (model) {
                $scope.modelAsJson = angular.toJson(model, true);
            }, true);

        })

