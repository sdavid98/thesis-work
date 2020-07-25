import blockStyleValidations from "./blockStyleValidations";
import {
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
    changeLinkUnderlineDisplay, makeDragHeightReCalculate, resizeItem
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
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[0]);
                            }
                            return val;
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
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[0]);
                            }
                            return val;
                        },
                    },
                    {
                        label: "Horizontal padding",
                        watch: 'padding',
                        displayLabel: true,
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[1]);
                            }
                            return val;
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
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[0]);
                            }
                            return val;
                        },
                    },
                    {
                        label: "Padding bottom",
                        watch: 'padding',
                        displayLabel: true,
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[2]);
                            }
                            return val;
                        },
                    },
                    {
                        label: "Padding left",
                        watch: 'padding',
                        displayLabel: true,
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[3]);
                            }
                            return val;
                        },
                    },
                    {
                        label: "Padding right",
                        watch: 'padding',
                        displayLabel: true,
                        value: val => {
                            if (val.split(' ').length === 4) {
                                return parseInt(val.split(' ')[1]);
                            }
                            return val;
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
        value: val => val,
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
        value: val => val,
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
        value: val => parseInt(val)
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
        value: val => parseInt(val)
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
                value: val => val !== 'normal',
                childInputs: []
            },
            {
                label: 'Italic',
                watch: 'fontStyle',
                value: val => val !== 'normal',
                childInputs: []
            },
            {
                label: 'Underline',
                watch: 'textDecorationLine',
                value: val => val !== 'none',
                type: 'text',
                childInputs: [
                    {
                        label: 'Underline color',
                        displayLabel: true,
                        watch: 'textDecorationColor',
                        disabled: true,
                        value: val => val,
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
                value: val => val === 'left',
            },
            {
                label: 'Center',
                value: val => val === 'center',
            },
            {
                label: 'Right',
                value: val => val === 'right',
            },
            {
                label: 'Justify',
                value: val => val === 'justify'
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
        childChange: true,
        items: [
            {
                label: 'Display border',
                watch: 'border',
                disabled: false,
                displayLabel: false,
                hasAfterChangeFunction: false,
                value: val => val.split(' ')[0] !== 'none',
                type: 'text',
                childInputs: [
                    {
                        label: 'Border color',
                        watch: 'border',
                        disabled: true,
                        displayLabel: false,
                        hasAfterChangeFunction: false,
                        value: val => {
                            if (val.split(' ').length === 3) {
                                return val.split(' ')[1];
                            }
                            return val;
                        },
                        displayColorPicker: true
                    },
                    {
                        label: 'Border width',
                        watch: 'border',
                        disabled: false,
                        displayLabel: false,
                        hasAfterChangeFunction: false,
                        value: val => {
                            if (val.split(' ').length === 3) {
                                return parseInt(val.split(' ')[2]);
                            }
                            return parseInt(val);
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
        childChange: true,
        condition: activeItem => activeItem.content.text.indexOf('</a>') > 0,
        items: [
            {
                label: 'Underline',
                watch: 'underlineLinksIfPresent',
                disabled: false,
                displayLabel: false,
                hasAfterChangeFunction: false,
                value: val => val,
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
                value: val => val,
                childInputs: []
            },
            {
                label: 'Height',
                watch: 'height',
                disabled: true,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: val => val,
                childInputs: []
            }
        ]
    },
];

export default  blockStyleConfig;