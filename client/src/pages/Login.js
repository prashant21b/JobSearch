import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { baseUrl } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/user';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [state, setState] = useContext(UserContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/login`, form);
            if (response.data.success) {
                setState({
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("Auth", JSON.stringify({
                    user: response.data.user,
                    token: response.data.token
                }));
                toast.success('Login success');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Error in user login');
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="signup-form">
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
                <button type="submit" className="submit-button">Login</button>
            </form>
            <div className="alternative-options">
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                <div className="google-button">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                            toast.error('Google Login Failed');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
