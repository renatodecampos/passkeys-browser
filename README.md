# Passkeys Browser Demo

This is a Next.js application that demonstrates the use of passkeys (WebAuthn) for user authentication. The application uses SimpleWebAuthn for implementing WebAuthn registration and authentication flows.

## Prerequisites

- Node.js 20.x or higher
- A WebAuthn server running on http://localhost:3000
- A modern browser that supports WebAuthn (Chrome, Firefox, Safari, Edge)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Features

- User registration with passkeys
- User authentication with passkeys
- Modern UI with Tailwind CSS
- TypeScript support

## How it Works

1. Registration:
   - Enter a username
   - Click "Register"
   - Follow the browser's prompts to register your passkey

2. Authentication:
   - Enter your username
   - Click "Authenticate"
   - Follow the browser's prompts to authenticate with your passkey

## Note

This is a client-side implementation that expects a SimpleWebAuthn server to be running on http://localhost:3000. Make sure your server implements the following endpoints:

- POST /generate-registration-options
- POST /verify-registration
- POST /generate-authentication-options
- POST /verify-authentication