import { createContext, useContext, useEffect, useState } from 'react';

const USERS_KEY = 'goh_users';
const CURRENT_USER_KEY = 'goh_current_user';

interface StoredUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    age?: string;
    gender?: string;
}

interface DemoCurrentUser {
    id: string;
    uid: string;
    name: string;
    email: string;
    displayName: string;
    createdAt: string;
    age?: string;
    gender?: string;
    photoURL?: string;
}

interface UserProfile {
    uid: string;
    id: string;
    email: string;
    name: string;
    createdAt: string;
    photoURL?: string;
    age?: string;
    gender?: string;
    role?: string;
}

interface AuthContextType {
    currentUser: DemoCurrentUser | null;
    userProfile: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    updateLocalProfile: (updates: Partial<Pick<StoredUser, 'name' | 'age' | 'gender'>>) => Promise<void>;
    updateLocalPassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext)!;
}

const safeParse = <T,>(value: string | null, fallback: T): T => {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch (error) {
        console.error('Failed to parse local auth data:', error);
        return fallback;
    }
};

const readUsers = (): StoredUser[] => safeParse<StoredUser[]>(localStorage.getItem(USERS_KEY), []);

const writeUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toCurrentUser = (user: Omit<StoredUser, 'password'>): DemoCurrentUser => ({
    id: user.id,
    uid: user.id,
    name: user.name,
    email: user.email,
    displayName: user.name,
    createdAt: user.createdAt,
    age: user.age,
    gender: user.gender,
});

const toProfile = (user: DemoCurrentUser): UserProfile => ({
    uid: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    age: user.age,
    gender: user.gender,
    photoURL: user.photoURL,
    role: 'user',
});

const stripPassword = (user: StoredUser) => {
    const { password, ...safeUser } = user;
    return safeUser;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<DemoCurrentUser | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This localStorage auth is only for demo/local development and should not be used in production.
        const stored = safeParse<Omit<StoredUser, 'password'> | null>(
            localStorage.getItem(CURRENT_USER_KEY),
            null
        );

        if (stored) {
            const user = toCurrentUser(stored);
            setCurrentUser(user);
            setUserProfile(toProfile(user));
        }

        setLoading(false);
    }, []);

    const persistCurrentUser = (safeUser: Omit<StoredUser, 'password'>) => {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
        const current = toCurrentUser(safeUser);
        setCurrentUser(current);
        setUserProfile(toProfile(current));
    };

    const register = async (name: string, email: string, password: string) => {
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const normalizedEmail = cleanEmail.toLowerCase();

        if (!cleanName) throw new Error('Name is required.');
        if (!cleanEmail) throw new Error('Email is required.');
        if (!emailPattern.test(cleanEmail)) throw new Error('Please enter a valid email address.');
        if (!password) throw new Error('Password is required.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');

        const users = readUsers();
        const existing = users.find((user) => user.email.toLowerCase() === normalizedEmail);
        if (existing) throw new Error('This email is already registered.');

        const newUser: StoredUser = {
            id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
            name: cleanName,
            email: cleanEmail,
            password,
            createdAt: new Date().toISOString(),
        };

        writeUsers([...users, newUser]);
        persistCurrentUser(stripPassword(newUser));
    };

    const login = async (email: string, password: string) => {
        const cleanEmail = email.trim();
        const normalizedEmail = cleanEmail.toLowerCase();
        if (!cleanEmail) throw new Error('Email is required.');
        if (!password) throw new Error('Password is required.');

        const users = readUsers();
        const user = users.find((item) => item.email.toLowerCase() === normalizedEmail);
        if (!user) throw new Error('User not found.');
        if (user.password !== password) throw new Error('Incorrect password.');

        persistCurrentUser(stripPassword(user));
    };

    const logout = async () => {
        localStorage.removeItem(CURRENT_USER_KEY);
        setCurrentUser(null);
        setUserProfile(null);
    };

    const refreshProfile = async () => {
        const stored = safeParse<Omit<StoredUser, 'password'> | null>(
            localStorage.getItem(CURRENT_USER_KEY),
            null
        );
        if (!stored) {
            setCurrentUser(null);
            setUserProfile(null);
            return;
        }
        const user = toCurrentUser(stored);
        setCurrentUser(user);
        setUserProfile(toProfile(user));
    };

    const updateLocalProfile = async (updates: Partial<Pick<StoredUser, 'name' | 'age' | 'gender'>>) => {
        if (!currentUser) throw new Error('No user is logged in.');
        const users = readUsers();
        const updatedUsers = users.map((user) =>
            user.id === currentUser.id ? { ...user, ...updates, name: updates.name?.trim() || user.name } : user
        );
        writeUsers(updatedUsers);
        const updated = updatedUsers.find((user) => user.id === currentUser.id);
        if (updated) persistCurrentUser(stripPassword(updated));
    };

    const updateLocalPassword = async (newPassword: string) => {
        if (!currentUser) throw new Error('No user is logged in.');
        if (newPassword.length < 6) throw new Error('Password must be at least 6 characters.');

        const users = readUsers();
        const updatedUsers = users.map((user) =>
            user.id === currentUser.id ? { ...user, password: newPassword } : user
        );
        writeUsers(updatedUsers);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userProfile,
                loading,
                login,
                register,
                logout,
                refreshProfile,
                updateLocalProfile,
                updateLocalPassword,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}
