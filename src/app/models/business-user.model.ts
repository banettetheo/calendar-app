export interface BusinessUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;

    // Business specific fields
    jobTitle: string;
    department: string;
    location: string;
    bio: string;
    skills: string[];
    joinDate: Date;
    projects: {
        name: string;
        role: string;
        status: 'active' | 'completed' | 'pending';
        color?: string;
    }[];
    stats: {
        projectsCompleted: number;
        hoursLogged: number;
        efficiency: number;
    };
}

export const MOCK_USER: BusinessUser = {
    id: '1',
    email: 'theo.banette@example.com',
    firstName: 'Théo',
    lastName: 'Banette',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Paris, France',
    bio: 'Passionné par le développement web et les architectures cloud. J\'aime créer des interfaces utilisateur fluides et réactives.',
    skills: ['Angular', 'TypeScript', 'Node.js', 'Cloud Architecture', 'UI/UX Design'],
    joinDate: new Date('2023-01-15'),
    projects: [
        { name: 'Calendar App Redesign', role: 'Lead Developer', status: 'active', color: '#3b82f6' },
        { name: 'API Migration', role: 'Contributor', status: 'completed', color: '#10b981' },
        { name: 'Design System', role: 'Reviewer', status: 'pending', color: '#f59e0b' }
    ],
    stats: {
        projectsCompleted: 12,
        hoursLogged: 1450,
        efficiency: 94
    }
};
