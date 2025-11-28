import React from 'react';
import { Play } from 'lucide-react';

const TechniqueCard = ({ technique, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="glass-card"
            style={{
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${technique.color}20`;
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
            }}
        >
            {/* Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                width: '100px',
                height: '100px',
                background: technique.color,
                filter: 'blur(60px)',
                opacity: 0.1,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{technique.name}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {technique.duration} • <span style={{ textTransform: 'capitalize', color: technique.color }}>{technique.category}</span>
                </p>
            </div>

            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: technique.color,
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
            }}>
                <Play size={24} fill="currentColor" />
            </div>
        </div>
    );
};

export default TechniqueCard;
