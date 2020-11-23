import {changeRowAlign, changeRowBackColor} from "../actions";
import blockStyleValidations from "./blockStyleValidations";

const rowOptions = [
    {
        id: 'justifyContent',
        label: 'Horizontal align',
        type: 'radio',
        change: (activeItem, itemText, value) => {
            return changeRowAlign(activeItem.id, value.toLowerCase());
        },
        value: activeItem => activeItem.justifyContent.replace(/^\w/, (c) => c.toUpperCase()),
        childChange: false,
        items: [
            {
                label: 'Left',
                value: activeItem => activeItem.justifyContent === 'left',
            },
            {
                label: 'Center',
                value: activeItem => activeItem.justifyContent === 'center',
            },
            {
                label: 'Right',
                value: activeItem => activeItem.justifyContent === 'right',
            }
        ]
    },
    {
        id: 'background',
        label: 'Background color',
        type: 'checkbox',
        change: (activeItem, itemText, value) => {
            const getValue = () => {
                if (value) {
                    if (!blockStyleValidations['color'](value)) {
                        return 'true ' + activeItem.backgroundColor.split(' ')[1];
                    }
                    return 'true ' + value;
                }
                return 'none ' + activeItem.backgroundColor.split(' ')[1];
            };
            return changeRowBackColor(activeItem.id, getValue());
        },
        hasAfterChangeFunction: false,
        childChange: true,
        items: [
            {
                label: 'Colored Background',
                watch: 'border',
                disabled: false,
                displayLabel: false,
                value: activeItem => activeItem.backgroundColor.split(' ')[0] !== 'none',
                type: 'text',
                childInputs: [
                    {
                        label: 'Background color',
                        watch: 'border',
                        disabled: true,
                        displayLabel: false,
                        hasAfterChangeFunction: false,
                        value: activeItem => activeItem.backgroundColor.split(' ')[1],
                        displayColorPicker: true
                    }
                ]
            }
        ]
    },
];

export default rowOptions;