import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

const PostSession = ({ session, onHome }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                color: 'var(--accent-primary)',
                marginBottom: '20px',
                transform: 'scale(1.5)'
            }}>
                <CheckCircle size={64} />
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Session Complete</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
                Great job taking time for yourself.
            </p>

            <div style={{
                background: 'var(--bg-secondary)',
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '300px',
                marginBottom: '40px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Technique</span>
                    <span style={{ fontWeight: 600 }}>{session.techniqueName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Duration</span>
                    <span style={{ fontWeight: 600 }}>{Math.round(session.durationSeconds / 60)} min</span>
                </div>
            </div>

            <button
                onClick={onHome}
                className="btn-primary"
                style={{ width: '100%', maxWidth: '300px' }}
            >
                Back to Home
            </button>
        </div>
    );
};

export default PostSession;
