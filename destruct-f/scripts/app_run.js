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
        
 
        
        
    });