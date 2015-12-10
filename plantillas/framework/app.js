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
//                templates: [
//                    {type: "input5", id: 1},
//                    {type: "text_area", id: 1, parametros: ["uno", "dos", "tres"]},
//                    {type: "op_multiple", id: 1},
////                    {type: "item", id: 7},
//                    {type: "container", id: 1, columns: [[], []]},
//                ],
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

