const fakeStyle = {
  color: 'red'
};

const text = item => {
    const div = document.createElement('div');
    div.innerHTML = item.content.text;

    const children = [...div.childNodes];

    div.innerHTML = children.map(node => {
        Object.keys(item.rootElementStyle).map(key => {
            //TODO: filter style of unused + incorrect items
            node.style[key] = item.rootElementStyle[key];
        });
        console.log(node);
        return node.outerHTML;
    });
    console.log(div.innerHTML);

    return div.innerHTML;
};

export default text;