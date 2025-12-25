import React from 'react';

const Input = ({ label, id, type = 'text', error, ...props }) => {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: 'var(--text-muted)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className="input-field"
                {...props}
            />
            {error && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'block' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
