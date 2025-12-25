import React, { useState, useEffect } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

const TicketForm = ({ onSubmit, currentUserPS }) => {
    const [formData, setFormData] = useState({
        // psNumber handled by parent
        email: '',
        department: 'IT',
        priority: 'Medium',
        subject: '',
        attachment: null
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: files ? files[0] : value
        }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Pass formData up, parent adds PS Number
        onSubmit(formData);

        if (document.body.contains(e.target)) {
            setFormData({
                email: formData.email,
                department: 'IT',
                priority: 'Medium',
                subject: '',
                attachment: null
            });
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="animate-fade-in">
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Create New Ticket</h2>
                {currentUserPS && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', background: '#334155', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                        PS: {currentUserPS}
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Select
                        id="department"
                        label="Department"
                        value={formData.department}
                        onChange={handleChange}
                        options={[
                            { value: 'IT', label: 'IT' },
                            { value: 'HR', label: 'HR' },
                            { value: 'Finance', label: 'Finance' },
                            { value: 'Operations', label: 'Operations' },
                            { value: 'Sales', label: 'Sales' },
                            { value: 'Other', label: 'Other' }
                        ]}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <Select
                        id="priority"
                        label="Priority"
                        value={formData.priority}
                        onChange={handleChange}
                        options={[
                            { value: 'Low', label: 'Low - Routine Request' },
                            { value: 'Medium', label: 'Medium - Standard Issue' },
                            { value: 'High', label: 'High - Urgent Work Blocker' },
                            { value: 'Critical', label: 'Critical - System Outage' }
                        ]}
                    />
                    <Input
                        id="attachment"
                        label="Attachment (Optional)"
                        type="file"
                        onChange={handleChange}
                        style={{ padding: '0.5rem' }}
                    />
                </div>

                <Input
                    id="subject"
                    label="Issue Subject"
                    placeholder="Brief description of the issue..."
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                />

                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default TicketForm;
