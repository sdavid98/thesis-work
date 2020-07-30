import blockStyleValidations from "./blockStyleValidations";
import {
    changeCanvasBackColor,
    changeCanvasBorder,
    changeCanvasForeColor,
    changeCanvasHeight,
    changeCanvasWidth,
    makeCanvasDimensionsReCalculate,
} from "./actions";

const canvasOptions = [
    {
        id: 'size',
        label: 'Size',
        displayLabel: true,
        type: 'text',
        change: (state, itemText, value) => {
            const options = {
                'Width': changeCanvasWidth(parseInt(value)+'px'),
                'Height': changeCanvasHeight(parseInt(value)+'px')
            };

            if (state.draggables.length > 0) {
                if (blockStyleValidations['canvasHeight'](state.draggables, value)) {
                    return options[itemText];
                }
                return false;
            }
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
                value: activeItem => parseInt(activeItem.canvasStyle.width),
                childInputs: []
            },
            {
                label: 'Height',
                watch: 'height',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => parseInt(activeItem.canvasStyle.height),
                childInputs: []
            }
        ]
    },
    {
        id: 'backgroundColor',
        label: 'Background color',
        displayLabel: false,
        type: 'text',
        watch: 'backColor',
        disabled: true,
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['color'](value)) {
                return changeCanvasBackColor(value);
            }
        },
        childChange: false,
        value: val => val.canvasStyle.backColor,
        displayColorPicker: true
    },
    {
        id: 'canvasBackgroundColor',
        label: 'Canvas background color',
        displayLabel: false,
        type: 'text',
        watch: 'foreColor',
        disabled: true,
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['color'](value)) {
                return changeCanvasForeColor(value);
            }
        },
        childChange: false,
        value: activeItem => activeItem.canvasStyle.foreColor,
        displayColorPicker: true
    },
    {
        id: 'border',
        label: 'Border',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const border = {
                'Displayborder': activeItem.canvasStyle['border'].split(' ')[0],
                'Border color': activeItem.canvasStyle['border'].split(' ')[1],
                'Border width': activeItem.canvasStyle['border'].split(' ')[2]
            };
            const styleValues = {
                'Displayborder': () => value ? 'solid' : 'none',
                'Border width': () => blockStyleValidations['borderWidth'](value) ? `${value}px` : activeItem.canvasStyle['border'].split(' ')[2],
                'Border color': () => value ? value : activeItem.canvasStyle['border'].split(' ')[1]
            };
            border[itemText] = styleValues[itemText]();
            return changeCanvasBorder(`${border['Displayborder']} ${border['Border color']} ${border['Border width']}`);
        },
        hasAfterChangeFunction: true,
        afterChange: () => makeCanvasDimensionsReCalculate(true),
        childChange: true,
        items: [
            {
                label: 'Display border',
                watch: 'border',
                disabled: false,
                displayLabel: false,
                value: activeItem => activeItem.canvasStyle.border.split(' ')[0] !== 'none',

                type: 'text',
                childInputs: [
                    {
                        label: 'Border color',
                        watch: 'border',
                        disabled: true,
                        displayLabel: false,
                        hasAfterChangeFunction: false,
                        value: activeItem => {
                            if (activeItem.canvasStyle.border.split(' ').length === 3) {
                                return activeItem.canvasStyle.border.split(' ')[1];
                            }
                            return activeItem.canvasStyle.border;
                        },
                        displayColorPicker: true
                    },
                    {
                        label: 'Border width',
                        watch: 'border',
                        disabled: false,
                        displayLabel: false,
                        hasAfterChangeFunction: true,
                        afterChange: () => makeCanvasDimensionsReCalculate(true),
                        value: activeItem => {
                            if (activeItem.canvasStyle.border.split(' ').length === 3) {
                                return parseInt(activeItem.canvasStyle.border.split(' ')[2]);
                            }
                            return parseInt(activeItem.canvasStyle.border);
                        }
                    }
                ]
            }
        ]
    },
];

export default  canvasOptions;