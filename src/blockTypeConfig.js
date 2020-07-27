let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size'],
    'image': ['backgroundColor', 'border', 'padding', 'size', 'sourceUrl', 'imageAlt', 'imageLink'],
    'button': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size', 'link'],
    'list': [/*'color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size',*/
        'listSymbol','trailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop']
};

export default blockTypeConfig;