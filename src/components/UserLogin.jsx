import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const UserLogin = ({ onLogin }) => {
    const [psNumber, setPsNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!psNumber.trim()) {
            setError('Please enter your PS Number');
            return;
        }
        // Simple validation: must be somewhat valid
        if (psNumber.length < 3) {
            setError('PS Number must be at least 3 characters');
            return;
        }
        onLogin(psNumber);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <Card className="animate-fade-in">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Welcome
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Please enter your PS Number to continue
                </p>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="PS Number (Employee ID)"
                        placeholder="e.g. 123456"
                        value={psNumber}
                        onChange={(e) => {
                            setPsNumber(e.target.value);
                            setError('');
                        }}
                        error={error}
                    />

                    <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                        Access Portal
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default UserLogin;
