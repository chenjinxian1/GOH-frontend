// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { HomeLanguageProvider } from './context/HomeLanguageProvider.tsx'
// 🟢 1. Import BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            {/* 🟢 2. Wrap App with BrowserRouter */}
            {/* This ensures that hooks like useLocation inside App work correctly */}
            <BrowserRouter>
                <HomeLanguageProvider>
                    <App />
                </HomeLanguageProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
)
