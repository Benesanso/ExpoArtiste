// Import des fonctions nécessaires depuis Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import de getAnalytics si tu souhaites l'utiliser ultérieurement
// import { getAnalytics } from "firebase/analytics";

// Configuration de Firebase - remplace ces valeurs par celles de ton projet
const firebaseConfig = {
apiKey: "AIzaSyBBI-C7MlIbhwu34-9j4DZ2vXTEpjTvFlY",
authDomain: "expoartiste-83de9.firebaseapp.com",
projectId: "expoartiste-83de9",
storageBucket: "expoartiste-83de9.firebasestorage.app",
messagingSenderId: "1003184455124",
appId: "1:1003184455124:web:1dbee9cf2d3b61f2a46a41",
measurementId: "G-3TCYQLZMT7"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
// Si tu n'utilises pas Analytics, supprime ou commente cette ligne
// const analytics = getAnalytics(app);

// Export des services Firebase à utiliser dans l'application
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
