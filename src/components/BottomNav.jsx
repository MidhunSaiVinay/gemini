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
        <nav style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
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
                        gap: '4px',
                        padding: '8px',
                        transition: 'color 0.2s ease'
                    })}
                >
                    <Icon size={24} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNav;
