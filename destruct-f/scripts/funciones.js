    function img64md($fs)
    {
        var imgBase64 = "";
        if ((typeof $fs !== "undefined") && ($fs !== null))
        {
            imgBase64 = "![" + $fs.filename + "]( data:image;base64," + $fs.base64 + ")";
            //return (isUndefined(fs.base64) || isNull(fs.base64))?'':fs.base64 ; //file.base64;
        }
        return imgBase64;
    }

    function insertText(text, objecto)
    {
        var input = objecto;
        if (input == undefined) {
            return;
        }
        var scrollPos = input.scrollTop;
        var pos = 0;
        var browser = ((input.selectionStart || input.selectionStart == "0") ?
            "ff" : (document.selection ? "ie" : false));
        if (browser == "ie") {
            input.focus();
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            pos = range.text.length;
        }
        else if (browser == "ff") {
            pos = input.selectionStart
        }
        ;
        var front = (input.value).substring(0, pos);
        var back = (input.value).substring(pos, input.value.length);
        input.value = front + text + back;
        pos = pos + text.length;
        if (browser == "ie") {
            input.focus();
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            range.moveStart("character", pos);
            range.moveEnd("character", 0);
            range.select();
        }
        else if (browser == "ff") {
            input.selectionStart = pos;
            input.selectionEnd = pos;
            input.focus();
        }
        input.scrollTop = scrollPos;
//        console.log(angular.element(input).val());
        angular.element(input).trigger('input');
    }



    function insertarEn(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }

    /*
     * funcion que sirve para ejecutar el <input type="file" id="fileImg" .. 
     * que se encuentra en el  archivo index.html, cuando se presiona sobre el <li> de la barra
     * generada por MarkItUp.js 
     */
    function abrirImagen()
    {
        angular.element("#fileImg").trigger('click');
    }

    function pdfDesdeHtml(html, nombrePdf)
    {

        var pdf = new jsPDF('p', 'pt', 'letter');

        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        var source = html;

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function(element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };

        margins = {
            top: 0,
            bottom: 0,
            left: 40,
            width: 545
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                'width': margins.width // max width of content on PDF
                , 'elementHandlers': specialElementHandlers
            },
        function(dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save(nombrePdf + '.pdf');
        },
            margins
            );
    }




