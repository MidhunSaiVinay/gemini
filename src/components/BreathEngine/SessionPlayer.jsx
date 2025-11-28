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

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.3;
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // --- 1. Cathedral Reverb (Impulse Response) ---
        const reverb = ctx.createConvolver();
        const duration = 4; // 4 seconds reverb
        const decay = 4;
        const rate = ctx.sampleRate;
        const length = rate * duration;
        const impulse = ctx.createBuffer(2, length, rate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = i / length;
            // Exponential decay noise
            left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, decay);
            right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n, decay);
        }
        reverb.buffer = impulse;
        reverb.connect(masterGain);

        // --- 2. Deep Throat Singing Drone (Sawtooth + Lowpass) ---
        // Base frequency: 68.05 Hz (Low C# approx, 432Hz ref)
        const baseFreq = 68.05;

        // Voice 1: Deep Sawtooth (The "Throat" texture)
        const throatOsc = ctx.createOscillator();
        throatOsc.type = 'sawtooth';
        throatOsc.frequency.value = baseFreq;

        const throatFilter = ctx.createBiquadFilter();
        throatFilter.type = 'lowpass';
        throatFilter.frequency.value = 180; // Cut off high buzz
        throatFilter.Q.value = 1;

        const throatGain = ctx.createGain();
        throatGain.gain.value = 0.15;

        throatOsc.connect(throatFilter);
        throatFilter.connect(throatGain);
        throatGain.connect(reverb); // Send to reverb
        throatGain.connect(masterGain); // And direct

        oscillatorsRef.current.push(throatOsc);
        throatOsc.start();

        // Voice 2: Sub Sine (The "Body")
        const subOsc = ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.value = baseFreq;

        const subGain = ctx.createGain();
        subGain.gain.value = 0.2;

        subOsc.connect(subGain);
        subGain.connect(masterGain); // Direct only (keep sub clean)

        oscillatorsRef.current.push(subOsc);
        subOsc.start();

        // Voice 3: Fifth Harmonic (The "Overtone")
        const harmOsc = ctx.createOscillator();
        harmOsc.type = 'sine';
        harmOsc.frequency.value = baseFreq * 1.5; // Fifth

        const harmGain = ctx.createGain();
        harmGain.gain.value = 0.05;

        harmOsc.connect(harmGain);
        harmGain.connect(reverb);

        oscillatorsRef.current.push(harmOsc);
        harmOsc.start();

        // --- 3. Crackling Texture (Brown Noise) ---
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0; // Initialize lastOut before the loop
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Compensate for gain loss
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 500; // Remove rumble

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.02; // Very subtle

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(reverb);

        oscillatorsRef.current.push(noiseSrc); // Add to cleanup list
        noiseSrc.start();
    };

    const stopDrone = () => {
        oscillatorsRef.current.forEach(node => {
            try {
                // Check if the node has a stop method (e.g., OscillatorNode, AudioBufferSourceNode)
                if (typeof node.stop === 'function') {
                    node.stop();
                }
            } catch (e) {
                console.error("Error stopping audio node:", e);
            }
        });
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
