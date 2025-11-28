import { useState, useEffect } from 'react';

const STORAGE_KEY = 'stateshift_history';

const useHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    const addSession = (session) => {
        const newSession = {
            ...session,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        };

        const newHistory = [newSession, ...history];
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        return newSession;
    };

    const getStats = () => {
        const totalSessions = history.length;
        const totalMinutes = history.reduce((acc, curr) => acc + (curr.durationSeconds || 0) / 60, 0);

        // Simple streak calculation (consecutive days)
        // This is a simplified version for MVP
        let streak = 0;
        // ... logic would go here

        return {
            totalSessions,
            totalMinutes: Math.round(totalMinutes),
            streak
        };
    };

    return { history, addSession, getStats };
};

export default useHistory;
