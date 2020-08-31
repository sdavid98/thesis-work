let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding'],
    'image': ['backgroundColor', 'border', 'padding', 'sourceUrl', 'imageAlt', 'imageLink'],
    'button': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'border', 'linkUnderline', 'link', 'spacerSize'],
    'list': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'border', 'linkUnderline', 'padding',
        'listSymbol','listSymbolTrailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop', 'listSymbolSize', 'listItemsGap', 'listInlineGap'],
    'divider': ['backgroundColor', 'spacerSize']
};

export default blockTypeConfig;