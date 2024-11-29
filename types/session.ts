export interface Session {
    user: {
        id: string;
        email: string;
        name: string;
        iat: number;
        exp: number;
    } | null;
}
