export const techniques = [
    {
        id: 'calm-1',
        name: 'Extended Exhale',
        category: 'calm',
        description: 'Activate your parasympathetic nervous system.',
        pattern: { inhale: 4000, holdIn: 0, exhale: 8000, holdOut: 0 },
        duration: '5-15 min',
        color: 'var(--accent-primary)'
    },
    {
        id: 'calm-2',
        name: 'Box Breathing',
        category: 'calm',
        description: 'Regain control and clarity.',
        pattern: { inhale: 4000, holdIn: 4000, exhale: 4000, holdOut: 4000 },
        duration: '5-20 min',
        color: 'var(--accent-secondary)'
    },
    {
        id: 'focus-1',
        name: 'Coherent Breathing',
        category: 'focus',
        description: 'Balance your heart rate variability.',
        pattern: { inhale: 5500, holdIn: 0, exhale: 5500, holdOut: 0 },
        duration: '10-20 min',
        color: '#a855f7' // Purple
    },
    {
        id: 'energy-1',
        name: 'Breath of Fire',
        category: 'energy',
        description: 'Rapid rhythmic breathing for energy.',
        pattern: { inhale: 500, holdIn: 0, exhale: 500, holdOut: 0 }, // Simplified for MVP
        duration: '1-5 min',
        color: 'var(--warm-primary)'
    }
];
