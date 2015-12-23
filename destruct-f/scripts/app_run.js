    app.run(function($rootScope) {

        $rootScope.insertarImagen = function(img)
        {
            $rootScope.lastFocused;
            angular.element("textarea").focus(function() {
                $rootScope.lastFocused = document.activeElement;
            });
            var img64 = img64md(img);
            insertText(img64, $rootScope.lastFocused);
            return img64;
        };

        $rootScope.limpiar = function()
        {
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');
            for (var i = 0; i < texts.length; i++)
                angular.element(texts[i]).val("");
            for (var i = 0; i < inputs.length; i++)
                angular.element(inputs[i]).val("");
        };




        $rootScope.colocaIdsComponentesPlantilla = function(plantillaComponentes, biblioteca)
        {
            var lista = plantillaComponentes;
            var componentes = [];
            var indice = [];
            for (i = 0; i < biblioteca.length; i++)
            {
                indice[biblioteca[i].componente] = 1;
            }
            for (i = 0; i < lista.length; i++)
            {
                var item = lista[i];

                var comp = {};
                comp.id = item.componente + "-" + indice[item.componente].toString();
                comp.tipo = item.tipo;
                comp.componente = item.componente;
                comp.parametros = item.parametros;
                componentes.push(comp);
                indice[item.componente] += 1;
            }
            return componentes;
        };

//        $rootScope.editorSecciones = function()
//        {
//            var divs = angular.element("#editorDocumento").find(".editorTexto");
//            bkLib.onDomLoaded(function() {
//                var nic = new nicEditor();
//                for (var i = 0; i < divs.length; i++)
//                {
//                    var id = $(divs[i]).attr('id');
//                    nic.addInstance(id);
//                }
//                nic.floatingPanel();
//            });
//        };

        $rootScope.adecuarDocumentoParaGuardar = function(componentesPlantilla)
        {
            var comp = componentesPlantilla;
            for (i = 0; i < comp.length; i++)
            {
                var item = comp[i];
                item.campos = {};
                if (item.tipo === "metadato")
                {
                    var inputs = angular.element("#" + item.id.toString()).find("input");
                    var valor = angular.element(inputs[0]).val();
                    comp[i].campos.valor = valor;
                }
                else if (item.tipo === "seccion")
                {
                    var texts = angular.element("#" + item.id.toString()).find("textarea");
                    var contenido = angular.element(texts[0]).val();
                    comp[i].campos.contenido = contenido;
                }
            }
            return comp;
        };
//        $rootScope.mostrarCampos = function(componentesDocumento)
//        {
//            var comp = componentesDocumento;
//            console.log(comp);
//            for (i = 0; i < comp.length; i++)
//            {
//                var item = comp[i];
//                if (item.tipo === "metadato")
//                {
//                    var inputs = angular.element("#" + item.id.toString()).find("input");
//                    var valor = item.campos.valor;
//                    angular.element(inputs[0]).val(valor);
//                }
//                else if (item.tipo === "seccion")
//                {
//                    var texts = angular.element("#" + item.id.toString()).find("textarea");
//                    var contenido = item.campos.contenido;
//                    angular.element(texts[0]).val(contenido);
//                }
//            }
//        };

    });

    $(function() {
        var divs = $("#editorDocumento").find(".editorTexto");
        bkLib.onDomLoaded(function() {
            var nic = new nicEditor();
            for (var i = 0; i < divs.length; i++)
            {
                var id = $(divs[i]).attr('id');
                nic.addInstance(id);
            }
            nic.floatingPanel();
        });
    })

