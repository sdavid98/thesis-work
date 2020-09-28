let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'textAlign', 'padding'],
    'image': ['backgroundColor', 'padding', 'sourceUrl', 'imageAlt', 'imageLink'],
    'button': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'link', 'spacerSize'],
    'list': ['color', 'backgroundColor', 'fontSize', 'fontStyle', 'padding',
        'listSymbol','listSymbolTrailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop', 'listSymbolSize', 'listItemsGap', 'listInlineGap'],
    'divider': ['backgroundColor', 'spacerSize']
};

export default blockTypeConfig;