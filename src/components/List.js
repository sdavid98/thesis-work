import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ListItem from "./ListItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import {addNewListItem, changeListItems, makeDragHeightReCalculate} from "../actions";

const useStyles = makeStyles({
    icon: {
        height: 20,
        width: 20,
        minHeight: 20,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    item: {
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        justifyContent: 'left'
    }
});

const List = (props) => {
    const dispatch = useDispatch();
    const activeItemId = useSelector(state => state.activeItemId);
    const classes = useStyles();
    const [activeListItemNum, setActiveListItemNum] = useState(null);
    const [listItemNum, setListItemNum] = useState(1);

    const addNewItem = () => {
        setListItemNum(listItemNum + 1);
        dispatch(addNewListItem(activeItemId, '<p>Change me</p>'));
        dispatch(makeDragHeightReCalculate(true));
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

    const getListSign = index => {
        if (props.item.content.listSymbol.signs[index]) {
            return props.item.content.listSymbol.signs[index];
        }

        return props.item.content.listSymbol.signs[0];
    };

    const listItems = props.item.content.text.map((text, index) => (
        <div key={index} className={classes.item}>
            <div>{getListSign(index)}</div>
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
        </div>
    ));

    const getAddIcon = () => {
        if (activeItemId === props.item.id) {
            return (
                <Fab className={classes.icon} color="primary" aria-label="add" onClick={addNewItem}>
                    <AddIcon/>
                </Fab>
            );
        }
    };

    return (
        <div>
            {listItems}
            {getAddIcon()}
        </div>
    );
};

export default List;