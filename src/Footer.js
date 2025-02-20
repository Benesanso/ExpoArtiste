import React from "react";
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Galerie d'Images. Tous droits réservés --  Développement by Bénédicte SANSONNETTE</p>
            <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;
