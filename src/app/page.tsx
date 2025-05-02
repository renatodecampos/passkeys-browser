'use client';

import { useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import { debug } from '@/lib/debug';
import { relypartyapi } from '@/lib/setup';
export default function Home() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    debug.component('Home', { username }, { message });
  }, [username, message]);

  const handleRegistration = async () => {
    const startTime = Date.now();
    try {
      debug.log('Registration', 'Starting registration process', { username });
      
      // Get registration options from the server
      const resp = await fetch(`${relypartyapi}/generate-registration-options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const options = await resp.json();
      debug.api('generate-registration-options', { username }, options);

      // Start the registration process
      const attResp = await startRegistration(options);
      debug.log('Registration', 'Received authenticator response', { attResp });

      console.log(JSON.stringify(attResp));

      // Send the response to the server
      const verificationResp = await fetch(`${relypartyapi}/verify-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-username': username,
        },
        body: JSON.stringify(attResp),
      });

      const verificationJSON = await verificationResp.json();
      debug.api('verify-registration', attResp, verificationJSON);

      console.log(JSON.stringify(verificationJSON));

      if (verificationJSON.verified) {
        debug.log('Registration', 'Registration successful');
        setMessage('Registration successful!');
      } else {
        debug.log('Registration', 'Registration failed', { verificationJSON });
        setMessage('Registration failed');
      }
    } catch (error: unknown) {
      debug.error('Registration', error instanceof Error ? error : new Error(String(error)));
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      debug.performance('Registration', startTime);
    }
  };

  const handleAuthentication = async () => {
    const startTime = Date.now();
    try {


      if (!username) {
        setMessage('Please enter a username');
        return;
      }

      debug.log('Authentication', 'Starting authentication process', { username });

      // Get authentication options from the server
      const resp = await fetch(`${relypartyapi}/generate-authentication-options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-username': username,
        },
        body: JSON.stringify({ username }),
      });

      const options = await resp.json();
      debug.api('generate-authentication-options', { username }, options);

      // Start the authentication process
      const authResp = await startAuthentication(options);
      debug.log('Authentication', 'Received authenticator response', { authResp });

      // Send the response to the server
      const verificationResp = await fetch(`${relypartyapi}/verify-authentication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-username': username,
        },
        body: JSON.stringify(authResp),
      });

      const verificationJSON = await verificationResp.json();
      debug.api('verify-authentication', authResp, verificationJSON);

      if (verificationJSON.verified) {
        debug.log('Authentication', 'Authentication successful');
        setMessage('Authentication successful!');
      } else {
        debug.log('Authentication', 'Authentication failed', { verificationJSON });
        setMessage('Authentication failed');
      }
    } catch (error: unknown) {
      debug.error('Authentication', error instanceof Error ? error : new Error(String(error)));
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      debug.performance('Authentication', startTime);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Passkey Demo</h1>
        
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={handleRegistration}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            onClick={handleAuthentication}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Authenticate
          </button>
        </div>

        {message && (
          <div className="mt-4 p-2 text-center rounded" style={{ 
            backgroundColor: message.includes('successful') ? '#d1fae5' : '#fee2e2',
            color: message.includes('successful') ? '#065f46' : '#991b1b'
          }}>
            {message}
          </div>
        )}
      </div>
    </main>
  );
} 