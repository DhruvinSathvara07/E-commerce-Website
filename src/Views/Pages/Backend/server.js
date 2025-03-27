const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // React app's default Vite port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Temporary in-memory storage for OTPs
const otpStorage = new Map();

// Nodemailer transporter
let transporter;
try {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
} catch (error) {
    console.error('Error creating email transporter:', error);
}

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
    const { email } = req.body;

    console.log('Received email for OTP:', email);

    try {
        // Validate email
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Generate OTP
        const otp = generateOTP();

        // Store OTP with timestamp
        otpStorage.set(email, {
            otp,
            timestamp: Date.now()
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Login',
            text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
        };

        // Send email (commented out for testing)
        // await transporter.sendMail(mailOptions);

        console.log(`OTP for ${email} is: ${otp}`);

        res.status(200).json({
            message: 'OTP sent successfully',
            otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only send OTP in dev mode
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            message: 'Error sending OTP',
            error: error.toString()
        });
    }
});

// Verify OTP endpoint
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    console.log('Verify OTP request:', { email, otp });

    const storedOtp = otpStorage.get(email);

    // Check if OTP exists and is not expired (10 minutes)
    if (
        storedOtp &&
        storedOtp.otp === otp &&
        (Date.now() - storedOtp.timestamp) < 10 * 60 * 1000
    ) {
        // Remove OTP after successful verification
        otpStorage.delete(email);
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
        message: 'An unexpected error occurred',
        error: err.toString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});