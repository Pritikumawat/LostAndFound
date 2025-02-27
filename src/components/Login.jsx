import React, { useState } from 'react';
import './Login.css'; // Importing the CSS file

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>{isSignup ? "Signup" : "Login"}</h1>
                <h2>Welcome {isSignup ? "to our platform!" : "back! Please enter your details."}</h2>

                <form>
                    {isSignup && (
                        <>
                            <input type="text" className="input-field" placeholder="Full Name" required />
                            <input type="text" className="input-field" placeholder="Username" required />
                        </>
                    )}
                    <input type="email" className="input-field" placeholder="Email" required />
                    <input type="password" className="input-field" placeholder="Password" required />

                    <button type="submit" className="btn">{isSignup ? "Signup" : "Login"}</button>
                </form>

                <p className="toggle-text">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}  
                    <span onClick={toggleForm}>{isSignup ? " Login" : " Signup"}</span>
                </p>
            </div>
        </div>
    );
};

export default Login;