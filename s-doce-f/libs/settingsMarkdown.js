
// MarkDown tags example

    settingsMarkdown = {
        previewParserPath: '',
        onShiftEnter: {keepDefault: false, openWith: '\n\n'},
        markupSet: [
            {name: 'Título 1', key: '1', openWith: '# ', placeHolder: 'Escriba el título aquí...'},
            {name: 'Título 2', key: '2', openWith: '## ', placeHolder: 'Escriba el título aquí...'},
            {name: 'Título 3', key: '3', openWith: '### ', placeHolder: 'Escriba el título aquí...'},
            {name: 'Título 4', key: '4', openWith: '#### ', placeHolder: 'Escriba el título aquí...'},
            {name: 'Título 5', key: '5', openWith: '##### ', placeHolder: 'Escriba el título aquí...'},
            {name: 'Título 6', key: '6', openWith: '###### ', placeHolder: 'Escriba el título aquí...'},
            {separator: '---------------'},
            {name: 'Negrita', key: 'B', openWith: '**', closeWith: '**'},
            {name: 'Cursiva', key: 'K', openWith: '_', closeWith: '_'},
            {separator: '---------------'},
            {name: 'Lista viñetas', openWith: '- '},
            {name: 'Lista ordenada', openWith: function(markItUp) {
                    return markItUp.line + '. ';
                }},
            {separator: '---------------'},
//		{name:'Imagen', key:'P', replaceWith:'![[![texto alternativo]!]]([![Url:!:http://]!] "[![Title]!]")'},
            {name: 'Hipervinculo', key: 'L', openWith: '[', closeWith: ']([![Url:!:http://]!] "[![Title]!]")', placeHolder: 'Texto del link aquí...'},
            {name: 'Comentarios', openWith: '> '},
            {name: 'Bloque de código', openWith: '(!(\t|!|`)!)', closeWith: '(!(`)!)'},
            {separator: '---------------'}
//		{name:'Preview', call:'preview', className:"preview"}
        ]
    };

// mIu nameSpace to avoid conflict.
    miu = {
        markdownTitle: function(markItUp, char) {
            heading = '';
            n = $.trim(markItUp.selection || markItUp.placeHolder).length;
            for (i = 0; i < n; i++) {
                heading += char;
            }
            return '\n' + heading;
        }
    };