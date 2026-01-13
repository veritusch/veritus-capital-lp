// export interface TokenData {
//     token: string;
//     email: string;
//     createdAt: string;
//     expiresAt?: string;
//     isValid: boolean;
// }

// export interface AccessResponse {
//     success: boolean;
//     token?: string;
//     message?: string;
// }

// export interface TokenValidationResponse {
//     valid: boolean;
//     email?: string;
//     message?: string;
// }

export interface TokenAccess {
    email: string
    token: string
    createdAt: string
}
