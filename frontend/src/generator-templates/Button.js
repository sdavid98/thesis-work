import {pushStyleOnElement, removeParentStyle, removeUnusedStyles, wrapContentWithBorder} from "./styleHelpers";

const additionalStyles = {
    display: 'block',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
};

const getTextStyle = ({color, fontSize, lineHeight, fontStyle, fontWeight}) => (
    `color: ${color}; font-size: ${fontSize}; mso-line-height-rule: exactly; line-height: ${lineHeight}; font-style: ${fontStyle}; font-weight: ${fontWeight}`
);

const button = (item, width) => {
    const hasBorder = item.rootElementStyle.border.split(' ')[0] !== 'none';

    const a = document.createElement('a');
    a.innerHTML = item.content.text;
    a.href = item.content.link;
    a.target = '_blank';
    a.style.textDecorationLine = 'none';

    const children = [...a.childNodes];

    a.innerHTML = children.filter(node => node.tagName).map(node => {
        const span = document.createElement('span');
        span.innerHTML = node.innerHTML;

        const itemStyle = removeParentStyle(removeUnusedStyles({...item.rootElementStyle}));
        span.style.fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
        Object.keys(itemStyle).map(key => {
            if (['display', 'height'].indexOf(key) < 0) {
                span.style[key] = itemStyle[key];
            }
        });

        return span.outerHTML;
    }).join('');

    const getBgColor = () => {
        if (item.rootElementStyle.backgroundColor.split(' ')[0] !== 'none') {
            return item.rootElementStyle.backgroundColor.split(' ')[1];
        }
        return 'none';
    };

    const getBorder = (border) => {
        if (hasBorder) {
            return 'stroke="f"';
        }
        return `strokecolor="${border.split(' ')[1]}" strokeweigth="${border.split(' ')[2]}"`;
    };

    const getBorderRadius = () => {
        if (item.rootElementStyle.borderRadius !== '0px') {
            return `arcsize="${Math.floor(parseInt(item.rootElementStyle.borderRadius) * 100 / Math.min(parseInt(item.rootElementStyle.height), width))}%"`;
        }
        return '';
    };

    const outerStyle = {...item.rootElementStyle};
    delete outerStyle.height;

    const span = document.createElement('span');
    span.innerHTML = item.content.text;

    let verticalPadding = 0;
    if (parseInt(item.rootElementStyle.height) > item.rootElementStyle.innerHeight) {
        verticalPadding = Math.floor((parseInt(item.rootElementStyle.height) - item.rootElementStyle.innerHeight) / 2);
        additionalStyles.padding = `${verticalPadding}px 0px`;
    }

    return `
        <!--[if (mso)|(IE)]>
        <v:${item.rootElementStyle.borderRadius === '0px' ? 'rect' : 'roundrect'} xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${item.content.link}" style="height:${parseInt(item.rootElementStyle.height) + parseInt(item.rootElementStyle.border.split(' ')[2]) * 2}px;v-text-anchor:middle;width:${width}px;" ${getBorder(item.rootElementStyle.border)} ${getBorderRadius()} fillcolor="${getBgColor()}">
            <v:textbox inset="0,0,0,0"> 
                <w:anchorlock/>
                <center style="${getTextStyle(item.rootElementStyle)}">${a.innerHTML}</center>
            </v:textbox>
        </v:${item.rootElementStyle.borderRadius === '0px' ? 'rect' : 'roundrect'}>
        <![endif]-->
        <!--[if (!mso)&(!IE)]>-->
        ${pushStyleOnElement(a, {...removeUnusedStyles(outerStyle), ...additionalStyles})}
        <![endif]-->`;
};

export default button;