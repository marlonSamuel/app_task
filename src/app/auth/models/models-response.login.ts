/**
 * Represents a user in the system.
*/
export interface User {
    id: string;
    email: string;
    isNew: boolean;
}

/**
 * Represents the response received after a successful login attempt.
*/
export interface LoginResponse {
    token: string;
    user: User;
}