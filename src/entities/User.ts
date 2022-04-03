export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: Date;
    last_login: Date;
}

export interface AuthResponse {
    refresh: string;
    access: string;
    user: User;
}

export interface AuthRefreshResponse {
    access: string;
    user: User;
}
