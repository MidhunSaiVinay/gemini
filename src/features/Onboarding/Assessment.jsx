import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const questions = [
    {
        id: 'goal',
        question: "What's your primary goal?",
        options: [
            { id: 'calm', label: 'Reduce Stress', icon: '🌊' },
            { id: 'energy', label: 'Boost Energy', icon: '⚡' },
            { id: 'focus', label: 'Improve Focus', icon: '🎯' },
            { id: 'sleep', label: 'Better Sleep', icon: '🌙' },
        ]
    },
    {
        id: 'experience',
        question: "Have you practiced breathwork before?",
        options: [
            { id: 'new', label: 'I\'m new to this', icon: '🌱' },
            { id: 'some', label: 'I\'ve tried a bit', icon: '🌿' },
            { id: 'pro', label: 'I practice regularly', icon: '🌳' },
        ]
    }
];

const Assessment = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const handleSelect = (optionId) => {
        const currentQuestion = questions[step];
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));

        if (step < questions.length - 1) {
            setTimeout(() => setStep(prev => prev + 1), 300);
        } else {
            // Finished
            onComplete();
            navigate('/dashboard');
        }
    };

    const currentQ = questions[step];
    const progress = ((step + 1) / questions.length) * 100;

    return (
        <div className="container" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '60px'
        }}>
            <div style={{ marginBottom: '40px' }}>
                <div style={{
                    height: '4px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '2px',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'var(--accent-primary)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                    }} />
                </div>

                <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
                    {currentQ.question}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Step {step + 1} of {questions.length}
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ.options.map(option => (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        style={{
                            padding: '20px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 'var(--radius-lg)',
                            color: 'var(--text-primary)',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                        {option.label}
                        {answers[currentQ.id] === option.id && (
                            <Check size={20} style={{ marginLeft: 'auto', color: 'var(--accent-primary)' }} />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Assessment;
