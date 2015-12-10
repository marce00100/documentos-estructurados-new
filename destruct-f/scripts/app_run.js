    app.run(function($rootScope, marked) {
        $rootScope.markupSettings = settingsMarkdown;

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

        $rootScope.insertarCodigo = function(tipo)
        {
            var texto = "";
            $rootScope.lastFocused;
            angular.element("textarea").focus(function() {
                $rootScope.lastFocused = document.activeElement;
            });
            if (tipo === "1")
            {
                texto = '<input>';
            }
            else if (tipo === "2")
            {
                texto = '<textarea></textarea>';
            }
            else if (tipo === "3")
            {
                texto = '<label></label>';
            }
            insertText(texto, $rootScope.lastFocused);
        };

        $rootScope.adecuarContenidoPlantilla = function(plantillaContenido)
        {
            textoIds = textoIdsHtml = plantillaContenido;
            var opcion = '<textarea>';
            var id = 101;
            while (textoIds.indexOf(opcion) != -1)
            {
                textoIds = textoIds.replace(opcion, '<textarea id="' + id + '">');
                textoIdsHtml = textoIdsHtml.replace(opcion, '<textarea id="' + id + '" markitup="markupSettings" class="markitup">');
                id++;
            }
            opcion = "<input>";
            while (textoIds.indexOf(opcion) != -1)
            {
                textoIds = textoIds.replace(opcion, '<input id="' + id + '" type="text">');
                textoIdsHtml = textoIdsHtml.replace(opcion, '<input id="' + id + '" type="text" value="">');
                id++;
            }
            var plantilla_contenido = {};
            plantilla_contenido.contenidoIds = textoIds;
            plantilla_contenido.contenidoIdsHtml = textoIdsHtml;
            return plantilla_contenido;
        };

        $rootScope.adecuarContenidoDocumento = function(documentoContenido, plantillaContenido)
        {
            textoIdsHtml = plantillaContenido;
            indice = 0;
            while (indice != -1)
            {
                indice = textoIdsHtml.indexOf('<textarea id="', indice);
                if (indice > -1)
                {
                    id = textoIdsHtml.substr(indice + ('<textarea id="').length, 3); //encuentra el ids del textarea 
                    textoIdsHtml = textoIdsHtml.replace('<textarea id="' + id + '">', '<textarea id="' + id + '" markitup="markupSettings" class="markitup">' + documentoContenido[id]);
                    indice++;
                }
            }
            indice = 0;
            while (indice != -1)
            {
                indice = textoIdsHtml.indexOf('<input id="', indice);
                if (indice > -1)
                {
                    id = textoIdsHtml.substr(indice + ('<input id="').length, 3); //encuentra los ids de los inputs 
                    textoIdsHtml = textoIdsHtml.replace('<input id="' + id + '" type="text">', '<input id="' + id + '" type="text" value="' + documentoContenido[id] + '">');

                    indice++;
                }
            }
            return textoIdsHtml;
        };

        $rootScope.adecuarParaVisualizar = function(plantillaContenidoIds)
        {
            texto = plantillaContenidoIds;
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');

            for (var i = 0; i < texts.length; i++)
            {
                var id = angular.element(texts[i]).attr('id');
                texto = texto.replace('<textarea id="' + id + '">', angular.element(texts[i]).val());
            }
            for (var i = 0; i < inputs.length; i++)
            {
                var id = angular.element(inputs[i]).attr('id');
                texto = texto.replace('<input id="' + id + '" type="text">', angular.element(inputs[i]).val());
            }
            return texto;
        };


        $rootScope.adecuarDocumentoParaGuardar = function()
        {
            var inputs = angular.element("#editorDocumento").find('input');
            var texts = angular.element("#editorDocumento").find('textarea');
            contenidosJson = {};
            for (var i = 0; i < texts.length; i++)
                contenidosJson[angular.element(texts[i]).attr('id').toString()] = angular.element(texts[i]).val();

            for (var i = 0; i < inputs.length; i ++)
                contenidosJson[angular.element(inputs[i]).attr('id').toString()] = angular.element(inputs[i]).val();

            return contenidosJson;
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

        $rootScope.generarPDF = function(modulo, contexto)
        {
            var html = "";

            switch (modulo)
            {
                case 1:
                    cabecera = marked(contexto.cabecera);
                    pie = marked(contexto.pie);
                    html = "<header>" + cabecera + "</header>" + html + "<footer>" + pie + "</footer>";
                    break;
                case 2:
                    html = marked(contexto.contenido);
                    break;
                case 3:
                    html = $rootScope.adecuarParaVisualizar(contexto.plantilla_contenido);
                    html = marked(html);
                    cabecera = marked(contexto.maestra_cabecera);
                    pie = marked(contexto.maestra_pie);
                    html = "<header>" + cabecera + "</header>" + html + "<footer>" + pie + "</footer>";
                    break;
            }

            pdfDesdeHtml(html, contexto.nombre);
        };
        
        /*
         * 
         * ??????????????????????????????????????????????????????????????
         * ??????????????????????????????????????????????????????????
         *           FAlta GUARDAR LA MASTER EN DOPCUMENTOS SEGUN 
         *           PROPIEDADES INDIVIDUALES PUESTAS EN LA RAIZ
         * 
         * 
         * 
         */
    });