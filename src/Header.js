import './header.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation(); // Récupère la route actuelle

    // Vérifie si la route est Login ou Dashboard pour afficher un header spécifique
    const isLoginOrDashboard = location.pathname === "/login" || location.pathname === "/dashboard";

    return (
        <header>
            <div className="logo">
                <h1>Mon Site d'exposition</h1>
            </div>
            <nav>
                <ul>
                    {/* Si on est sur la page Login ou Dashboard, on affiche un bouton pour revenir à Home */}
                    {isLoginOrDashboard && (
                        <li>
                            <Link to="/"><button>Retour à l'Accueil</button></Link>
                        </li>
                    )}

                    {/* Navigation vers les autres pages */}
                    {!isLoginOrDashboard && (
                        <>
                        
                            <li><Link to="/login"><button>Login</button></Link></li>
                            
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
