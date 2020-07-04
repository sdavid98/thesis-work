const blockStyleConfig = [
    {
        id: 'padding',
        label: 'Padding',
        type: "radio",
        validation: 'fn',
        change: 'fn',
        childChange: 'fn',
        items: [
            {
                text: "All same",
                type: "text",
                childInputs: [
                    {
                        text: "Padding",
                    }
                ]
            },
            {
                text: "Horizontal and Vertical",
                type: "text",
                childInputs: [
                    {
                        text: "Horizontal padding",
                    },
                    {
                        text: "Vertical padding",
                    }
                ]
            },
            {
                text: "All different",
                type: "text",
                childInputs: [
                    {
                        text: "Padding top",
                    },
                    {
                        text: "Padding bottom",
                    },
                    {
                        text: "Padding left",
                    },
                    {
                        text: "Padding right",
                    }
                ]
            }
        ]
    }
];

export default  blockStyleConfig;