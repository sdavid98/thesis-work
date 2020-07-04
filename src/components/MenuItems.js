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
import {useDispatch} from "react-redux";



const MenuItems = () => {
    const dispatch = useDispatch();

    const items = [
        {
            name: "text",
            icon: <FolderIcon />,
            action: (name) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''))
        },
        {
            name: "image",
            icon: <FolderIcon />,
            action: (name) => createImageDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''))
        },
        {
            name: "button",
            icon: <FolderIcon />,
            action: (name) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''))
        },
        {
            name: "list",
            icon: <FolderIcon />,
            action: (name) => createListDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''))
        },
        {
            name: "divider",
            icon: <FolderIcon />,
            action: (name) => createBasicDraggable(name, Date.now().toString().substr(-8).split('').map(s => String.fromCharCode(Number(s)+65)).join(''))
        }
    ];

    return (
        <List>
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
                            <IconButton edge="end" aria-label="add" onClick={() => dispatch(item.action(item.name))}>
                                <AddCircleOutlineOutlinedIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            )}
        </List>
    )
};

export default MenuItems;