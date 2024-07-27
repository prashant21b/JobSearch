import React, { useContext, useState } from 'react';
//import './Signup.css'; 
import toast from 'react-hot-toast';
import { baseUrl } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/user';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
   const navigate=useNavigate()
   const [state,setState]=useContext(UserContext)
   console.log(state)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data:", form);
        try {
            console.log("Sending request to:", `${baseUrl}/login`);
            const response = await axios.post(`${baseUrl}/login`, form);
            console.log("Response received after await:", response);
    
            if (response.data.success === true) {
                // Update state
                console.log("Updating state with:", {
                    user: response.data.user,
                    token: response.data.token
                });
                setState({
                    user: response.data.user,
                    token: response.data.token
                });
    
                // Update localStorage
                const authData = {
                    user: response.data.user,
                    token: response.data.token
                };
                console.log("Updating localStorage with:", authData);
                localStorage.setItem("Auth", JSON.stringify(authData));
    
                toast.success('Login success');
                navigate('/');
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.log("Error during request:", error);
            toast.error('Error in user login');
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
                <button className="google-button">Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;
