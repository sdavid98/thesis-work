import React from 'react';
import TextField from "@material-ui/core/TextField";

const Login = () => {
    return (
        <div>
            <div><TextField label='Email' /></div>
            <div><TextField label='Password' type='password' /></div>
        </div>
    );
};

export default Login;