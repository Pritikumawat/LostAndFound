import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", username: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const navigate = useNavigate(); // React Router ka navigation hook

    const toggleForm = () => {
        setIsSignup(!isSignup);
        setMessage("");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignup ? "http://localhost:8080/signup" : "http://localhost:8080/login";

        try {
            const response = await axios.post(endpoint, formData);
            setMessage(response.data.message);

            if (!isSignup) {
                localStorage.setItem("token", response.data.token); // Save JWT token
                navigate("/home"); // Redirect to Home Page
            } else {
                setIsSignup(false);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container login-container ">
            <div className="form-container">
                <h1>{isSignup ? "Signup" : "Login"}</h1>
                <h2>Welcome {isSignup ? "to our platform!" : "back! Please enter your details."}</h2>

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <input type="text" name="fullName" className="input-field" placeholder="Full Name" required onChange={handleChange} />
                            <input type="text" name="username" className="input-field" placeholder="Username" required onChange={handleChange} />
                        </>
                    )}
                    <input type="email" name="email" className="input-field" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" className="input-field" placeholder="Password" required onChange={handleChange} />

                    <button type="submit" className="btn">{isSignup ? "Signup" : "Login"}</button>
                </form>

                <p className="message">{message}</p>

                <p className="toggle-text">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}  
                    <span onClick={toggleForm}>{isSignup ? " Login" : " Signup"}</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
