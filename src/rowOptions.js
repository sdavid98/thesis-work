import {changeRowBackColor} from "./actions";
import blockStyleValidations from "./blockStyleValidations";

const rowOptions = [
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