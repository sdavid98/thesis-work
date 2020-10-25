import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = ({submit, isRegisterForm}) => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    const onSubmit = () => {
        let isValid = true;
        if (!emailValue || !passwordValue) {
            isValid = false;
            return;
        }
        const data = {
            email: emailValue,
            password: passwordValue
        };
        if (isRegisterForm) {
            if (passwordValue === confirmPasswordValue && nameValue) {
                data.name = nameValue;
            }
            else {
                isValid = false;
                return;
            }
        }
        if (isValid) {
            submit(data);
        }
    };

    return (
        <>
            <div>
                <div><TextField value={emailValue} onChange={e => setEmailValue(e.target.value)} label='Email'/></div>
                <div><TextField value={passwordValue} onChange={e => setPasswordValue(e.target.value)} label='Password'
                                type='password'/></div>
                {!!isRegisterForm &&
                <>
                    <div><TextField value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)}
                                    label='Confirm Password' type='password'/></div>
                    <div><TextField value={nameValue} onChange={e => setNameValue(e.target.value)} label='Name'/></div>
                </>
                }
            </div>
            <div>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {isRegisterForm ? 'Register' : 'Login'}
                </Button>
            </div>
        </>
    );
};

export default Login;