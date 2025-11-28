import React from 'react';
import { motion } from 'framer-motion';

const BreathAnimation = ({ phase, duration }) => {
    // Determine scale based on phase
    // Inhale: Expand
    // Hold: Stay
    // Exhale: Contract

    const variants = {
        inhale: { scale: 1.5, opacity: 1 },
        hold: { scale: 1.5, opacity: 0.8 }, // Pulse slightly?
        exhale: { scale: 1, opacity: 0.6 },
        idle: { scale: 1, opacity: 0.3 }
    };

    const transition = {
        duration: duration / 1000, // Convert ms to seconds
        ease: "easeInOut"
    };

    return (
        <div style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Outer Glow */}
            <motion.div
                animate={phase}
                variants={{
                    inhale: { scale: 1.8, opacity: 0.2 },
                    hold: { scale: 1.8, opacity: 0.1 },
                    exhale: { scale: 1.2, opacity: 0 },
                    idle: { scale: 1, opacity: 0 }
                }}
                transition={transition}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    filter: 'blur(20px)',
                    zIndex: 0
                }}
            />

            {/* Main Circle */}
            <motion.div
                animate={phase}
                variants={variants}
                transition={transition}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    boxShadow: '0 0 40px var(--accent-glow)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <span style={{
                    color: 'var(--bg-primary)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}>
                    {phase === 'idle' ? 'Start' : phase}
                </span>
            </motion.div>
        </div>
    );
};

export default BreathAnimation;
