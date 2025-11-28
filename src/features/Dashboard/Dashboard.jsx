import React, { useState } from 'react';
import { techniques } from '../../data/techniques';
import TechniqueCard from './TechniqueCard';
import SessionPlayer from '../../components/BreathEngine/SessionPlayer';
import useHistory from '../../hooks/useHistory';
import PostSession from '../Session/PostSession';

import PanicMode from '../Safety/PanicMode';

const Dashboard = () => {
    const [activeTechnique, setActiveTechnique] = useState(null);
    const [completedSession, setCompletedSession] = useState(null);
    const [showPanic, setShowPanic] = useState(false);
    const { addSession } = useHistory();

    const handleSessionComplete = (sessionData) => {
        const savedSession = addSession({
            techniqueId: activeTechnique.id,
            techniqueName: activeTechnique.name,
            durationSeconds: sessionData.durationSeconds,
            date: new Date().toISOString()
        });
        setActiveTechnique(null);
        setCompletedSession(savedSession);
    };

    if (showPanic) {
        return <PanicMode onClose={() => setShowPanic(false)} />;
    }

    if (completedSession) {
        return <PostSession session={completedSession} onHome={() => setCompletedSession(null)} />;
    }

    return (
        <div className="container">
            <header style={{ marginBottom: '30px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Breathe</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Choose a technique to shift your state.
                    </p>
                </div>
                <button
                    onClick={() => setShowPanic(true)}
                    className="btn-ghost"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', padding: '8px' }}
                >
                    Help
                </button>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {techniques.map(tech => (
                    <TechniqueCard
                        key={tech.id}
                        technique={tech}
                        onClick={() => setActiveTechnique(tech)}
                    />
                ))}
            </div>

            {activeTechnique && (
                <SessionPlayer
                    technique={activeTechnique}
                    onClose={() => setActiveTechnique(null)}
                    onComplete={handleSessionComplete}
                />
            )}
        </div>
    );
};

export default Dashboard;
