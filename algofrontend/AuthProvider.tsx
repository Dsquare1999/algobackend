// AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';

interface AuthState {
    isLoggedIn: boolean;
}

const AuthContext = React.createContext<AuthState>({ isLoggedIn: false });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        const isLoggedIn = jwt !== null && user !== null;
        setAuthState({ isLoggedIn });
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
