
    var app = angular.module('app', ['ngRoute', 'ngResource',  'naif.base64', 'dndLists'])

        .factory('appFactory', function($resource, $location, $rootScope)
        {
            var comun = {};
            var dominio = "/v2";

            comun.colocarSubtitulo = function(sub) {
                $rootScope.subtitulo = sub;
            };

            //API-REST del Backend de Plantillas
            comun.restPlantillas = $resource("http://localhost:3000" + dominio + "/plantillas/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            //API-REST del Backend de Documentos
            comun.restDocumentos = $resource("http://localhost:3000" + dominio + "documentos/:id", {id: "@_id"}, {
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









