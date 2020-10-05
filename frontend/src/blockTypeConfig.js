let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'textAlign', 'padding', 'border'],
    'image': ['backgroundColor', 'padding', 'sourceUrl', 'imageAlt', 'imageLink', 'border'],
    'button': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'link', 'spacerSize', 'border', 'borderRadius'],
    'list': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'padding',
        'listSymbol','listSymbolTrailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop',
        'listSymbolSize', 'listItemsGap', 'listInlineGap', 'border'],
    'divider': ['backgroundColor', 'spacerSize']
};

export default blockTypeConfig;