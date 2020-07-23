const blockStyleValidations = {
    'color': hex => /^#([0-9a-f]{3}){1,2}$/i.test(hex),
    'number': num => !isNaN(parseInt(num)),
    'borderWidth': num => !isNaN(parseInt(num)) && num <= 8
};

export default blockStyleValidations;