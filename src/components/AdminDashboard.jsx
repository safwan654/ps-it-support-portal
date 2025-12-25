import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

const StatusBadge = ({ status }) => {
    const color = status === 'Resolved' ? '#86efac' : status === 'In Progress' ? '#fde047' : '#93c5fd';
    return <span style={{ color, fontWeight: '600' }}>{status}</span>;
};

const AdminDashboard = ({ tickets, onLogout, onChangePassword, onUpdateTicket }) => {
    const [filters, setFilters] = useState({ search: '', priority: 'All', date: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Management State
    const [replyText, setReplyText] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const filteredTickets = useMemo(() => {
        let result = tickets.filter(ticket => {
            const matchSearch = String(ticket.subject + ticket.psNumber + ticket.email + (ticket.department || '')).toLowerCase().includes(filters.search.toLowerCase());
            const matchPriority = filters.priority === 'All' || ticket.priority === filters.priority;
            let matchDate = true;
            if (filters.date) {
                matchDate = new Date(ticket.timestamp).toISOString().split('T')[0] === filters.date;
            }
            return matchSearch && matchPriority && matchDate;
        });

        // Sorting Logic
        result.sort((a, b) => {
            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
            } else if (sortConfig.key === 'priority') {
                const priorityWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
                const valA = priorityWeight[a.priority] || 0;
                const valB = priorityWeight[b.priority] || 0;
                return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
            }
            return 0;
        });

        return result;
    }, [tickets, filters, sortConfig]);

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        setNewStatus(ticket.status || 'Open');
        setReplyText('');
    };

    const handleSaveUpdate = () => {
        if (!selectedTicket) return;

        onUpdateTicket(selectedTicket.id, {
            status: newStatus,
            comment: replyText.trim() ? { author: 'Admin', text: replyText, timestamp: Date.now() } : null
        });

        setSelectedTicket(null);
    };

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Admin Dashboard</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="secondary" onClick={onChangePassword}>Change Password</Button>
                    <Button variant="ghost" onClick={onLogout}>Logout</Button>
                </div>
            </div>

            <Card style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Filters & Sort</h3>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sort by:</span>
                        <select
                            className="input-field"
                            style={{ width: 'auto', padding: '0.4rem' }}
                            value={`${sortConfig.key}-${sortConfig.direction}`}
                            onChange={(e) => {
                                const [key, direction] = e.target.value.split('-');
                                setSortConfig({ key, direction });
                            }}
                        >
                            <option value="date-desc">Date (Newest)</option>
                            <option value="date-asc">Date (Oldest)</option>
                            <option value="priority-desc">Priority (Critical First)</option>
                            <option value="priority-asc">Priority (Low First)</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <Input
                        placeholder="Search Subject, Dept, ID..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        style={{ marginBottom: 0 }}
                    />
                    <Select
                        value={filters.priority}
                        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                        options={[
                            { value: 'All', label: 'All Priorities' },
                            { value: 'Low', label: 'Low' },
                            { value: 'Medium', label: 'Medium' },
                            { value: 'High', label: 'High' },
                            { value: 'Critical', label: 'Critical' }
                        ]}
                        style={{ marginBottom: 0 }}
                    />
                    <Input
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        style={{ marginBottom: 0 }}
                    />
                </div>
            </Card>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredTickets.map(ticket => (
                    <Card key={ticket.id} className="hover:bg-slate-800/50">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{ticket.subject}</span>
                                    <StatusBadge status={ticket.status || 'Open'} />
                                    {ticket.department && (
                                        <span style={{ fontSize: '0.75rem', background: '#334155', padding: '0.1rem 0.5rem', borderRadius: '4px', color: '#cbd5e1' }}>
                                            {ticket.department}
                                        </span>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <span>PS: <span style={{ color: 'var(--text-main)' }}>{ticket.psNumber}</span></span>
                                    <span>Email: {ticket.email}</span>
                                    <span>Date: {new Date(ticket.timestamp).toLocaleDateString()}</span>
                                    <span style={{ color: ticket.priority === 'Critical' ? '#fca5a5' : 'inherit' }}>Priority: {ticket.priority}</span>
                                </div>
                            </div>
                            <Button onClick={() => handleEditClick(ticket)} style={{ padding: '0.5rem 1rem' }}>Manage</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Management Modal */}
            {selectedTicket && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Manage Ticket</h3>

                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-app)', borderRadius: '8px' }}>
                            <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                            <p><strong>Details:</strong> {selectedTicket.department} • {selectedTicket.priority}</p>
                            <p><strong>From:</strong> {selectedTicket.psNumber} ({selectedTicket.email})</p>
                            {selectedTicket.attachmentUrl && (
                                <a href={selectedTicket.attachmentUrl} target="_blank" className="text-blue-400 block mt-2">📎 View Attachment</a>
                            )}
                        </div>

                        <Select
                            label="Update Status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            options={[
                                { value: 'Open', label: 'Open' },
                                { value: 'In Progress', label: 'In Progress' },
                                { value: 'Resolved', label: 'Resolved' }
                            ]}
                        />

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Reply / Comment</label>
                            <textarea
                                className="input-field"
                                rows={4}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your response here..."
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="ghost" onClick={() => setSelectedTicket(null)} style={{ flex: 1 }}>Cancel</Button>
                            <Button onClick={handleSaveUpdate} style={{ flex: 1 }}>Save Updates</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
