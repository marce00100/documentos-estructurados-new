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

        $rootScope.adecuarDocumentoParaGuardar = function(componentesPlantilla)
        {
            var comp = componentes;
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
                else if(item.tipo === "seccion")
                {
                    var texts = angular.element("#" + item.id.toString()).find("textarea");
                    var contenido = angular.element(texts[0]).val();
                    comp[i].campos.contenido = contenido;                    
                }
            }            
            return comp;
        };
        $rootScope.mostrarCampos = function(componentesDocumento)
        {
            var comp = componentesDocumento;
            console.log(comp);
            for(i=0; i< comp.length; i++)
            {
                var item = comp[i];
                if(item.tipo === "metadato")
                {
                    var inputs = angular.element("#" + item.id.toString()).find("input");
                    var valor = item.campos.valor;
                    angular.element(inputs[0]).val(valor);
                }
                else if(item.tipo === "seccion")
                {
                    var texts = angular.element("#" + item.id.toString()).find("textarea");
                    var contenido = item.campos.contenido;
                    angular.element(texts[0]).val(contenido);                  
                }
            }
        };



    });