import React from 'react';

const Select = ({ label, id, options = [], error, ...props }) => {
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
            <div style={{ position: 'relative' }}>
                <select
                    id={id}
                    className="input-field"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} style={{ background: '#1e293b', color: 'white' }}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {/* Custom arrow indicator could go here */}
                <div style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'var(--text-muted)'
                }}>
                    ▼
                </div>
            </div>
            {error && (
                <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'block' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Select;
