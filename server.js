const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Password strength analyzer endpoint
app.post('/api/analyze-password', (req, res) => {
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    
    let strength = 0;
    const feedback = [];
    
    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;
    
    // Character variety checks
    if (/[a-z]/.test(password)) {
        strength += 15;
    } else {
        feedback.push('Add lowercase letters');
    }
    
    if (/[A-Z]/.test(password)) {
        strength += 15;
    } else {
        feedback.push('Add uppercase letters');
    }
    
    if (/[0-9]/.test(password)) {
        strength += 15;
    } else {
        feedback.push('Add numbers');
    }
    
    if (/[^a-zA-Z0-9]/.test(password)) {
        strength += 15;
    } else {
        feedback.push('Add special characters');
    }
    
    // Length feedback
    if (password.length < 8) {
        feedback.push('Password too short (minimum 8 characters)');
    }
    
    // Common patterns
    if (/(.)\1{2,}/.test(password)) {
        strength -= 10;
        feedback.push('Avoid repeating characters');
    }
    
    // Cap strength at 100
    strength = Math.min(100, Math.max(0, strength));
    
    let status = '';
    if (strength < 30) status = 'WEAK';
    else if (strength < 60) status = 'MEDIUM';
    else if (strength < 80) status = 'STRONG';
    else status = 'VERY STRONG';
    
    res.json({
        strength,
        status,
        feedback,
        length: password.length
    });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    
    // Prepare email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL || 'singhyashvardhan772@gmail.com',
        subject: `[ETHICAL_HACKERS] New Contact from ${name}`,
        html: `
            <div style="font-family: monospace; background: #000; color: #00ff00; padding: 20px;">
                <h2 style="color: #00ff00; text-shadow: 0 0 10px #00ff00;">NEW CONTACT MESSAGE</h2>
                <hr style="border-color: #00ff00;">
                <p><strong>TARGET ID:</strong> ${name}</p>
                <p><strong>RETURN ADDRESS:</strong> ${email}</p>
                <p><strong>PAYLOAD:</strong></p>
                <div style="background: #001100; padding: 15px; border-left: 3px solid #00ff00;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
                <hr style="border-color: #00ff00;">
                <p style="color: #008800; font-size: 0.9em;">Transmitted via ETHICAL_HACKERS contact protocol</p>
            </div>
        `,
        text: `
NEW CONTACT MESSAGE
===================
TARGET ID: ${name}
RETURN ADDRESS: ${email}

PAYLOAD:
${message}

---
Transmitted via ETHICAL_HACKERS contact protocol
        `
    };
    
    // Send email
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email not configured. Message received:');
            console.log(mailOptions.text);
            return res.json({ 
                success: true, 
                message: 'Message received (email not configured)',
                data: { name, email, message }
            });
        }
        
        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ 
            error: 'Failed to send message',
            details: error.message 
        });
    }
});


// ===== AI ENDPOINTS =====
const OpenAI = require('openai');

// Initialize OpenAI client for Comet AI
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1'
});

// AI Chat endpoint
app.post('/api/ai-chat', async (req, res) => {
    const { message, conversationHistory } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    try {
        const messages = [
            {
                role: 'system',
                content: 'You are GHOST AI, an advanced cybersecurity assistant specializing in ethical hacking, penetration testing, and security best practices. Provide detailed, technical answers about security topics. Be professional but maintain a hacker-friendly tone.'
            },
            ...(conversationHistory || []),
            {
                role: 'user',
                content: message
            }
        ];
        
        const completion = await openai.chat.completions.create({
    model: process.env.AI_MODEL || 'openai/gpt-5.4',
    messages,
    temperature: 0.7,
    max_tokens: 500
});
        
        const aiResponse = completion.choices[0].message.content;
        
        res.json({
            success: true,
            response: aiResponse,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('AI Chat error:', error);
        res.status(500).json({
            error: 'AI service error',
            details: error.message
        });
    }
});

// Vulnerability Analyzer endpoint
app.post('/api/ai-analyze-code', async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    
    try {
        const completion = await openai.chat.completions.create({
           model: process.env.AI_MODEL,,
            messages: [
                {
                    role: 'system',
                    content: 'You are a security vulnerability analyzer. Analyze the provided code or configuration for security vulnerabilities, misconfigurations, and potential exploits. Provide specific findings with severity levels and remediation suggestions.'
                },
                {
                    role: 'user',
                    content: `Analyze this code/configuration for security vulnerabilities:\n\n${code}`
                }
            ],
            temperature: 0.5,
            max_tokens: 800
        });
        
        const analysis = completion.choices[0].message.content;
        
        res.json({
            success: true,
            analysis: analysis,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Code analysis error:', error);
        res.status(500).json({
            error: 'Analysis service error',
            details: error.message
        });
    }
});

// Threat Intelligence endpoint
app.post('/api/ai-analyze-threat', async (req, res) => {
    const { threat } = req.body;
    
    if (!threat) {
        return res.status(400).json({ error: 'Threat description is required' });
    }
    
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.AI_MODEL,,
            messages: [
                {
                    role: 'system',
                    content: 'You are a threat intelligence analyst. Analyze security threats, attack patterns, and incidents. Provide threat classification, attack vectors, potential impact, and detailed mitigation strategies.'
                },
                {
                    role: 'user',
                    content: `Analyze this security threat:\n\n${threat}`
                }
            ],
            temperature: 0.6,
            max_tokens: 800
        });
        
        const analysis = completion.choices[0].message.content;
        
        res.json({
            success: true,
            analysis: analysis,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Threat analysis error:', error);
        res.status(500).json({
            error: 'Threat analysis service error',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'online',
        message: 'ETHICAL_HACKERS backend operational',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   ETHICAL_HACKERS Backend Server          ║
║   Status: ONLINE                          ║
║   Port: ${PORT}                              ║
║   Access: http://localhost:${PORT}           ║
╚═══════════════════════════════════════════╝
    `);
});
