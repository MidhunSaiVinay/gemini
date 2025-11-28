import { useState, useEffect, useRef } from 'react';

const useBreathController = (pattern) => {
    // pattern example: { inhale: 4000, holdIn: 4000, exhale: 4000, holdOut: 4000 }
    const [phase, setPhase] = useState('idle'); // idle, inhale, holdIn, exhale, holdOut
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const timerRef = useRef(null);
    const startTimeRef = useRef(0);

    const startSession = () => {
        setIsActive(true);
        runPhase('inhale');
    };

    const stopSession = () => {
        setIsActive(false);
        setPhase('idle');
        clearTimeout(timerRef.current);
    };

    const runPhase = (nextPhase) => {
        setPhase(nextPhase);
        const duration = getDuration(nextPhase, pattern);
        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            const next = getNextPhase(nextPhase, pattern);
            runPhase(next);
        }, duration);
    };

    const getDuration = (p, pat) => {
        switch (p) {
            case 'inhale': return pat.inhale;
            case 'holdIn': return pat.holdIn || 0;
            case 'exhale': return pat.exhale;
            case 'holdOut': return pat.holdOut || 0;
            default: return 0;
        }
    };

    const getNextPhase = (current, pat) => {
        switch (current) {
            case 'inhale': return pat.holdIn ? 'holdIn' : 'exhale';
            case 'holdIn': return 'exhale';
            case 'exhale': return pat.holdOut ? 'holdOut' : 'inhale';
            case 'holdOut': return 'inhale';
            default: return 'idle';
        }
    };

    // Cleanup
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return {
        phase,
        isActive,
        startSession,
        stopSession,
        duration: isActive ? getDuration(phase, pattern) : 0
    };
};

export default useBreathController;
