let blockTypeConfig = {
    'text': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size'],
    'image': ['backgroundColor', 'border', 'padding', 'size', 'sourceUrl', 'imageAlt', 'imageLink'],
    'button': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size', 'link'],
    'list': ['color', 'backgroundColor', 'fontSize', 'lineHeight', 'fontStyle', 'textAlign', 'border', 'linkUnderline', 'padding', 'size',
        'listSymbol','listSymbolTrailingCharacters', 'symbolImageHeight', 'listSymbolVerticalAlign', 'listSymbolPaddingTop', 'listSymbolSize', 'listItemsGap', 'listInlineGap'],
    'divider': ['backgroundColor', 'spacerSize']
};

export default blockTypeConfig;