import { Link } from "react-router-dom"

import './NotFound.css'

export const NotFound = () => {
    return (
        <div className="bg-notfound">
            <div className="bg-notfound-content">
                <h1 className="bg-notfound-title">404</h1>
                <p className="bg-notfound-subtitle">Página não encontrada</p>
                <p className="bg-notfound-message">
                    Desculpe, mas a página que você está procurando não existe. Volte à página inicial ou explore o site!
                </p>
                <Link to={"/"} className="bg-notfound-btn">Voltar para Home</Link>
            </div>
        </div>
    )
}