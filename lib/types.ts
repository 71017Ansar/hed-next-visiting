// User types
export type UserRole = "superadmin" | "admin" | "principal" | "employee";

export type UserStatus = "active" | "inactive";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	avatar?: string;
}

// Authentication types
export interface AuthState {
	user: {
		token: string | null;
		name: string | null;
		userRole: UserRole | null;
	} | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

// In a real app, you would define more types related to your domain
