
    var app = angular.module('app', ['ngRoute', 'ngResource', 'hc.marked', 'naif.base64'])
        .config(['markedProvider', function(markedProvider)
            {
                markedProvider.setOptions({gfm: true});
            }])
        .factory('appFactory', function($resource, $location, $rootScope)
        {
            var comun = {};

            comun.colocarSubtitulo = function(sub) {
                $rootScope.subtitulo = sub;
            };

            //API-REST del Backend de Maestras
            comun.restMaestras = $resource("../s-doce-b/public/index.php/maestras/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            //API-REST del Backend de Plantillas
            comun.restPlantillas = $resource("../s-doce-b/public/index.php/plantillas/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            //API-REST del Backend de Documentos
            comun.restDocumentos = $resource("../s-doce-b/public/index.php/documentos/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            comun.menu = function(indice)
            {
                alert(indice);
                return indice;
            };

            comun.irA = function(ruta) {
                $location.url(ruta);
            };

            return comun;
        })

        .directive("markitup", function() {
            return {
                restrict: "A",
                scope: {
                    settings: "=markitup"
                },
                link: function(scope, element, attrs) {
                    angular.element(element).markItUp(scope.settings);
                }
            };
        })
        .directive('bindHtmlCompile', ['$compile', function($compile) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attrs) {
                        scope.$watch(function() {
                            return scope.$eval(attrs.bindHtmlCompile);
                        }, function(value) {
                            // In case value is a TrustedValueHolderType, sometimes it
                            // needs to be explicitly called into a string in order to
                            // get the HTML string.
                            element.html(value && value.toString());
                            // If scope is provided use it, otherwise use parent scope
                            var compileScope = scope;
                            if (attrs.bindHtmlScope) {
                                compileScope = scope.$eval(attrs.bindHtmlScope);
                            }
                            $compile(element.contents())(compileScope);
                        });
                    }
                };
            }]);









