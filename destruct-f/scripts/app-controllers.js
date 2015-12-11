/*
 * Rutas  y Controladores de MAESTRAS ===================================================================
 * 
 */

app.config(['$routeProvider', function ($routeProvider)
    {
//            $routeProvider.when('/maestras', {
//                templateUrl: "templates/maestras-lista.html",
//                controller: "maestrasInicioCtrl"
//            });
//            $routeProvider.when('/maestras/nueva', {
//                templateUrl: "templates/maestras-nueva.html",
//                controller: "maestrasNuevaCtrl"
//            });
//            $routeProvider.when('/maestras/editar/:id', {
//                templateUrl: "templates/maestras-editar.html",
//                controller: "maestrasEditarCtrl"
//            });
        $routeProvider.when('/x', {
            templateUrl: "templates/pruebas.html",
            controller: "pruebaCtrl"
        });
    }])
//        .controller('maestrasInicioCtrl', ['$scope', 'appFactory', function($scope, appFactory)
//            {
//                $scope.modulo = 1;
//                appFactory.colocarSubtitulo("Plantillas Maestras");
//                appFactory.restMaestras.get(function(respuesta) {
//                    $scope.lista = respuesta.plantillas_maestras;
//                });
//            }])
//        .controller('maestrasNuevaCtrl', ['$scope', 'appFactory', function($scope, appFactory)
//            {
//                $scope.modulo = 1;
//                appFactory.colocarSubtitulo("Plantillas Maestras");
//                $scope.contexto = {};
//                $scope.guardar = function()
//                {
//                    appFactory.restMaestras.save($scope.contexto).$promise.then(function(respuesta) {
//                        if (respuesta.mensaje) {
//                            appFactory.irA("/maestras/editar/" + respuesta.plantilla_maestra._id);
//                        }
//                    });
//                };
//            }])
//        .controller('maestrasEditarCtrl', ['$scope', 'appFactory', '$routeParams', function($scope, appFactory, $routeParams)
//            {
//                $scope.modulo = 1;
//                appFactory.colocarSubtitulo("Plantillas Maestras");
//                $scope.contexto = {};
//                var id = $routeParams.id;
//                appFactory.restMaestras.get({id: id}, function(data) {
//                    $scope.contexto = data.plantilla_maestra;
//                });
//
//                $scope.guardar = function()
//                {
//                    appFactory.restMaestras.update({id: $scope.contexto._id}, $scope.contexto)
//                        .$promise.then(function(respuesta) {
//                            if (respuesta.mensaje) {
//                            }
//                        });
//                };
//            }]);

/*
 * Rutas  y Controladores de PLANTILLAS ============================================================
 * 
 */

app.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/plantillas', {
            templateUrl: "templates/plantillas-lista.html",
            controller: "plantillasInicioCtrl"
        });
        $routeProvider.when('/plantillas/nueva', {
            templateUrl: "templates/plantillas-nueva.html",
            controller: "plantillasNuevaCtrl"
        });
        $routeProvider.when('/plantillas/editar/:id', {
            templateUrl: "templates/plantillas-editar.html",
            controller: "plantillasEditarCtrl"
        });
    }])
        .controller('plantillasInicioCtrl', ['$scope', 'appFactory', function ($scope, appFactory)
            {
                $scope.modulo = 2;
                appFactory.colocarSubtitulo("Plantillas");
                appFactory.restPlantillas.get(function (respuesta) {
                    $scope.lista = respuesta.plantillas;
                });
            }])
        .controller('plantillasNuevaCtrl', ['$scope', 'appFactory', function ($scope, appFactory)
            {
                $scope.modulo = 2;
                appFactory.colocarSubtitulo("Plantilla Nueva");
                $scope.contexto = {};
                $scope.guardar = function () {
                    $scope.contexto.componentes = $scope.modelAsJson;
                    appFactory.restPlantillas.save($scope.contexto).$promise.then(function (respuesta)
                    {
                        if (respuesta.mensaje) {
                            appFactory.irA("/plantillas/editar/" + respuesta.plantilla._id);
                        }
                    });
                };

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
            }])
        .controller('plantillasEditarCtrl', ['$scope', 'appFactory', '$routeParams', function ($scope, appFactory, $routeParams)
            {
                $scope.modulo = 2;
                appFactory.colocarSubtitulo("Modificar Plantilla");
                $scope.contexto = {};
                var id = $routeParams.id;
                appFactory.restPlantillas.get({id: id}, function (data) {
                    $scope.contexto = data.plantilla;
                });

                $scope.guardar = function ()
                {
                    appFactory.restPlantillas.update({id: $scope.contexto._id}, $scope.contexto)
                            .$promise.then(function (respuesta) {
                                if (respuesta.mensaje) {
                                }
                            });
                };
            }]);

/*
 * Rutas  y Controladores de DOCUMENTOS ============================================================
 * 
 */

app.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider.when('/documentos', {
            templateUrl: "templates/documentos-lista.html",
            controller: "documentosInicioCtrl"
        });
        $routeProvider.when('/documentos/nuevo', {
            templateUrl: "templates/documentos-nuevo.html",
            controller: "documentosNuevoCtrl"
        });
        $routeProvider.when('/documentos/editar/:id', {
            templateUrl: "templates/documentos-editar.html",
            controller: "documentosEditarCtrl"
        });
        $routeProvider.otherwise({
            redirectTo: '/documentos'
        });
    }])
        .controller('documentosInicioCtrl', ['$scope', 'appFactory', function ($scope, appFactory)
            {
                $scope.modulo = 3;
                appFactory.colocarSubtitulo("Documentos");
                appFactory.restDocumentos.get(function (respuesta) {
                    $scope.lista = respuesta.documentos;
                });
            }])
        .controller('documentosNuevoCtrl', ['$scope', 'appFactory', '$resource', '$rootScope', 'marked', function ($scope, appFactory, $resource, $rootScope, marked)
            {
                $scope.modulo = 3;
                appFactory.colocarSubtitulo("Documento Nuevo");
                $scope.contexto = {};

                function cargarPlantillasActivas()
                {
                    // carga plantillas vigentes
                    $resource("../s-doce-b/public/index.php/plantillas/vigente/1").get(function (respuesta) {
                        $scope.plantillasVigentes = respuesta.plantillas;
                    });

                    //carga plantilla maestra activa
                    $resource("../s-doce-b/public/index.php/maestra/activa").get(function (respuesta) {
                        $scope.contexto.maestra_id = respuesta.plantilla_maestra._id;
                        $scope.contexto.maestra_nombre = respuesta.plantilla_maestra.nombre;
                        $scope.contexto.maestra_cabecera = respuesta.plantilla_maestra.cabecera;
                        $scope.contexto.maestra_pie = respuesta.plantilla_maestra.pie;

                    });
                }
                cargarPlantillasActivas();

                $scope.cargarPlantilla = function ()
                {
                    var idSeleccionado = $scope.contexto.plantillaObjeto._id;
                    appFactory.restPlantillas.get({id: idSeleccionado}, function (data)
                    {
                        var plantillaContenido = $rootScope.adecuarContenidoPlantilla(data.plantilla.contenido);
                        $scope.contexto.plantilla_contenido = plantillaContenido.contenidoIds;
                        $scope.contexto.plantilla_contenidoHtml = marked(plantillaContenido.contenidoIdsHtml);
                    });
                };

                $scope.guardar = function ()
                {
                    $scope.contexto.plantilla_id = $scope.contexto.plantillaObjeto._id;
                    $scope.contexto.plantilla_nombre = $scope.contexto.plantillaObjeto.nombre;
                    $scope.contexto.contenido = $scope.adecuarDocumentoParaGuardar();
                    appFactory.restDocumentos.save($scope.contexto).$promise.then(function (respuesta)
                    {
                        if (respuesta.mensaje) {
                            appFactory.irA("/documentos/editar/" + respuesta.documento._id);
                        }
                    });
                };
            }])
        .controller('documentosEditarCtrl', ['$scope', 'appFactory', '$resource', '$routeParams', function ($scope, appFactory, $resource, $routeParams)
            {
                $scope.modulo = 3;
                appFactory.colocarSubtitulo("Modificar Documento");
                $scope.contexto = {};
                var id = $routeParams.id;

                appFactory.restDocumentos.get({id: id}, function (data) {
                    $scope.contexto = data.documento;
                    var plantillaContenidosHtml = marked($scope.contexto.plantilla_contenido);
                    $scope.contexto.plantilla_contenidoHtml = $scope.adecuarContenidoDocumento($scope.contexto.contenido, plantillaContenidosHtml);

                    $resource("../s-doce-b/public/index.php/maestra/activa").get(function (respuesta) {
//                        $scope.contexto.maestra_id = respuesta.plantilla_maestra._id;
//                        $scope.contexto.maestra_nombre = respuesta.plantilla_maestra.nombre;
//                        $scope.contexto.maestra_cabecera = respuesta.plantilla_maestra.cabecera;
//                        $scope.contexto.maestra_pie = respuesta.plantilla_maestra.pie;
                    });
                });



                $scope.guardar = function ()
                {
                    $scope.contexto.contenido = $scope.adecuarDocumentoParaGuardar();
                    appFactory.restDocumentos.update({id: $scope.contexto._id}, $scope.contexto)
                            .$promise.then(function (respuesta)
                            {
                                if (respuesta.mensaje) {
                                }
                            });
                };
            }]);








app.controller('pruebaCtrl', function ($scope)
{
    $scope.obtenerValores = function ()
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

    $scope.pruebaTexto = function ()
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
