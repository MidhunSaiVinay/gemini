import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
    const location = useLocation();
    const showNav = location.pathname !== '/onboarding';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <main style={{
                flex: 1,
                overflowY: 'auto',
                paddingBottom: showNav ? '80px' : '0',
                position: 'relative'
            }}>
                {children}
            </main>
            {showNav && <BottomNav />}
        </div>
    );
};

export default Layout;
