import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketStatus from './components/TicketStatus';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ChangePassword from './components/ChangePassword';
import Button from './components/ui/Button';

function App() {
    const [view, setView] = useState('user'); // 'user', 'admin-login', 'admin-dashboard'
    const [userTab, setUserTab] = useState('new'); // 'new' vs 'status'

    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState({ username: 'admin', password: 'admin123' });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Data State
    const [currentUserPS, setCurrentUserPS] = useState(''); // Store last used PS Number
    const [tickets, setTickets] = useState([
        {
            id: 'mock-123',
            psNumber: '123456',
            email: 'jane.doe@example.com',
            priority: 'High',
            subject: 'VPN Connection Failure',
            status: 'Open',
            comments: [{ author: 'System', text: 'Ticket created.', timestamp: Date.now() - 3600000 }],
            timestamp: Date.now() - 3600000,
            attachmentName: 'error.png',
            attachmentUrl: null
        }
    ]);

    const handleCreateTicket = (data) => {
        // Handle Attachment Object URL
        let attachmentUrl = null;
        if (data.attachment) {
            attachmentUrl = URL.createObjectURL(data.attachment);
        }

        const newTicket = {
            ...data,
            id: Date.now().toString(), // Using Date.now for safety instead of UUID
            timestamp: Date.now(),
            status: 'Open',
            comments: [{ author: 'System', text: 'Ticket received.', timestamp: Date.now() }],
            attachmentName: data.attachment ? data.attachment.name : null,
            attachmentUrl: attachmentUrl
        };

        setTickets([newTicket, ...tickets]);
        setCurrentUserPS(data.psNumber); // Set the current user context
        alert('Ticket submitted successfully!');
        setUserTab('status'); // Switch to status view
    };

    const handleUpdateTicket = (ticketId, updates) => {
        setTickets(tickets.map(t => {
            if (t.id !== ticketId) return t;

            const updatedTicket = { ...t, status: updates.status };
            if (updates.comment) {
                updatedTicket.comments = [...(t.comments || []), updates.comment];
            }
            return updatedTicket;
        }));
    };

    return (
        <div className="page-container animate-fade-in">
            <header style={{ marginBottom: '3rem', textAlign: 'center', position: 'relative' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    {view === 'user' ? 'PS IT Support Portal' : 'Admin Portal'}
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {view === 'user' ? 'Submit and track your technical issues' : 'Manage system tickets'}
                </p>

                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    {view === 'user' ? (
                        <button
                            onClick={() => setView(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                            Admin Access
                        </button>
                    ) : null}
                </div>
            </header>

            <main style={{ maxWidth: '800px', margin: '0 auto' }}>
                {view === 'user' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Button
                                variant={userTab === 'new' ? 'primary' : 'ghost'}
                                onClick={() => setUserTab('new')}
                            >
                                New Ticket
                            </Button>
                            <Button
                                variant={userTab === 'status' ? 'primary' : 'ghost'}
                                onClick={() => setUserTab('status')}
                            >
                                Check Status
                            </Button>
                        </div>

                        {userTab === 'new' ? (
                            <TicketForm onSubmit={handleCreateTicket} />
                        ) : (
                            <TicketStatus tickets={tickets} currentUserPS={currentUserPS} />
                        )}
                    </>
                )}

                {view === 'admin-login' && (
                    <AdminLogin
                        onLogin={() => { setIsAuthenticated(true); setView('admin-dashboard'); }}
                        onCancel={() => setView('user')}
                        validator={(creds) => creds.username === adminCredentials.username && creds.password === adminCredentials.password}
                    />
                )}

                {view === 'admin-dashboard' && isAuthenticated && (
                    <AdminDashboard
                        tickets={tickets}
                        onLogout={() => { setIsAuthenticated(false); setView('user'); }}
                        onChangePassword={() => setShowPasswordModal(true)}
                        onUpdateTicket={handleUpdateTicket}
                    />
                )}
            </main>

            {showPasswordModal && (
                <ChangePassword
                    onConfirm={(curr, newP) => {
                        if (curr !== adminCredentials.password) return alert('Wrong password');
                        setAdminCredentials(prev => ({ ...prev, password: newP }));
                        setShowPasswordModal(false);
                    }}
                    onCancel={() => setShowPasswordModal(false)}
                />
            )}
        </div>
    );
}

export default App;
