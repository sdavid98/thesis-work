import blockStyleValidations from "./blockStyleValidations";
import {
    changeCanvasBackColor,
    changeCanvasForeColor,
    changeCanvasWidth, changeCanvasWidthMobile,
} from "../actions";

const canvasOptions = [
    {
        id: 'size',
        label: 'Size',
        displayLabel: true,
        type: 'text',
        change: (state, itemText, value) => {
            return changeCanvasWidth(parseInt(value)+'px');
        },
        childChange: true,
        condition: viewMode => {
            return viewMode === 'desktop'},
        items: [
            {
                label: 'Width',
                watch: 'width',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => parseInt(activeItem.canvasStyle.width),
                childInputs: []
            }
        ]
    },
    {
        id: 'size',
        label: 'Size',
        displayLabel: true,
        type: 'text',
        change: (state, itemText, value) => {
            return changeCanvasWidthMobile(parseInt(value)+'px');
        },
        childChange: true,
        condition: viewMode => {
            return viewMode === 'mobile'},
        items: [
            {
                label: 'Width',
                watch: 'width',
                disabled: false,
                displayLabel: true,
                hasAfterChangeFunction: false,
                value: activeItem => parseInt(activeItem.canvasStyle.widthMobile),
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
];

export default  canvasOptions;