
    var app = angular.module('app', ['ngRoute', 'ngResource', 'naif.base64', 'dndLists'])

        .factory('appFactory', function($resource, $location, $rootScope)
        {
            var comun = {};
            comun.dominio = "http://localhost:3000/v2";

            comun.colocarSubtitulo = function(sub) {
                $rootScope.subtitulo = sub;
            };

            //API-REST del Backend de Plantillas
            comun.restPlantillas = $resource(comun.dominio + "/plantillas/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            //API-REST del Backend de Documentos
            comun.restDocumentos = $resource(comun.dominio + "/documentos/:id", {id: "@_id"}, {
                update: {method: "PUT", params: {id: "@id"}}
            });

            comun.irA = function(ruta) {
                $location.url(ruta);
            };

            comun.colocaIdsComponentesPlantilla = function(plantillaComponentes, biblioteca)
            {
                var lista = plantillaComponentes;
                var indice = [];
                for (i = 0; i < biblioteca.length; i++)
                {
                    indice[biblioteca[i].componente] = 1;
                }
                for (i = 0; i < lista.length; i++)
                {
                    var item = lista[i];
                    item.id = item.componente + "-" + indice[item.componente].toString();
                    indice[item.componente] += 1;
                }
                return lista;
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









