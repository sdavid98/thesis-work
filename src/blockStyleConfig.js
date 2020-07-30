import blockStyleValidations from "./blockStyleValidations";
import {
    changeImageAlt,
    changeImageInitialLoadBool,
    changeImageSourceUrl,
    changeItemBackColor,
    changeItemBorder,
    changeItemColor,
    changeItemFontSize,
    changeItemFontStyle,
    changeItemFontWeight,
    changeItemLineHeight,
    changeItemPadding,
    changeItemTextAlign,
    changeItemTextDecoration,
    changeItemTextDecorationColor,
    changeLink,
    changeLinkUnderlineDisplay, changeListInlineGap, changeListItemsGap, changeListSymbolImageStyle,
    changeListSymbolSign, changeListSymbolSize,
    changeListSymbolSrc,
    changeListSymbolTrailingChars,
    changeListSymbolType, changeListSymbolVerticalAlign, changeListSymbolVerticalAlignAdjustment,
    makeDragHeightReCalculate,
    resizeItem
} from "./actions";

const blockStyleConfig = [
    {
        id: 'padding',
        label: 'Padding',
        type: "radio",
        value: activeItem => {
            const padding = activeItem.rootElementStyle['padding'].split(' ');
            if (padding.every(val => val === padding[0])) return 'Allsame';
            if (padding[0] === padding[2] && padding[1] === padding[3]) return 'HorizontalandVertical';
            return 'Alldifferent'
        },
        change: (activeItem, childItemText, value = null) => {
            value === '' && (value = '0');
            const storedPadding = activeItem.rootElementStyle.padding.split(' ');
            let paddingValues = {
                'top': storedPadding[0],
                'right': storedPadding[1],
                'bottom': storedPadding[2],
                'left': storedPadding[3]
            };
            if (value === null) {
                const parentChangedPadding = {
                    'Allsame': () => {
                        paddingValues['right'] = paddingValues['top'];
                        paddingValues['bottom'] = paddingValues['top'];
                        paddingValues['left'] = paddingValues['top'];
                    },
                    'HorizontalandVertical': () => {
                        paddingValues['right'] = paddingValues['left'];
                        paddingValues['bottom'] = paddingValues['top'];
                    },
                    'Alldifferent': () => true
                };
                parentChangedPadding[childItemText]();
            }
            if (blockStyleValidations['number'](value)) {
                const parentChangedPadding = {
                    'Padding': () => {
                        paddingValues['top'] = value+'px';
                        paddingValues['right'] = value+'px';
                        paddingValues['bottom'] = value+'px';
                        paddingValues['left'] = value+'px';
                    },
                    'Vertical padding': () => {
                        paddingValues['top'] = value+'px';
                        paddingValues['bottom'] = value+'px';
                    },
                    'Horizontal padding': () => {
                        paddingValues['right'] = value+'px';
                        paddingValues['left'] = value+'px';
                    },
                    'Padding top': () => {
                        paddingValues['top'] = value+'px';
                    },
                    'Padding bottom': () => {
                        paddingValues['bottom'] = value+'px';
                    },
                    'Padding left': () => {
                        paddingValues['left'] = value+'px';
                    },
                    'Padding right': () => {
                        paddingValues['right'] = value+'px';
                    },
                };
                parentChangedPadding[childItemText]();
            }
            return changeItemPadding(activeItem.id, `${paddingValues['top']} ${paddingValues['right']} ${paddingValues['bottom']} ${paddingValues['left']}`);
        },
        childChange: true,
        hasAfterChangeFunction: true,
        afterChange: () => makeDragHeightReCalculate(true),
        items: [
            {
                label: "All same",
                type: "text",
                watch: 'padding',
                childInputs: [
                    {
                        label: "Padding",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[0]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    }
                ]
            },
            {
                label: "Horizontal and Vertical",
                type: "text",
                watch: 'padding',
                childInputs: [
                    {
                        label: "Vertical padding",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[0]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    },
                    {
                        label: "Horizontal padding",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[1]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    }
                ]
            },
            {
                label: "All different",
                type: "text",
                watch: 'padding',
                childInputs: [
                    {
                        label: "Padding top",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[0]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    },
                    {
                        label: "Padding bottom",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[2]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    },
                    {
                        label: "Padding left",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[3]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    },
                    {
                        label: "Padding right",
                        watch: 'padding',
                        displayLabel: true,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.padding.split(' ').length === 4) {
                                return parseInt(activeItem.rootElementStyle.padding.split(' ')[1]);
                            }
                            return activeItem.rootElementStyle.padding;
                        },
                    }
                ]
            }
        ]
    },
    {
        id: 'color',
        label: 'Color',
        displayLabel: false,
        type: 'text',
        watch: 'color',
        disabled: true,
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['color'](value)) {
                return changeItemColor(activeItem.id, value);
            }
        },
        childChange: false,
        value: activeItem => activeItem.rootElementStyle.color,
        displayColorPicker: true
    },
    {
        id: 'backgroundColor',
        label: 'Background color',
        displayLabel: false,
        type: 'text',
        watch: 'backgroundColor',
        disabled: true,
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['color'](value)) {
                return changeItemBackColor(activeItem.id, value);
            }
        },
        childChange: false,
        value: activeItem => activeItem.rootElementStyle.backgroundColor,
        displayColorPicker: true
    },
    {
        id: 'fontSize',
        label: 'Font size',
        displayLabel: false,
        type: 'text',
        watch: 'fontSize',
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['number'](value)) {
                return changeItemFontSize(activeItem.id, `${value}px`);
            }
            return changeItemFontSize(activeItem.id, activeItem.rootElementStyle.fontSize);
        },
        childChange: false,
        hasAfterChangeFunction: true,
        afterChange: () => makeDragHeightReCalculate(true),
        value: activeItem => parseInt(activeItem.rootElementStyle.fontSize)
    },
    {
        id: 'lineHeight',
        label: 'Line height',
        displayLabel: false,
        type: 'text',
        watch: 'lineHeight',
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['number'](value)) {
                return changeItemLineHeight(activeItem.id, `${value}px`);
            }
            return changeItemLineHeight(activeItem.id, activeItem.rootElementStyle.lineHeight);
        },
        childChange: false,
        hasAfterChangeFunction: true,
        afterChange: () => makeDragHeightReCalculate(true),
        value: activeItem => parseInt(activeItem.rootElementStyle.lineHeight)
    },
    {
        id: 'fontStyle',
        label: 'Font style',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const styleChanges = {
                'Bold' : changeItemFontWeight,
                'Italic': changeItemFontStyle,
                'Underline': changeItemTextDecoration,
                'Underline color': changeItemTextDecorationColor
            };
            const styleValues = {
                'Bold': () => value ? 'bold' : 'normal',
                'Italic': () => value ? 'italic' : 'normal',
                'Underline': () => value ? 'underline' : 'none',
                'Underline color': () => blockStyleValidations['color'](value) ? value : activeItem.rootElementStyle['textDecorationColor']
            };
            return styleChanges[itemText](activeItem.id, styleValues[itemText]());
        },
        childChange: true,
        items: [
            {
                label: 'Bold',
                watch: 'fontWeight',
                value: activeItem => activeItem.rootElementStyle.fontWeight !== 'normal',
                childInputs: []
            },
            {
                label: 'Italic',
                watch: 'fontStyle',
                value: activeItem => activeItem.rootElementStyle.fontStyle !== 'normal',
                childInputs: []
            },
            {
                label: 'Underline',
                watch: 'textDecorationLine',
                value: activeItem => activeItem.rootElementStyle.textDecorationLine !== 'none',
                type: 'text',
                childInputs: [
                    {
                        label: 'Underline color',
                        displayLabel: true,
                        watch: 'textDecorationColor',
                        disabled: true,
                        value: activeItem => activeItem.rootElementStyle.textDecorationColor,
                        displayColorPicker: true
                    }
                ]
            }
        ]
    },
    {
        id: 'textAlign',
        label: 'Text align',
        type: 'radio',
        change: (activeItem, itemText, value) => {
            return changeItemTextAlign(activeItem.id, value.toLowerCase());
        },
        value: activeItem => activeItem.rootElementStyle['textAlign'].replace(/^\w/, (c) => c.toUpperCase()),
        childChange: false,
        items: [
            {
                label: 'Left',
                value: activeItem => activeItem.rootElementStyle.textAlign === 'left',
            },
            {
                label: 'Center',
                value: activeItem => activeItem.rootElementStyle.textAlign === 'center',
            },
            {
                label: 'Right',
                value: activeItem => activeItem.rootElementStyle.textAlign === 'right',
            },
            {
                label: 'Justify',
                value: activeItem => activeItem.rootElementStyle.textAlign === 'justify'
            }
        ]
    },
    {
        id: 'border',
        label: 'Border',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const border = {
                'Displayborder': activeItem.rootElementStyle['border'].split(' ')[0],
                'Border color': activeItem.rootElementStyle['border'].split(' ')[1],
                'Border width': activeItem.rootElementStyle['border'].split(' ')[2]
            };
            const styleValues = {
                'Displayborder': () => value ? 'solid' : 'none',
                'Border width': () => blockStyleValidations['borderWidth'](value) ? `${value}px` : activeItem.rootElementStyle['border'].split(' ')[2],
                'Border color': () => value ? value : activeItem.rootElementStyle['border'].split(' ')[1]
            };
            border[itemText] = styleValues[itemText]();

            return changeItemBorder(activeItem.id, `${border['Displayborder']} ${border['Border color']} ${border['Border width']}`);
        },
        hasAfterChangeFunction: true,
        afterChange: () => makeDragHeightReCalculate(true),
        childChange: true,
        items: [
            {
                label: 'Display border',
                watch: 'border',
                disabled: false,
                displayLabel: false,
                value: activeItem => activeItem.rootElementStyle.border.split(' ')[0] !== 'none',
                type: 'text',
                childInputs: [
                    {
                        label: 'Border color',
                        watch: 'border',
                        disabled: true,
                        displayLabel: false,
                        hasAfterChangeFunction: false,
                        value: activeItem => {
                            if (activeItem.rootElementStyle.border.split(' ').length === 3) {
                                return activeItem.rootElementStyle.border.split(' ')[1];
                            }
                            return activeItem.rootElementStyle.border;
                        },
                        displayColorPicker: true
                    },
                    {
                        label: 'Border width',
                        watch: 'border',
                        disabled: false,
                        displayLabel: false,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeDragHeightReCalculate(true),
                        value: activeItem => {
                            if (activeItem.rootElementStyle.border.split(' ').length === 3) {
                                return parseInt(activeItem.rootElementStyle.border.split(' ')[2]);
                            }
                            return parseInt(activeItem.rootElementStyle.border);
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'linkUnderline',
        label: 'Link underline',
        displayLabel: true,
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            return changeLinkUnderlineDisplay(activeItem.id, value);
        },
        childChange: false,
        condition: activeItem => activeItem.content.text.indexOf('</a>') > 0 || activeItem.type === 'button',
        items: [
            {
                label: 'Underline',
                watch: 'underlineLinksIfPresent',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => activeItem.underlineLinksIfPresent,
                childInputs: []
            }
        ]
    },
    {
        id: 'size',
        label: 'Size',
        displayLabel: true,
        type: 'text',
        change: (activeItem, itemText, value) => {
            return resizeItem(activeItem.id, {width: parseInt(value), height: activeItem.height});
        },
        childChange: true,
        condition: false,
        items: [
            {
                label: 'Width',
                watch: 'width',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: true,
                afterChange: () => makeDragHeightReCalculate(true),
                value: activeItem => activeItem.width,
                childInputs: []
            },
            {
                label: 'Height',
                watch: 'height',
                disabled: true,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => activeItem.height,
                childInputs: []
            }
        ]
    },
    {
        id: 'spacerSize',
        label: 'Size',
        displayLabel: true,
        type: 'text',
        change: (activeItem, itemText, value) => {
            console.log(itemText, value);
            const options = {
                'Width': resizeItem(activeItem.id, {width: parseInt(value), height: activeItem.height}),
                'Height': resizeItem(activeItem.id, {width: activeItem.width, height: parseInt(value)})
            };
            return options[itemText];
        },
        childChange: true,
        condition: false,
        items: [
            {
                label: 'Width',
                watch: 'width',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => activeItem.width,
                childInputs: []
            },
            {
                label: 'Height',
                watch: 'height',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => activeItem.height,
                childInputs: []
            }
        ]
    },
    {
        id: 'sourceUrl',
        label: 'Image source url',
        displayLabel: true,
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeImageSourceUrl(activeItem.id, value);
        },
        childChange: false,
        condition: false,
        items: [
            {
                label: 'Url',
                watch: 'imageSrc',
                disabled: false,
                displayLabel: false,
                hideEndAdornment: true,
                hasAfterChangeFunction: true,
                afterChange: (id) => changeImageInitialLoadBool(id, true),
                value: activeItem => activeItem.content.imageSrc,
                childInputs: []
            }
        ]
    },
    {
        id: 'imageAlt',
        label: 'Image alt description',
        displayLabel: true,
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeImageAlt(activeItem.id, value);
        },
        childChange: false,
        condition: false,
        items: [
            {
                label: 'Alt',
                watch: 'imageAlt',
                disabled: false,
                displayLabel: false,
                hideEndAdornment: true,
                hasAfterChangeFunction: false,
                value: activeItem => activeItem.content.imageAlt,
                childInputs: []
            }
        ]
    },
    {
        id: 'imageLink',
        label: 'Image link',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const options = {
                'Createlinking': () => value ? activeItem.content.link || 'http://example.com' : value,
                'Link': () => value ? value : activeItem.content.link,
            };
            return changeLink(activeItem.id, options[itemText]());
        },
        childChange: true,
        items: [
            {
                label: 'Create linking',
                watch: 'link',
                value: activeItem => activeItem.content.link !== false,
                type: 'text',
                childInputs: [
                    {
                        label: 'Link',
                        displayLabel: true,
                        watch: 'link',
                        disabled: false,
                        hideEndAdornment: true,
                        value: activeItem => activeItem.content.link,
                    }
                ]
            }
        ]
    },
    {
        id: 'link',
        label: 'Link',
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeLink(activeItem.id, value);
        },
        childChange: false,
        items: [
            {
                label: 'Link',
                displayLabel: false,
                watch: 'link',
                value:  activeItem => activeItem.content.link,
                hideEndAdornment: true,
                childInputs: []
            }
        ]
    },
    {
        id: 'listSymbol',
        label: 'List symbol',
        type: 'select',
        change: (activeItem, text, value) => {
            if (text === 'Escape Sequence Unicode') {
                //console.log(unescape(value), /[^\u0000-\u00ff]/.test(unescape(value)));
                // if (/[^\u0000-\u00ff]/.test(value)) {
                     return changeListSymbolSign(activeItem.id, value);
                // }
                // return changeListSymbolSign(activeItem.id, activeItem.content.listSymbol.sign);
            }
            if (text === 'Image url') {
                return changeListSymbolSrc(activeItem.id, value);
            }
            return changeListSymbolType(activeItem.id, value);
        },
        value: activeItem => activeItem.content.listSymbol.type,
        childChange: true,
        items: [
            {
                label: 'Numeric',
                value: activeItem => activeItem.content.listSymbol.type === 'Numeric',
                childInputs: []
            },
            {
                label: 'Roman',
                value: activeItem => activeItem.content.listSymbol.type === 'Roman',
                childInputs: []
            },
            {
                label: 'Roman-upper',
                value: activeItem => activeItem.content.listSymbol.type === 'Roman-upper',
                childInputs: []
            },
            {
                label: 'Latin',
                value: activeItem => activeItem.content.listSymbol.type === 'Latin',
                childInputs: []
            },
            {
                label: 'Latin-upper',
                value: activeItem => activeItem.content.listSymbol.type === 'Latin-upper',
                childInputs: []
            },
            {
                label: 'Custom Unicode',
                value: activeItem => activeItem.content.listSymbol.type === 'Custom Unicode',
                childInputs: [
                    {
                        label: 'Escape Sequence Unicode',
                        displayLabel: true,
                        watch: 'sign',
                        disabled: false,
                        hideEndAdornment: true,
                        value: activeItem => activeItem.content.listSymbol.sign
                    }
                ]
            },
            {
                label: 'Custom Image',
                value: activeItem => activeItem.content.listSymbol.type === 'Custom Image',
                childInputs: [
                    {
                        label: 'Image url',
                        displayLabel: true,
                        watch: 'signSrc',
                        disabled: false,
                        hideEndAdornment: true,
                        value: activeItem => activeItem.content.listSymbol.signSrc
                    }
                ]
            }
        ]
    },
    {
        id: 'symbolImageHeight',
        label: 'Symbol image height',
        displayLabel: false,
        type: 'text',
        watch: 'symbolImageHeight',
        change: (activeItem, childItemText, value) => {
            return changeListSymbolImageStyle(activeItem.id, value+'px');
        },
        condition: activeItem => activeItem.content.listSymbol.type === 'Custom Image',
        hideEndAdornment: false,
        childChange: false,
        hasAfterChangeFunction: false,
        value: activeItem => parseInt(activeItem.content.listSymbol.imageStyle.symbolImageHeight)
    },
    {
        id: 'listSymbolVerticalAlign',
        label: 'Symbol vertical align',
        type: 'radio',
        change: (activeItem, itemText, value) => {
            const getValue = () => {
                if (value === 'Start') return 'start';
                if (value === 'Center') return 'center';
                if (value === 'End') return 'end';
            };
            return changeListSymbolVerticalAlign(activeItem.id, getValue());
        },
        value: activeItem => activeItem.content.listSymbol.style.listSymbolVerticalAlign.replace(/^\w/, (c) => c.toUpperCase()),
        childChange: false,
        items: [
            {
                label: 'Start',
                value: activeItem => activeItem.content.listSymbol.style.listSymbolVerticalAlign === 'start',
            },
            {
                label: 'Center',
                value: activeItem => activeItem.content.listSymbol.style.listSymbolVerticalAlign === 'center',
            },
            {
                label: 'End',
                value: activeItem => activeItem.content.listSymbol.style.listSymbolVerticalAlign === 'end',
            }
        ]
    },
    {
        id: 'listSymbolPaddingTop',
        label: 'Symbol vertical adjustment',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const options = {
                'Adjustsymbol spacing': () => value ? activeItem.content.listSymbol.style.listSymbolPaddingTop : 0,
                'Extra top': () => value ? value : activeItem.content.listSymbol.style.listSymbolPaddingTop,
            };
            return changeListSymbolVerticalAlignAdjustment(activeItem.id, options[itemText]()+'px');
        },
        childChange: true,
        items: [
            {
                label: 'Adjust symbol spacing',
                watch: 'listSymbolPaddingTop',
                value: activeItem => activeItem.content.listSymbol.style.listSymbolPaddingTop !== '0px',
                type: 'text',
                childInputs: [
                    {
                        label: 'Extra top',
                        displayLabel: true,
                        watch: 'listSymbolPaddingTop',
                        disabled: false,
                        hideEndAdornment: false,
                        value: activeItem => parseInt(activeItem.content.listSymbol.style.listSymbolPaddingTop),
                    }
                ]
            }
        ]
    },
    {
        id: 'listSymbolSize',
        label: 'Symbol size',
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeListSymbolSize(activeItem.id, value+'px');
        },
        condition: activeItem => activeItem.content.listSymbol.type !== 'Custom Image',
        childChange: false,
        items: [
            {
                label: 'Size',
                displayLabel: false,
                watch: 'symbolSize',
                value: activeItem => parseInt(activeItem.content.listSymbol.style.symbolSize),
                hideEndAdornment: false,
                childInputs: []
            }
        ]
    },
    {
        id: 'listSymbolTrailingCharacters',
        label: 'Symbol trailing characters',
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeListSymbolTrailingChars(activeItem.id, value);
        },
        condition: activeItem => activeItem.content.listSymbol.type !== 'Custom Image',
        childChange: false,
        items: [
            {
                label: 'Trailing characters',
                displayLabel: false,
                watch: 'trailingCharacters',
                value: activeItem => activeItem.content.listSymbol.trailingCharacters,
                hideEndAdornment: true,
                childInputs: []
            }
        ]
    },
    {
        id: 'listItemsGap',
        label: 'Gap between list items',
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeListItemsGap(activeItem.id, value+'px');
        },
        childChange: false,
        items: [
            {
                label: 'Items gap',
                displayLabel: false,
                watch: 'listItemGap',
                value: activeItem => parseInt(activeItem.content.listSymbol.style.listItemGap),
                hideEndAdornment: false,
                childInputs: []
            }
        ]
    },
    {
        id: 'listInlineGap',
        label: 'Gap between symbol and text',
        type: 'text',
        change: (activeItem, itemText, value) => {
            return changeListInlineGap(activeItem.id, value+'px');
        },
        childChange: false,
        items: [
            {
                label: 'Inline gap',
                displayLabel: false,
                watch: 'inlineGap',
                value: activeItem => parseInt(activeItem.content.listSymbol.style.inlineGap),
                hideEndAdornment: false,
                childInputs: []
            }
        ]
    },
];

export default  blockStyleConfig;