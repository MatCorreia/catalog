import React from "react";

import "./AuthLayout.css"

interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="auth-layout">
            <section className="section-auth-layout-img">
                <div className="auth-layout-content">
                    <h2>Explore o catálogo de filmes mais completo da internet</h2>
                    <p>Encontre novos filmes e reviva os clássicos com facilidade.</p>
                </div>
            </section>
            <section className="section-auth-layout">
                <div className="auth-layout-content">
                    {children}
                </div>
            </section>
        </main>
    )
}