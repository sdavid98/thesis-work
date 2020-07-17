const blockStyleValidations = {
    'color': hex => /^#([0-9a-f]{3}){1,2}$/i.test(hex),
    'number': num => !isNaN(parseInt(num))
};

export default blockStyleValidations;