import React from 'react';
import Card from './ui/Card';

const PriorityBadge = ({ priority }) => {
    const colors = {
        Low: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        High: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        Critical: 'bg-red-500/20 text-red-300 border-red-500/30'
    };

    // Inline styles for badge since I can't rely on tailwind classes being interpreted fully for custom arbitrary values
    // But I will use a style object map for simplicity
    const styleMap = {
        Low: { background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)' },
        Medium: { background: 'rgba(234, 179, 8, 0.2)', color: '#fde047', border: '1px solid rgba(234, 179, 8, 0.3)' },
        High: { background: 'rgba(249, 115, 22, 0.2)', color: '#fdba74', border: '1px solid rgba(249, 115, 22, 0.3)' },
        Critical: { background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }
    };

    return (
        <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            ...styleMap[priority]
        }}>
            {priority}
        </span>
    );
};

const TicketList = ({ tickets }) => {
    if (tickets.length === 0) {
        return (
            <Card className="text-center p-8">
                <p style={{ color: 'var(--text-muted)' }}>No tickets submitted yet.</p>
            </Card>
        );
    }

    return (
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Recent Tickets</h2>
            {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:bg-slate-800/50 transition-colors">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>#{ticket.id.slice(0, 8)}</span>
                                <PriorityBadge priority={ticket.priority} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{ticket.subject}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                Reported by: <span style={{ color: 'var(--text-main)' }}>{ticket.psNumber}</span> • {ticket.email}
                            </p>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {new Date(ticket.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                    {ticket.attachmentName && (
                        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--primary)' }}>
                            📎 {ticket.attachmentName}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default TicketList;
