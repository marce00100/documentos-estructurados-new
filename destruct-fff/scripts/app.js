
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

            comun.colocaIdsComponentes = function(componentes)
            {
                var lista = componentes.componentesPlantilla.lista;
                var indice = [];
                for (i = 0; i < componentes.biblioteca.length; i++)
                {
                    indice[componentes.biblioteca[i].componente] = 1;
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
            }])
        .directive('modal', function () {
            return {
              template: '<div class="modal fade">' + 
                        '<div class="modal-dialog">' + 
                          '<div class="modal-content">' + 
                            '<div class="modal-header">' + 
                              '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                              '<h4 class="modal-title">{{ title }}</h4>' + 
                            '</div>' + 
                            '<div class="modal-body" ng-transclude></div>' + 
                          '</div>' + 
                        '</div>' + 
                      '</div>',
              restrict: 'E',
              transclude: true,
              replace:true,
              scope:false,
              link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                  if(value == true)
                    $(element).modal('show');
                
                  else
                  {
                      $(element).modal('false');
               
                  }
                
                });

                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                  });
                });
              }
            };
          });

//var mymodal = angular.module('mymodal', []);
//
//        mymodal.controller('MainCtrl', function ($scope) {
//            $scope.showModal = false;
//            $scope.toggleModal = function(){
//                $scope.showModal = !$scope.showModal;
//            };
//          });
//
//        mymodal.directive('modal', function () {
//            return {
//              template: '<div class="modal fade">' + 
//                  '<div class="modal-dialog">' + 
//                    '<div class="modal-content">' + 
//                      '<div class="modal-header">' + 
//                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
//                        '<h4 class="modal-title">{{ title }}</h4>' + 
//                      '</div>' + 
//                      '<div class="modal-body" ng-transclude></div>' + 
//                    '</div>' + 
//                  '</div>' + 
//                '</div>',
//              restrict: 'E',
//              transclude: true,
//              replace:true,
//              scope:true,
//              link: function postLink(scope, element, attrs) {
//                scope.title = attrs.title;
//
//                scope.$watch(attrs.visible, function(value){
//                  if(value == true)
//                    $(element).modal('show');
//                  else
//                    $(element).modal('hide');
//                });
//
//                $(element).on('shown.bs.modal', function(){
//                  scope.$apply(function(){
//                    scope.$parent[attrs.visible] = true;
//                  });
//                });
//
//                $(element).on('hidden.bs.modal', function(){
//                  scope.$apply(function(){
//                    scope.$parent[attrs.visible] = false;
//                  });
//                });
//              }
//            };
//          });







