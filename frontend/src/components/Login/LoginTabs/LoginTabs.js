import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Button from "@material-ui/core/Button";
import axios from "../../../axios";

const LoginTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submitAction = () => {
        const apiEnding = value === 0 ? 'login' : 'register';
        axios.post(apiEnding, {
                email: 'myemail',
                password: 'mypassword',
                name: 'myname'
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab label="Login" />
                <Tab label="Register" />
            </Tabs>
            {value === 0 ? <Login/> : <Register/>}
            <div>
                <Button onClick={submitAction} variant="contained" color="primary">
                    {value === 0 ? 'Login' : 'Register'}
                </Button>
            </div>
        </div>
    );
};

export default LoginTabs;