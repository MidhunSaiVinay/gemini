import React from 'react';
import { X, Phone, Anchor } from 'lucide-react';

const PanicMode = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 400,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button onClick={onClose} className="btn-ghost" style={{ padding: '8px' }}>
                    <X size={24} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    padding: '20px',
                    borderRadius: '50%',
                    marginBottom: '20px',
                    color: '#ef4444'
                }}>
                    <Anchor size={48} />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Ground Yourself</h1>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px', marginBottom: '40px' }}>
                    Focus on your breath. Inhale slowly for 4 seconds, exhale for 4 seconds.
                </p>

                <div style={{
                    width: '100%',
                    maxWidth: '300px',
                    background: 'var(--bg-secondary)',
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ marginTop: 0 }}>5-4-3-2-1 Technique</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        <li>5 things you see</li>
                        <li>4 things you feel</li>
                        <li>3 things you hear</li>
                        <li>2 things you smell</li>
                        <li>1 thing you taste</li>
                    </ul>
                </div>

                <button className="btn-ghost" style={{ color: '#ef4444', gap: '8px' }}>
                    <Phone size={20} />
                    Crisis Helpline
                </button>
            </div>
        </div>
    );
};

export default PanicMode;
