import React from 'react';
import '../css/signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../UItils';

export default function Signup(){
    const [SignupInfo, setSignupInfo] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSignupInfo({
            ...SignupInfo,
            [e.target.name]: e.target.value
        });
    }
    console.log(SignupInfo);
    const handleSignup = async (e) => {
        e.preventDefault();
        // Handle signup logic here
        const {username,email,password} = SignupInfo;
        if(!username || !email || !password){
            return showErrorToast("All fields are required")
        }
        try {
            const url = "http://192.168.1.210:5050/auth/sign-up";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(SignupInfo)
            });
            const data = await response.json();
            const {success,message, error} = data;
            if(success){
                showSuccessToast(message || "Signup successful! Please login.");
                setTimeout(() => {
                    navigate('/Login');
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
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className='inputs'>
                    <label htmlFor='username'>Username</label>
                    <input
                    onChange={handleChange}
                    type='text'
                    name='username'
                    autoFocus
                    placeholder='Enter your username...'
                    value={SignupInfo.username}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='email'>Email</label>
                    <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    placeholder='Enter your email...'
                    value={SignupInfo.email}
                    />
                </div>
                <div className='inputs'>
                    <label htmlFor='password'>Password</label>
                    <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    placeholder='Enter your password...'
                    value={SignupInfo.password}
                    />
                </div>
                <button type='submit'>Sign Up</button>
                <span>Already have an account? <Link to={"/login"}>Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}