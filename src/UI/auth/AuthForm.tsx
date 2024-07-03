'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AuthFormProps = {
    mode: 'login' | 'register';
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === 'register') {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password }),
                });

                if (res.ok) {
                    await router.push('/auth/signin');
                } else {
                    const text = await res.text();
                    let errorData;

                    try {
                        errorData = JSON.parse(text);
                    } catch (err) {
                        errorData = { message: 'Something went wrong' };
                    }

                    setError(errorData.message || 'Something went wrong');
                }
            } 
            if(mode === 'login') {
                const res = await fetch('/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (res.ok) {
                    await router.push('/dashboard');
                } else {
                    const text = await res.text();
                    let errorData;

                    try {
                        errorData = JSON.parse(text);
                    } catch (err) {
                        errorData = { message: 'Something went wrong' };
                    }

                    setError(errorData.message || 'Something went wrong');
                    await router.push(`/auth/error?error=${encodeURIComponent(errorData.message || 'Something went wrong')}`);
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Error during form submission:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">
                    {mode === 'register' ? 'Register' : 'Login'}
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {mode === 'register' ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
