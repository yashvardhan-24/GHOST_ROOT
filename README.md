# ETHICAL_HACKERS Website

A full-stack ethical hacking website with Matrix-style design, featuring interactive security tools and backend integration.

## Features

- **Matrix Rain Animation**: Authentic hacker aesthetic with falling code background
- **6 Main Pages**:
  - HOME: Welcome page with terminal-style introduction
  - WHOAMI: About section with hacker persona
  - SERVICES: Security services offered (Network Pentesting, Web Audit, Mobile Security, etc.)
  - ACADEMY: Learning resources and certifications
  - TOOLS: Password Strength Analyzer with real-time feedback
  - CONTACT: Secure contact form with email integration

- **Backend Integration**:
  - Contact form sends emails via Nodemailer
  - Password strength analyzer API
  - RESTful API endpoints

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your email credentials
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Email Configuration

To enable email functionality:

1. Use Gmail (recommended) or another email service
2. For Gmail, enable 2-factor authentication and create an App Password
3. Add credentials to `.env` file:
   - EMAIL_USER: your Gmail address
   - EMAIL_PASS: your App Password (not your regular password)
   - RECIPIENT_EMAIL: where contact form messages should be sent

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Email**: Nodemailer
- **Styling**: Custom CSS with Matrix/terminal theme

## API Endpoints

- `POST /api/contact` - Submit contact form
- `POST /api/analyze-password` - Analyze password strength
- `GET /api/health` - Server health check

## Design Features

- Neon green (#00ff00) color scheme
- Terminal/monospace typography
- Glassmorphism effects
- Smooth animations and transitions
- Fully responsive design

## Security Note

This is a demonstration website for ethical hacking services. All tools and features are for educational and legitimate security assessment purposes only.

---

**Status**: ✓ OPERATIONAL
**Version**: 1.0.0
