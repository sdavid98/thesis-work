let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding'],
    'image': ['backgroundColor', 'border', 'padding', 'sourceUrl', 'imageAlt', 'imageLink'],
    'button': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'border', 'linkUnderline', 'link', 'spacerSize'],
    'list': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding',
        'listSymbol','listSymbolTrailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop', 'listSymbolSize', 'listItemsGap', 'listInlineGap'],
    'divider': ['backgroundColor', 'spacerSize']
};

export default blockTypeConfig;