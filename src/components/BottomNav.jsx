import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Activity, User } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { path: '/dashboard', icon: Home, label: 'Home' },
        { path: '/stats', icon: Activity, label: 'Stats' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="glass-panel" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: '20px', // Safe area for mobile
            zIndex: 100
        }}>
            {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        gap: '6px',
                        padding: '12px',
                        transition: 'all 0.3s ease',
                        opacity: isActive ? 1 : 0.6,
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    })}
                >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    <span style={{ fontWeight: isActive ? 600 : 400 }}>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
