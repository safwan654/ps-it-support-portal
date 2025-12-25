import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const UserLogin = ({ onLogin, isLoading }) => {
    const [psNumber, setPsNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!psNumber.trim() || !password.trim()) {
            setError('Please enter both PS Number and Password');
            return;
        }
        onLogin(psNumber, password);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <Card className="animate-fade-in">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Welcome
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    PS IT Support Portal
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="PS Number"
                        placeholder="e.g. 123456"
                        value={psNumber}
                        onChange={(e) => { setPsNumber(e.target.value); setError(''); }}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        error={error}
                    />

                    <Button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Login'}
                    </Button>

                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        First time? Use <strong>123456</strong> as password.
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default UserLogin;
