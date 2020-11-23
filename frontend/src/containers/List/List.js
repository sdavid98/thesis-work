import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "./ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import {addNewListItem, changeListItems, changeListSymbolWidth} from "../../store/actions";

const useStyles = makeStyles({
    icon: {
        height: 20,
        width: 20,
        minHeight: 20,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99
    },
    item: {
        display: 'grid',
        justifyContent: 'left'
    }
});

const convertToRoman = (num) => {
    const arrConv = {
            0: { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' },
            1: { 1: 'X', 2: 'XX', 3: 'XXX', 4: 'XL', 5: 'L', 6: 'LX', 7: 'LXX', 8: 'LXXX', 9: 'XC' },
            2: { 1: 'C', 2: 'CC', 3: 'CCC', 4: 'CD', 5: 'D', 6: 'DC', 7: 'DCC', 8: 'DCCC', 9: 'CM' },
            3: { 1: 'M', 2: 'MM', 3: 'MMM', 4: 'MMMM', 5: 'MMMMM', 6: 'MMMMMM', 7: 'MMMMMMM', 8: 'MMMMMMMM', 9: 'MMMMMMMMM' }
        },
        arr = num.toString().split("").reverse(),
        romansArray = arr.map(function (a, i) {
            return arrConv[i][a] || '';
        });

    return romansArray.reverse().join("");
};

const getListSign = (index, item) => {
    if (item.content.listSymbol.type === 'Numeric') {
        return index+1;
    }
    if (item.content.listSymbol.type.indexOf('Latin') >= 0) {
        return item.content.listSymbol.type.indexOf('upper') >= 0 ? String.fromCharCode(Number(index)+65) : String.fromCharCode(Number(index)+97);
    }
    if (item.content.listSymbol.type.indexOf('Roman') >= 0) {
        return item.content.listSymbol.type.indexOf('upper') >= 0 ? convertToRoman(index+1) : convertToRoman(index+1).toLowerCase();
    }
    if (item.content.listSymbol.type === 'Custom Image') {
        return <img style={{width: 'auto', height: item.content.listSymbol.imageStyle.symbolImageHeight}} src={item.content.listSymbol.signSrc} alt='*' />;
    }
    return String.fromCharCode(item.content.listSymbol.sign.split('+')[1].toLowerCase().split('').reduce( (result, ch) =>
        result * 16 + '0123456789abcdefgh'.indexOf(ch), 0));
};

const getTrailingCharacters = (item) => {
    if (item.content.listSymbol.trailingCharacters !== '' && item.content.listSymbol.type !== 'Custom Image') {
        return item.content.listSymbol.trailingCharacters;
    }
    return '';
};

const List = (props) => {
    const dispatch = useDispatch();
    const ref = useRef([]);
    const activeItemId = useSelector(state => state.items.activeItemId);
    const activeItem = useSelector(state => state.items.draggables).find(drag => drag.id === activeItemId);
    const classes = useStyles();
    const [activeListItemNum, setActiveListItemNum] = useState(null);
    const [listItemNum, setListItemNum] = useState(1);

    useEffect(() => {
        if (activeItemId && activeItem.type === 'list' && ref.current[activeItemId] && Math.ceil(ref.current[activeItemId].getBoundingClientRect().width) !== activeItem.content.listSymbol.style.width) {
            dispatch(changeListSymbolWidth(activeItemId, Math.ceil(ref.current[activeItemId].getBoundingClientRect().width)));
        }
    });

    const addNewItem = () => {
        setListItemNum(listItemNum + 1);
        dispatch(addNewListItem(activeItemId, '<p>Change me</p>'));
    };

    const handleListItemChange = (index, content) => {
        let items = [...props.item.content.text];
        items[index] = content;
        dispatch(changeListItems(activeItemId, items));
    };

    const deleteListItem = (index) => {
        let items = [...props.item.content.text];
        items.splice(index, 1);
        setListItemNum(listItemNum - 1);
        dispatch(changeListItems(activeItemId, items));
    };

    const listItems = props.item.content.text.map((text, index) => (
        <React.Fragment key={index}>
            <div ref={el => ref.current[props.item.id] = el} style={{
                paddingTop: props.item.content.listSymbol.style.listSymbolPaddingTop,
                fontSize: props.item.content.listSymbol.style.symbolSize,
                lineHeight: 1.2
            }}>
                {getListSign(index, props.item)}{getTrailingCharacters(props.item)}
            </div>
            <ListItem
                itemNum={listItemNum}
                blokkId={props.item.id}
                index={index}
                activeListItemNum={activeListItemNum}
                click={setActiveListItemNum}
                change={handleListItemChange}
                delete={deleteListItem}
                text={text}
            />
        </React.Fragment>
    ));

    const getAddIcon = () => {
        if (activeItemId === props.item.id) {
            return (
                <Fab
                    className={classes.icon}
                    color="primary"
                    aria-label="add"
                    onClick={addNewItem}
                >
                    <AddIcon/>
                </Fab>
            );
        }
    };

    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridRowGap: props.item.content.listSymbol.style.listItemGap,
                    alignItems: props.item.content.listSymbol.style.listSymbolVerticalAlign,
                    gridColumnGap: props.item.content.listSymbol.style.inlineGap,
                    gridTemplateColumns: `auto 1fr`
                }}
            >
                {listItems}
            </div>
            {getAddIcon()}
        </>
    );
};

export {List as default, convertToRoman, getListSign, getTrailingCharacters};