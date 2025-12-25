import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

const ChangePassword = ({ onConfirm, onCancel }) => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.id]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setError('New passwords do not match');
            return;
        }
        if (passwords.new.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        onConfirm(passwords.current, passwords.new);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <Card style={{ width: '100%', maxWidth: '400px' }} className="animate-fade-in">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="current"
                        label="Current Password"
                        type="password"
                        value={passwords.current}
                        onChange={handleChange}
                    />
                    <Input
                        id="new"
                        label="New Password"
                        type="password"
                        value={passwords.new}
                        onChange={handleChange}
                    />
                    <Input
                        id="confirm"
                        label="Confirm New Password"
                        type="password"
                        value={passwords.confirm}
                        onChange={handleChange}
                    />

                    {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Button type="button" variant="ghost" onClick={onCancel} style={{ flex: 1 }}>
                            Cancel
                        </Button>
                        <Button type="submit" style={{ flex: 1 }}>
                            Update
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ChangePassword;
