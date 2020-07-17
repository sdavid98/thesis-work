import blockStyleValidations from "./blockStyleValidations";
import {changeItemPadding} from "./actions";

const blockStyleConfig = [
    {
        id: 'padding',
        label: 'Padding',
        type: "radio",
        change: (activeItem, childItemText, value = null) => {
            if (!value) {
                console.log('!value', childItemText);
                if (childItemText === 'Allsame') {
                    const verticalPadding = activeItem.rootElementStyle.padding.split(' ')[0];
                    return changeItemPadding(activeItem.id, `${verticalPadding} ${verticalPadding} ${verticalPadding} ${verticalPadding}`);
                }
                if (childItemText === 'HorizontalandVertical') {
                    const verticalPadding = activeItem.rootElementStyle.padding.split(' ')[0];
                    const horizontalPadding = activeItem.rootElementStyle.padding.split(' ')[3];
                    return changeItemPadding(activeItem.id, `${verticalPadding} ${horizontalPadding} ${verticalPadding} ${horizontalPadding}`);
                }
                if (childItemText === 'Alldifferent') {
                    const padding = activeItem.rootElementStyle.padding.split(' ');
                    return changeItemPadding(activeItem.id, `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`);
                }
            }
            if (blockStyleValidations['number'](value)) {
                if (childItemText === 'Padding') {
                    return changeItemPadding(activeItem.id, `${value}px ${value}px ${value}px ${value}px`);
                }
                if (childItemText === 'Vertical padding') {
                    const horizontalPadding = activeItem.rootElementStyle.padding.split(' ')[1];
                    return changeItemPadding(activeItem.id, `${value}px ${horizontalPadding} ${value}px ${horizontalPadding}`);
                }
                if (childItemText === 'Horizontal padding') {
                    const verticalPadding = activeItem.rootElementStyle.padding.split(' ')[0];
                    return changeItemPadding(activeItem.id, `${verticalPadding} ${value}px ${verticalPadding} ${value}px`);
                }
                if (childItemText === 'Padding top') {
                    const padding = activeItem.rootElementStyle.padding.split(' ');
                    return changeItemPadding(activeItem.id, `${value}px ${padding[1]} ${padding[2]} ${padding[3]}`);
                }
                if (childItemText === 'Padding bottom') {
                    const padding = activeItem.rootElementStyle.padding.split(' ');
                    return changeItemPadding(activeItem.id, `${padding[0]} ${padding[1]} ${value}px ${padding[3]}`);
                }
                if (childItemText === 'Padding left') {
                    const padding = activeItem.rootElementStyle.padding.split(' ');
                    return changeItemPadding(activeItem.id, `${padding[0]} ${padding[1]} ${padding[2]} ${value}px`);
                }
                if (childItemText === 'Padding right') {
                    const padding = activeItem.rootElementStyle.padding.split(' ');
                    return changeItemPadding(activeItem.id, `${padding[0]} ${value}px ${padding[2]} ${padding[3]}`);
                }
            }
            return;
        },
        childChange: true,
        items: [
            {
                text: "All same",
                type: "text",
                childInputs: [
                    {
                        text: "Padding",
                        value: fullPadding => fullPadding.split(' ')[0]
                    }
                ]
            },
            {
                text: "Horizontal and Vertical",
                type: "text",
                childInputs: [
                    {
                        text: "Vertical padding",
                        value: fullPadding => fullPadding.split(' ')[0]
                    },
                    {
                        text: "Horizontal padding",
                        value: fullPadding => fullPadding.split(' ')[1]
                    }
                ]
            },
            {
                text: "All different",
                type: "text",
                childInputs: [
                    {
                        text: "Padding top",
                        value: fullPadding => fullPadding.split(' ')[0]
                    },
                    {
                        text: "Padding bottom",
                        value: fullPadding => fullPadding.split(' ')[2]
                    },
                    {
                        text: "Padding left",
                        value: fullPadding => fullPadding.split(' ')[3]
                    },
                    {
                        text: "Padding right",
                        value: fullPadding => fullPadding.split(' ')[1]
                    }
                ]
            }
        ]
    }
];

export default  blockStyleConfig;