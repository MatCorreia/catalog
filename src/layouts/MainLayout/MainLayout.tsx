import React from "react"
import { Header } from "../../components/Header/Header"

import './MainLayout.css'

interface MainLayoutProps {
    children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            <Header />
            <main className="main-layout container">
                {children}
            </main>
        </div>
    )
}