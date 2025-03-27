import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios'; // Make sure this line is uncommented

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            // Add email validation
            if (!email) {
                setError('Please enter an email address');
                return;
            }

            const response = await axios.post('http://localhost:5000/api/send-otp', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setShowOtpInput(true);
            setError('');
            console.log('OTP sent successfully', response.data);
        } catch (err) {
            console.error('OTP send error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to send OTP. Please try again.'
            );
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // OTP verified successfully
            console.log('OTP verified', response.data);
            navigate('/');
        } catch (err) {
            console.error('OTP verify error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Invalid or expired OTP. Please try again.'
            );
        }
    };

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content login-modal">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-center w-100" id="loginModalLabel">
                            {showOtpInput ? 'Verify OTP' : 'Welcome Back!'}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>}

                        {!showOtpInput ? (
                            <form onSubmit={handleSendOtp}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><FaUser /></span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-login w-100">
                                    Send OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOtp}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><FaLock /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        maxLength="6"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-login w-100" onClick={() => navigate('/')}>
                                    Verify OTP
                                </button>
                                <div className="text-center mt-3">
                                    <span>Didn't receive OTP? <a href="#" onClick={handleSendOtp}>Resend OTP</a></span>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;