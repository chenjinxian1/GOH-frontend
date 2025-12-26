// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
// 🟢 1. 引入 BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            {/* 🟢 2. 用 BrowserRouter 包裹 App */}
            {/* 这样 App 里面的 useLocation 才能正常工作 */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
)