

    /*
     * Rutas  y Controladores de PLANTILLAS ============================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/plantillas', {
                templateUrl: "templates/plantillas-lista.html",
                controller: "plantillasInicioCtrl"
            });
            $routeProvider.when('/plantillas/nuevo', {
                templateUrl: "templates/plantillas-nuevo-editar.html",
                controller: "plantillasNuevoEditarCtrl"
            });
            $routeProvider.when('/plantillas/:id/editar/', {
                templateUrl: "templates/plantillas-nuevo-editar.html",
                controller: "plantillasNuevoEditarCtrl"
            });
//            $routeProvider.when('/plantillas/:id/json/', {
////                templateUrl: "templates/plantillas-editar.html",
//                controller: "plantillasJsonCtrl"
//            });
        }])
    .controller('plantillasInicioCtrl', ['$scope', 'appFactory', function($scope, appFactory)
        {
            $scope.modulo = 2;
            appFactory.colocarSubtitulo("Plantillas");
            appFactory.restPlantillas.get(function(respuesta) {
                $scope.lista = respuesta.plantillas;
            });
        }])
    .controller('plantillasNuevoEditarCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
        {
            $scope.modulo = 2;
            $scope.contexto = {};
            $scope.componentes = {
                biblioteca: biblioteca,
                componentesPlantilla: {
                    "lista": []
                }
            };



            var id = $routeParams.id;
            if (typeof id === "undefined")
            {
                appFactory.colocarSubtitulo("Plantilla Nueva");
            }
            else
            {
                appFactory.colocarSubtitulo("Modificar Plantilla");
                appFactory.restPlantillas.get({id: id}, function(data) {
                    $scope.contexto = data.plantilla;
                    $scope.componentes.componentesPlantilla.lista = data.plantilla.componentes;
                });
            }

            $scope.showModal = false;
            $scope.toggleModal = function() {
                $scope.showModal = !$scope.showModal;
            };
            $scope.modificaParametros = function()
            {
                var parametros = $scope.componentes.seleccionado.parametros;
                for (var key in parametros)
                {
                    parametros[key] = angular.element("#" + key).val();
                }
                $scope.toggleModal();
            };

            $scope.guardar = function()
            {
                $scope.contexto.componentes = $scope.colocaIdsComponentesPlantilla($scope.componentes.componentesPlantilla.lista, $scope.componentes.biblioteca);
                if (typeof id === "undefined")
                {
                    appFactory.restPlantillas.save($scope.contexto).$promise.then(function(respuesta)
                    {
                        if (respuesta.mensaje) {
                            appFactory.irA("/plantillas/" + respuesta.plantilla._id + "/editar/");
                        }
                    });
                }
                else
                {
                    appFactory.restPlantillas.update({id: $scope.contexto._id}, $scope.contexto)
                    .$promise.then(function(respuesta) {
                        if (respuesta.mensaje) {
                        }
                    });
                }
            };
        }]);
//        .controller('plantillasJsonCtrl', function(appFactory)
//        {
//            var id = $routeParams.id;
//            var contexto = {};
//            appFactory.restPlantillas.get({id: id}, function(data) {
//                contexto = data.plantilla;
//            });
//            printf(contexto);
//            
//        });

    /*
     * Rutas  y Controladores de DOCUMENTOS ============================================================
     * 
     */

    app.config(['$routeProvider', function($routeProvider)
        {
            $routeProvider.when('/documentos', {
                templateUrl: "templates/documentos-lista.html",
                controller: "documentosInicioCtrl"
            });
            $routeProvider.when('/documentos/nuevo/plantilla/:id', {
                templateUrl: "templates/documentos-nuevo.html",
                controller: "documentosNuevoCtrl"
            });
            $routeProvider.when('/documentos/:id/editar/', {
                templateUrl: "templates/documentos-editar.html",
                controller: "documentosEditarCtrl"
            });
            $routeProvider.otherwise({
                redirectTo: '/documentos'
            });
        }])
    .controller('documentosInicioCtrl', ['$scope', '$resource', 'appFactory', function($scope, $resource, appFactory)
        {
            $scope.modulo = 3;
            appFactory.colocarSubtitulo("Documentos");

            $resource(appFactory.dominio + "/plantillas/vigentes").get(function(plantillasRes) {
                $scope.plantillasVigentes = plantillasRes.plantillas;
            });

            appFactory.restDocumentos.get(function(respuesta) {
                $scope.lista = respuesta.documentos;
            });
        }])
    .controller('documentosNuevoCtrl', ['$scope', 'appFactory', '$resource', '$routeParams', '$rootScope', function($scope, appFactory, $resource, $routeParams, $rootScope)
        {
            $scope.modulo = 3;
            appFactory.colocarSubtitulo("Documento");
            $scope.contexto = {};
            var idP = $routeParams.id;
            $resource(appFactory.dominio + "/plantillas/" + idP).get(function(plantillaRes) {
                $scope.contexto.plantilla = plantillaRes.plantilla.nombre;
                $scope.contexto.plantilla_id = plantillaRes.plantilla._id;
                $scope.contexto.componentes = plantillaRes.plantilla.componentes;
            });

//            $rootScope.editorSecciones();
            $scope.guardar = function()
            {
//                $rootScope.editorSecciones();
//                $scope.contexto.componentes = $rootScope.adecuarDocumentoParaGuardar($scope.contexto.componentes);
//                appFactory.restDocumentos.save($scope.contexto).$promise.then(function(respuesta)
//                {
//                    if (respuesta.mensaje) {
//                        appFactory.irA("/documentos/" + respuesta.documento._id + "/editar/");
//                    }
//                });
            };
        }])

    .controller('documentosEditarCtrl', ['$scope', 'appFactory', '$rootScope', '$routeParams', function($scope, appFactory, $rootScope, $routeParams)
        {
            $scope.modulo = 3;
            appFactory.colocarSubtitulo("Documento");
            $scope.contexto = {};
            var id = $routeParams.id;

            appFactory.restDocumentos.get({id: id}, function(data) {
                $scope.contexto = data.documento;
            });


            $scope.guardar = function()
            {
                $scope.contexto.componentes = $rootScope.adecuarDocumentoParaGuardar($scope.contexto.componentes);
                appFactory.restDocumentos.update({id: $scope.contexto._id}, $scope.contexto)
                .$promise.then(function(respuesta)
                {
                    if (respuesta.mensaje) {
                    }
                });
            };
        }]);






    app.controller('pruebaCtrl', function($scope)
    {

    });
