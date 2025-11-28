import React from 'react';
import { Play } from 'lucide-react';

const TechniqueCard = ({ technique, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${technique.color}20`; // 20 is hex alpha
                e.currentTarget.style.borderColor = technique.color;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
        >
            <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{technique.name}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {technique.duration} • {technique.category}
                </p>
            </div>

            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: technique.color
            }}>
                <Play size={20} fill="currentColor" />
            </div>
        </div>
    );
};

export default TechniqueCard;
