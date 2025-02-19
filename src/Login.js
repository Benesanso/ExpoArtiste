import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Header from './Header';

function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

// Fonction de connexion
const handleLogin = async (e) => {
e.preventDefault();
try {
await signInWithEmailAndPassword(auth, email, password);
navigate('/dashboard'); // 🔥 Redirige vers le Dashboard après connexion
} catch (error) {
console.error(error);
switch (error.code) {
case 'auth/invalid-email':
    alert('Email invalide');
    break;
case 'auth/user-not-found':
    alert('Utilisateur non trouvé');
    break;
case 'auth/wrong-password':
    alert('Mot de passe incorrect');
    break;
default:
    alert('Erreur de connexion');
}
}
};

return (
<div className="form-container">
<Header />
    <h2>Connexion</h2>
    <form onSubmit={handleLogin}>
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
    />
    <input 
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
    />
    <button type="submit">Se connecter</button>
    </form>
</div>
);
}

export default LoginPage;
