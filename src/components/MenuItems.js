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
import {createDraggable} from "../actions";
import {useDispatch} from "react-redux";



const MenuItems = () => {
    const dispatch = useDispatch();

    const items = [
        {
            name: "text",
            icon: <FolderIcon />
        },
        {
            name: "image",
            icon: <FolderIcon />
        },
        {
            name: "button",
            icon: <FolderIcon />
        },
        {
            name: "list",
            icon: <FolderIcon />
        },
        {
            name: "divider",
            icon: <FolderIcon />
        },
        {
            name: "template block",
            icon: <FolderIcon />
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
                            <IconButton edge="end" aria-label="add" onClick={() => dispatch(createDraggable(item.name))}>
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