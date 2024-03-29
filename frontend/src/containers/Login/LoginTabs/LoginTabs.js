import React, {useEffect, useState} from 'react';
import {set} from 'idb-keyval';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoginForm from "../LoginForm/LoginForm";
import axios from "../../../axios";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/actions";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';

const LoginTabs = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [value, setValue] = useState(0);
    const relocatePath = location.state.from.pathname || '/projects';

    useEffect(() => {
        if (user.isLoggedIn) {
            history.push(relocatePath);
        }
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submitAction = (payload) => {
        const apiEnding = value === 0 ? 'login' : 'register';
        axios.defaults.withCredentials = true;
        axios.post(apiEnding, payload)
            .then(res => {
                if (res.data.user) {
                    dispatch(login(res.data.user.name, res.data.user.group));
                    set('user', {
                        name: res.data.user.name,
                        group: res.data.user.group,
                        expireDate: res.data.expireDate
                    });
                    history.push(relocatePath);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const logout = () => {
        axios.get('/logout')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <Grid container justify={"center"} alignItems={"center"} direction={"column"} style={{minHeight: '80vh'}}>
            <Tabs
                style={{marginBottom: 30}}
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab label="Login"/>
                <Tab label="Register"/>
            </Tabs>
            {<LoginForm submit={submitAction} isRegisterForm={value === 1}/>}
            <Button onClick={logout}>Logout</Button>
        </Grid>
    );
};

export default LoginTabs;