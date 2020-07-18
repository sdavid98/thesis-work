import blockStyleValidations from "./blockStyleValidations";
import {changeItemColor, changeItemPadding} from "./actions";

const blockStyleConfig = [
    {
        id: 'padding',
        label: 'Padding',
        type: "radio",
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
                text: "All same",
                type: "text",
                childInputs: [
                    {
                        text: "Padding",
                        value: fullPadding => parseInt(fullPadding.split(' ')[0])
                    }
                ]
            },
            {
                text: "Horizontal and Vertical",
                type: "text",
                childInputs: [
                    {
                        text: "Vertical padding",
                        value: fullPadding => parseInt(fullPadding.split(' ')[0])
                    },
                    {
                        text: "Horizontal padding",
                        value: fullPadding => parseInt(fullPadding.split(' ')[1])
                    }
                ]
            },
            {
                text: "All different",
                type: "text",
                childInputs: [
                    {
                        text: "Padding top",
                        value: fullPadding => parseInt(fullPadding.split(' ')[0])
                    },
                    {
                        text: "Padding bottom",
                        value: fullPadding => parseInt(fullPadding.split(' ')[2])
                    },
                    {
                        text: "Padding left",
                        value: fullPadding => parseInt(fullPadding.split(' ')[3])
                    },
                    {
                        text: "Padding right",
                        value: fullPadding => parseInt(fullPadding.split(' ')[1])
                    }
                ]
            }
        ]
    },
    {
        id: 'color',
        label: 'Color',
        type: 'text',
        change: (activeItem, childItemText, value) => {
            if (blockStyleValidations['color'](value)) {
                return changeItemColor(activeItem.id, value);
            }
        },
        childChange: false,
        value: val => val
    }
];

export default  blockStyleConfig;