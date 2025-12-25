import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const StatusBadge = ({ status }) => {
    const styles = {
        'Open': { color: '#93c5fd', border: 'rgba(147, 197, 253, 0.3)' },
        'In Progress': { color: '#fde047', border: 'rgba(253, 224, 71, 0.3)' },
        'Resolved': { color: '#86efac', border: 'rgba(134, 239, 172, 0.3)' },
    };
    const style = styles[status] || styles['Open'];

    return (
        <span style={{
            color: style.color,
            border: `1px solid ${style.border}`,
            background: `rgba(0,0,0,0.2)`,
            padding: '0.2rem 0.6rem',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: '600',
            whiteSpace: 'nowrap'
        }}>
            {status}
        </span>
    );
};

const TicketStatus = ({ tickets, currentUserPS }) => {
    const displayTickets = currentUserPS
        ? tickets.filter(t => t.psNumber === currentUserPS)
        : tickets;

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="animate-fade-in">
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Tickets</h2>
                    {currentUserPS && <span style={{ color: 'var(--text-muted)' }}>PS ID: {currentUserPS}</span>}
                </div>

                {displayTickets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <p>No tickets found in this session.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem', fontWeight: '500' }}>Subject</th>
                                    <th style={{ padding: '1rem', fontWeight: '500' }}>ID</th>
                                    <th style={{ padding: '1rem', fontWeight: '500' }}>Status</th>
                                    <th style={{ padding: '1rem', fontWeight: '500' }}>Date</th>
                                    <th style={{ padding: '1rem', fontWeight: '500' }}>Updates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayTickets.map(ticket => (
                                    <React.Fragment key={ticket.id}>
                                        <tr
                                            onClick={() => toggleExpand(ticket.id)}
                                            style={{
                                                borderBottom: '1px solid var(--border)',
                                                cursor: 'pointer',
                                                background: expandedRow === ticket.id ? 'rgba(255,255,255,0.03)' : 'transparent'
                                            }}
                                        >
                                            <td style={{ padding: '1rem', fontWeight: '500' }}>{ticket.subject}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>#{ticket.id.slice(0, 6)}</td>
                                            <td style={{ padding: '1rem' }}><StatusBadge status={ticket.status} /></td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                {new Date(ticket.timestamp).toLocaleDateString()}
                                            </td>
                                            <td style={{ padding: '1rem', fontSize: '1.2rem' }}>
                                                {expandedRow === ticket.id ? '−' : '+'}
                                            </td>
                                        </tr>

                                        {expandedRow === ticket.id && (
                                            <tr>
                                                <td colSpan="5" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                                                            <div>
                                                                <p style={{ color: 'var(--text-muted)' }}>From:</p>
                                                                <p>{ticket.psNumber}</p>
                                                            </div>
                                                            <div>
                                                                <p style={{ color: 'var(--text-muted)' }}>Department:</p>
                                                                <p>{ticket.department || 'N/A'}</p>
                                                            </div>
                                                            <div>
                                                                <p style={{ color: 'var(--text-muted)' }}>Attachment:</p>
                                                                {ticket.attachmentUrl ? (
                                                                    <a href={ticket.attachmentUrl} target="_blank" className="text-blue-400 hover:underline">
                                                                        📎 {ticket.attachmentName || 'View File'}
                                                                    </a>
                                                                ) : <span style={{ color: 'var(--text-muted)' }}>None</span>}
                                                            </div>
                                                        </div>

                                                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                                            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Comments & Updates</h4>
                                                            {ticket.comments && ticket.comments.length > 0 ? (
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                    {ticket.comments.map((comment, idx) => (
                                                                        <div key={idx} style={{
                                                                            background: comment.author === 'Admin' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.05)',
                                                                            padding: '0.75rem',
                                                                            borderRadius: '8px',
                                                                            borderLeft: comment.author === 'Admin' ? '3px solid var(--primary)' : '3px solid var(--text-muted)'
                                                                        }}>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                                                                <span>{comment.author}</span>
                                                                                <span>{new Date(comment.timestamp).toLocaleString()}</span>
                                                                            </div>
                                                                            <div>{comment.text}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No updates yet.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TicketStatus;
