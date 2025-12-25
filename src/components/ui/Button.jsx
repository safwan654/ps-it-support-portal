import React from 'react';

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5",
        secondary: "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
    };

    // Using inline styles since we fully control the CSS in index.css for custom classes, 
    // but here I'll use standard classes assuming we might use utility classes from a system 
    // or just inline styles if I want to be 100% sure without Tailwind (though I used Tailwind-like names in description, 
    // I should stick to my CSS variables or standard CSS classes).
    // Let's use the .btn-primary class defined in index.css as default, and add others if needed.

    // Actually, to be safe and consistent with my index.css:
    let btnClass = 'btn-primary'; // Default
    if (variant === 'secondary') btnClass = 'glass-panel'; // reusing glass panel for secondary roughly

    return (
        <button
            type={type}
            className={`${btnClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
