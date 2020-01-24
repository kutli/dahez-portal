export interface User {
    id: number;
    username: string;
    password: string;
    isActive: boolean;
    role: {
        name: string;
    };
}