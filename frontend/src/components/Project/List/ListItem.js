import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link, useHistory} from "react-router-dom";
import {dateToLocalTimeString} from "../../../utils/date";

const useStyles = makeStyles({
    root: {
        marginBottom: 24,
        minHeight: 256,
        display: 'grid',
        gridTemplateColumns: '40% 60%'
    },
    info: {
        display: 'grid',
        alignContent: 'space-between'
    },
    moreOptions: {
        display: 'flex',
        marginLeft: 'auto',
        marginTop: -10,
        marginRight: -10
    }
});

const ListItem = ({project, updateViewLink, handleModalOpen}) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onEditClick = () => {
        history.push('/projects/' + project._id);
    };

    const setViewLink = () => {
        updateViewLink(project.view_id);
        handleModalOpen();
        handleClose();
    };

    return (
        <Card className={classes.root}>
            <img
                src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
                alt={project.name}
            />
            <CardContent className={classes.info}>
                <div>
                    <IconButton className={classes.moreOptions} aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleClose}
                    >
                        <MenuItem key='1' onClick={setViewLink}>
                            Share
                        </MenuItem>
                        <MenuItem key='2' onClick={handleClose}>
                            <Link target='_blank' to={"/projects/view/" + project.view_id}>View feedback</Link>
                        </MenuItem>
                        <MenuItem key='3' onClick={handleClose}>
                            Duplicate
                        </MenuItem>
                        <MenuItem key='4' onClick={handleClose}>
                            Delete
                        </MenuItem>
                    </Menu>
                    <Typography gutterBottom variant="h5" component="h2">
                        {project.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Created: {dateToLocalTimeString(project.created_at)} by {project.created_by}<br/>
                        {!!project.updated_at &&
                            `Last updated: ${dateToLocalTimeString(project.updated_at)} by ${project.updated_by}`
                        }
                    </Typography>
                </div>
                <CardActions>
                    <Button onClick={onEditClick} size="small" color="primary">
                        Edit
                    </Button>
                    <Button size="small" color="primary">
                         Download
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default ListItem;