// src/Views/Pages/Login/ForgotPassword.jsx
import { useState } from "react";
import { auth, sendPasswordResetEmail } from "../Firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleResetPassword}>Send Reset Email</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
