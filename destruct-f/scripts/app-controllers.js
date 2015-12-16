

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
                templateUrl: "templates/plantillas-nueva.html",
                controller: "plantillasEditarNuevaCtrl"
            });
            $routeProvider.when('/plantillas/:id/editar/', {
                templateUrl: "templates/plantillas-editar.html",
                controller: "plantillasEditarNuevaCtrl"
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
        .controller('plantillasEditarNuevaCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
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

                $scope.guardar = function()
                {
                    $scope.contexto.componentes = appFactory.colocaIdsComponentes($scope.componentes); // $scope.componentesJson;
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
                appFactory.colocarSubtitulo("Documento Nuevo");
                $scope.contexto = {};
                var idP = $routeParams.id;
                $resource(appFactory.dominio + "/plantillas/" + idP).get(function(plantillaRes) {
                    $scope.contexto.plantilla = plantillaRes.plantilla.nombre;
                    $scope.contexto.plantilla_id = plantillaRes.plantilla._id;
                    $scope.contexto.plantillaComponentes = plantillaRes.plantilla.componentes;
                });


                $scope.guardar = function()
                {
                    $scope.contexto.plantilla_id = $scope.contexto.plantillaObjeto._id;
                    $scope.contexto.plantilla_nombre = $scope.contexto.plantillaObjeto.nombre;
                    $scope.contexto.contenido = $scope.adecuarDocumentoParaGuardar();
                    appFactory.restDocumentos.save($scope.contexto).$promise.then(function(respuesta)
                    {
                        if (respuesta.mensaje) {
                            appFactory.irA("/documentos/editar/" + respuesta.documento._id);
                        }
                    });
                };
            }])

        .controller('documentosEditarCtrl', ['$scope', 'appFactory', '$resource', '$routeParams', function($scope, appFactory, $resource, $routeParams)
            {
                $scope.modulo = 3;
                appFactory.colocarSubtitulo("Modificar Documento");
                $scope.contexto = {};
                var id = $routeParams.id;

                appFactory.restDocumentos.get({id: id}, function(data) {
                    $scope.contexto = data.documento;
                    var plantillaContenidosHtml = marked($scope.contexto.plantilla_contenido);
                    $scope.contexto.plantilla_contenidoHtml = $scope.adecuarContenidoDocumento($scope.contexto.contenido, plantillaContenidosHtml);

                    $resource("../s-doce-b/public/index.php/maestra/activa").get(function(respuesta) {
                    });
                });



                $scope.guardar = function()
                {
                    $scope.contexto.contenido = $scope.adecuarDocumentoParaGuardar();
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
        $scope.obtenerValores = function()
        {
            var inputs = angular.element("#contenedor").find('input');
            var texts = angular.element("#contenedor").find('textarea');
            contenidosJson = {nombre: "marco", apellido: "kkk"};
            contenidosJson.edad = "33";
            for (var i = 0; i < inputs.length; i++)
            {
                var propiedad = angular.element(inputs[i]).attr('id').toString();
                contenidosJson[propiedad] = angular.element(inputs[i]).val();
            }
//             for (var i = 0; i < texts.length; i++)
//                contenidosJson += '"' + angular.element(texts[i]).attr('id').toString() + '":"' + angular.element(texts[i]).val() + '",';


            $scope.resultado = contenidosJson;
        };

        $scope.pruebaTexto = function()
        {
            $.fn.dingo();
            var char = "What is the best way to locate wherever the ";
            index = char.search("best");
            index2 = char.indexOf("best");
            newsub = "hidden='' ";
            nuevo = char.substr(0, index) + newsub + char.substr(index);
            console.log(char + " - " + index + " - " + index2 + " - " + nuevo);
        };
    });
