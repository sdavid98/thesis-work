let blockStyleValidations = new Map();
blockStyleValidations.set('color', hex => /^#([0-9a-f]{3}){1,2}$/i.test(hex));
blockStyleValidations.set('number', num => !isNaN(parseInt(num)));


export default blockStyleValidations;