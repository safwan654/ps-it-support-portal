import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-panel ${className}`}
            style={{
                padding: '2rem',
                borderRadius: 'var(--radius-md)',
                ...props.style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
