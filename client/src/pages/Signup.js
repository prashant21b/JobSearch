import React, { useState } from 'react';
import './Signup.css';
import { baseUrl } from '../url';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import UserContext from '../Context/user';

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [state, setState] = useContext(UserContext);
    const navigate=useNavigate()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(form);
        try{
            const response=await axios.post(`${baseUrl}/singup`,form)
            console.log(response)
            if(response.status===201){
                toast.success(response.data.msg)
                navigate('/login')
            }
            else{
                toast.error(response.data.error.msg)
            }
           

        }
        catch(error){
         console.log(error)
         toast.error('Error in User Registration!')
        }   
    };
    const handleGoogleLogin = async (credentialResponse) => {
        try {
            console.log(credentialResponse)
            const response = await axios.post(`${baseUrl}/auth/google`, {
                token: credentialResponse.credential
            });
            if (response.data.success) {
                setState({
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("Auth", JSON.stringify({
                    user: response.data.user,
                    token: response.data.token
                }));
                toast.success('Google Login success');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Google Login failed');
            }
        } catch (error) {
            toast.error('Error in Google login');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            <div className="alternative-options">
                <p>Already registered? <a href="/login">Login</a></p>
                <button className="google-button">
                <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                            toast.error('Google Login Failed');
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default Signup;
