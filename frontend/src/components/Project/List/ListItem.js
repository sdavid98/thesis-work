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

const ListItem = ({project}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        <MenuItem key='1' onClick={handleClose}>
                            Share
                        </MenuItem>
                        <MenuItem key='2' onClick={handleClose}>
                            View feedback
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
                        Created: {project.created_at} by {project.created_by}<br/>
                        Last updated: {project.created_at} by {project.created_by}
                    </Typography>
                </div>
                <CardActions>
                    <Button size="small" color="primary">
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