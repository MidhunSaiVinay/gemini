import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause } from 'lucide-react';
import BreathAnimation from './BreathAnimation';
import useBreathController from './useBreathController';

const SessionPlayer = ({ technique, onClose, onComplete }) => {
    const { phase, isActive, startSession, stopSession, duration } = useBreathController(technique.pattern);
    const [startTime, setStartTime] = useState(Date.now());
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    // Refs for audio context
    const audioContextRef = useRef(null);
    const oscillatorsRef = useRef([]);
    const gainNodeRef = useRef(null);

    useEffect(() => {
        // Auto-start
        startSession();
        setStartTime(Date.now());

        // Initialize Audio Context for "Om" drone
        if (audioEnabled) {
            startDrone();
        }

        return () => {
            stopSession();
            stopDrone();
            window.speechSynthesis.cancel();
        };
    }, []);

    // Handle Voice Guidance
    useEffect(() => {
        if (!voiceEnabled || !isActive) return;

        const text = getInstruction(phase);
        if (text === 'Get Ready') return;

        // Cancel previous
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slower, more calming
        utterance.pitch = 0.9; // Slightly deeper
        utterance.volume = 0.8;

        // Try to find a good voice
        const voices = window.speechSynthesis.getVoices();
        const calmVoice = voices.find(v => v.name.includes('Samantha')) || voices[0];
        if (calmVoice) utterance.voice = calmVoice;

        window.speechSynthesis.speak(utterance);

    }, [phase, voiceEnabled, isActive]);

    // Handle Drone Toggle
    useEffect(() => {
        if (audioEnabled && isActive) {
            startDrone();
        } else {
            stopDrone();
        }
    }, [audioEnabled, isActive]);

    const startDrone = () => {
        if (audioContextRef.current) return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.1; // Low volume
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Create oscillators for "Om" (C# approx 136.1 Hz - Earth Year frequency)
        const freqs = [136.1, 272.2]; // Fundamental + Octave

        freqs.forEach(freq => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.connect(masterGain);
            osc.start();
            oscillatorsRef.current.push(osc);
        });
    };

    const stopDrone = () => {
        oscillatorsRef.current.forEach(osc => osc.stop());
        oscillatorsRef.current = [];
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const togglePlay = () => {
        if (isActive) {
            stopSession();
        } else {
            startSession();
        }
    };

    const handleFinish = () => {
        stopSession();
        stopDrone();
        const durationSeconds = (Date.now() - startTime) / 1000;
        onComplete({ durationSeconds });
    };

    const getInstruction = (p) => {
        switch (p) {
            case 'inhale': return 'Breathe In';
            case 'holdIn': return 'Hold';
            case 'exhale': return 'Breathe Out';
            case 'holdOut': return 'Hold';
            default: return 'Get Ready';
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-primary)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            {/* Header */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button
                    onClick={onClose}
                    className="btn-ghost"
                    style={{ padding: '8px' }}
                >
                    <X size={24} />
                </button>
                <span style={{ fontWeight: 600 }}>{technique.name}</span>
                <button
                    onClick={handleFinish}
                    className="btn-ghost"
                    style={{ padding: '8px', color: 'var(--accent-primary)', fontWeight: 'bold' }}
                >
                    Finish
                </button>
            </div>

            {/* Animation */}
            <div style={{ marginBottom: '60px' }}>
                <BreathAnimation phase={phase} duration={duration} />
            </div>

            {/* Instructions */}
            <h2 style={{
                fontSize: '2rem',
                marginBottom: '20px',
                minHeight: '3rem',
                textAlign: 'center'
            }}>
                {getInstruction(phase)}
            </h2>

            {/* Audio Controls */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className="btn-ghost"
                    style={{ opacity: voiceEnabled ? 1 : 0.5, fontSize: '0.9rem' }}
                >
                    {voiceEnabled ? '🗣️ Voice On' : '🗣️ Voice Off'}
                </button>
                <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="btn-ghost"
                    style={{ opacity: audioEnabled ? 1 : 0.5, fontSize: '0.9rem' }}
                >
                    {audioEnabled ? '🕉️ Om On' : '🕉️ Om Off'}
                </button>
            </div>

            {/* Controls */}
            <button
                onClick={togglePlay}
                className="btn-primary"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
            </button>
        </div>
    );
};

export default SessionPlayer;
