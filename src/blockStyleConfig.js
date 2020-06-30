const blockStyleConfig = [
    {
        id: 'spacing',
        outlineText: 'Padding',
        validation: 'fn',
        change: 'fn',
        items: [
            {
                text: "All same",
                type: "radio",
                childInputs: [
                    {
                        text: "padding",
                        type: "input"
                    }
                ]
            },
            {
                text: "Horizontal & Vertical",
                type: "radio",
                childInputs: [
                    {
                        text: "Horizontal padding",
                        type: "input"
                    },
                    {
                        text: "Vertical padding",
                        type: "input"
                    }
                ]
            },
            {
                text: "All different",
                type: "radio",
                childInputs: [
                    {
                        text: "padding-top",
                        type: "input"
                    },
                    {
                        text: "padding-bottom",
                        type: "input"
                    },
                    {
                        text: "padding-left",
                        type: "input"
                    },
                    {
                        text: "padding-right",
                        type: "input"
                    }
                ]
            }
        ]
    }
];

export default  blockStyleConfig;