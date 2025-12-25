import React, { useState, useEffect } from 'react';
import TicketForm from './components/TicketForm';
import TicketStatus from './components/TicketStatus';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ChangePassword from './components/ChangePassword';
import UserLogin from './components/UserLogin';
import Button from './components/ui/Button';

function App() {
    // Views: 'user-login', 'user', 'admin-login', 'admin-dashboard'
    const [view, setView] = useState('user-login');
    const [userTab, setUserTab] = useState('new'); // 'new' vs 'status'

    // Authentication State
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Admin Auth
    const [currentUserPS, setCurrentUserPS] = useState(''); // User Auth (PS Number)

    const [adminCredentials, setAdminCredentials] = useState({ username: 'admin', password: 'admin123' });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Data State - Initialize with LocalStorage or Default
    const [tickets, setTickets] = useState(() => {
        const saved = localStorage.getItem('tickets');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse tickets", e);
            }
        }
        return [
            {
                id: 'mock-123',
                psNumber: '123456',
                email: 'jane.doe@example.com',
                priority: 'High',
                department: 'IT',
                subject: 'VPN Connection Failure',
                status: 'Open',
                comments: [{ author: 'System', text: 'Ticket created.', timestamp: Date.now() - 3600000 }],
                timestamp: Date.now() - 3600000,
                attachmentName: 'error.png',
                attachmentUrl: null
            }
        ];
    });

    // Persistence Effect
    useEffect(() => {
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }, [tickets]);

    const handleUserLogin = (psNumber) => {
        setCurrentUserPS(psNumber);
        setView('user');
    };

    const handleCreateTicket = (data) => {
        // Handle Attachment Object URL
        let attachmentUrl = null;
        if (data.attachment) {
            attachmentUrl = URL.createObjectURL(data.attachment);
        }

        const newTicket = {
            ...data,
            psNumber: currentUserPS, // Enforce current user
            id: Date.now().toString(),
            timestamp: Date.now(),
            status: 'Open',
            comments: [{ author: 'System', text: 'Ticket received.', timestamp: Date.now() }],
            attachmentName: data.attachment ? data.attachment.name : null,
            attachmentUrl: attachmentUrl
        };

        setTickets([newTicket, ...tickets]);
        alert('Ticket submitted successfully!');
        setUserTab('status');
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

    // Header Component
    const Header = () => (
        <header style={{ marginBottom: '3rem', textAlign: 'center', position: 'relative' }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
            }}>
                {view.includes('admin') ? 'Admin Portal' : 'PS IT Support Portal'}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
                {view.includes('admin') ? 'Manage system tickets' : 'Submit and track your technical issues'}
            </p>

            <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {/* Show User PS if logged in as user */}
                {view === 'user' && (
                    <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Logged in as: </span>
                        <strong style={{ color: '#fff' }}>{currentUserPS}</strong>
                        <button
                            onClick={() => { setCurrentUserPS(''); setView('user-login'); }}
                            style={{ display: 'block', width: '100%', background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', marginTop: '0.2rem' }}
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Admin Access / Logout */}
                {(view === 'user' || view === 'user-login') && (
                    <button
                        onClick={() => setView(isAuthenticated ? 'admin-dashboard' : 'admin-login')}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                        Admin Access
                    </button>
                )}
            </div>
        </header>
    );

    return (
        <div className="page-container animate-fade-in">
            <Header />

            <main style={{ maxWidth: '800px', margin: '0 auto' }}>

                {view === 'user-login' && (
                    <UserLogin onLogin={handleUserLogin} />
                )}

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
                            <TicketForm onSubmit={handleCreateTicket} currentUserPS={currentUserPS} />
                        ) : (
                            <TicketStatus tickets={tickets} currentUserPS={currentUserPS} />
                        )}
                    </>
                )}

                {view === 'admin-login' && (
                    <AdminLogin
                        onLogin={() => { setIsAuthenticated(true); setView('admin-dashboard'); }}
                        onCancel={() => setView('user-login')}
                        validator={(creds) => creds.username === adminCredentials.username && creds.password === adminCredentials.password}
                    />
                )}

                {view === 'admin-dashboard' && isAuthenticated && (
                    <AdminDashboard
                        tickets={tickets}
                        onLogout={() => { setIsAuthenticated(false); setView('user-login'); }}
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
