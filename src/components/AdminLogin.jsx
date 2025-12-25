import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const AdminLogin = ({ onLogin, onCancel, validator }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check against validator prop if present, else fallback (though App should provide it)
        const isValid = validator
            ? validator(credentials)
            : (credentials.username === 'admin' && credentials.password === 'admin123');

        if (isValid) {
            onLogin();
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <Card className="animate-fade-in">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Admin Access
                </h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        label="Username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />

                    {error && (
                        <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button type="button" variant="ghost" onClick={onCancel} style={{ flex: 1 }}>
                            Cancel
                        </Button>
                        <Button type="submit" style={{ flex: 1 }}>
                            Login
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;
