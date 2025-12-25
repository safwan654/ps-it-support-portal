import React, { useState } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

const TicketForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        psNumber: '',
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
        if (!formData.psNumber.trim()) newErrors.psNumber = 'PS Number is required';
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

        onSubmit(formData);
        if (document.body.contains(e.target)) {
            setFormData({
                psNumber: formData.psNumber,
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Create New Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <Input
                        id="psNumber"
                        label="PS Number (Employee ID)"
                        placeholder="e.g. 123456"
                        value={formData.psNumber}
                        onChange={handleChange}
                        error={errors.psNumber}
                    />
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
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

                <div style={{ marginBottom: '1rem' }}>
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
