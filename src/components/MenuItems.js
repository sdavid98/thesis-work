import React from "react";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {createBasicDraggable, createImageDraggable, createListDraggable} from "../actions";
import {useDispatch, useSelector} from "react-redux";



const MenuItems = (props) => {
    const dispatch = useDispatch();
    const drags = useSelector(state => state.draggables);

    const items = [
        {
            name: "text",
            icon: <FolderIcon />,
            action: (name, y) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''), y)
        },
        {
            name: "image",
            icon: <FolderIcon />,
            action: (name, y) => createImageDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''), y)
        },
        {
            name: "button",
            icon: <FolderIcon />,
            action: (name, y) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''), y)
        },
        {
            name: "list",
            icon: <FolderIcon />,
            action: (name, y) => createListDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''), y)
        },
        {
            name: "divider",
            icon: <FolderIcon />,
            action: (name, y) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''), y)
        }
    ];

    const handleClick = item => {
        let newItemY = 0;
        drags.map(drag => {
            if (drag.y + drag.height > newItemY) {
                newItemY = drag.y + drag.height + 1;
            }
        });
        dispatch(item.action(item.name, newItemY));
    };

    return (
        <button onClick={props.modalOpener} >ADD</button>
        /*<List>
            {items.map((item, index) => (
                    <ListItem key={index} classes={{container: "list-item"}}>
                        <ListItemAvatar>
                            <Avatar>
                                {item.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add" onClick={() => handleClick(item)}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            )}
        </List>*/
    )
};

export default MenuItems;