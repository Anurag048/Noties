import React from 'react';
import '../css/signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../UItils';

export default function Login(){
    const [LoginInfo, setLoginInfo] = React.useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginInfo({
            ...LoginInfo,
            [e.target.name]: e.target.value
        });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const {email,password} = LoginInfo;
        if(!email || !password){
            return showErrorToast("All fields are required")
        }
        try {
            const url = "http://192.168.1.210:5050/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(LoginInfo)
            });
            const data = await response.json();
            const {success,message, jwtToken, username,  error} = data;
            if(success){
                showSuccessToast(message || "Login successful!");
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("username", username);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                const errorMsg = typeof error === 'string' ? error : message || 'Signup failed';
                showErrorToast(errorMsg);
            }
        } catch (error) {
            return showErrorToast("Connection failed: " + error.message);
        }
    }
    return(
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='inputs'>
                    <label htmlFor='email'>Email</label>
                    <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    value={LoginInfo.email}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='Password'>Password</label>
                    <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={LoginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to={"/sign-up"}>Sign Up</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}