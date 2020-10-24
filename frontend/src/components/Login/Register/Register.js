import React from 'react';
import TextField from "@material-ui/core/TextField";

const Register = () => {
    return (
        <div>
            <div><TextField label='Email' /></div>
            <div><TextField label='Password' type='password' /></div>
            <div><TextField label='Confirm Password' type='password' /></div>
        </div>
    );
};

export default Register;