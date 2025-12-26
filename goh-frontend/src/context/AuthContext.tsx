// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
// 🟢 修复点：User 是类型，必须加 'type' 关键字
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface UserProfile {
    uid: string;
    email: string;
    name: string;
    photoURL?: string;
    age?: string;
    gender?: string;
    role?: string;
}

interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext)!;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 🟢 修复点：直接 return，消除 "unsubscribe 变量未使用" 的警告
        return onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserProfile(user.uid);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
    }, []);

    const fetchUserProfile = async (uid: string) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserProfile(docSnap.data() as UserProfile);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const refreshProfile = async () => {
        if (currentUser) {
            await fetchUserProfile(currentUser.uid);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, userProfile, loading, logout, refreshProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}