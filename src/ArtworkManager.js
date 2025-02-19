import { useState } from "react";
import { storage, firestore } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function ArtworkManager() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState(null);
const [error, setError] = useState("");

const handleUpload = async (e) => {
e.preventDefault();
if (!image) {
    setError("Veuillez sélectionner une image.");
    return;
}

try {
    // Upload de l'image sur Firebase Storage
    const storageRef = ref(storage, `artworks/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    // Enregistrement dans Firestore
    await addDoc(collection(firestore, "artworks"), {
    title,
    description,
    imageUrl,
    createdAt: Timestamp.now(),
    });

    // Réinitialisation des champs
    setTitle("");
    setDescription("");
    setImage(null);
    setError("");
    alert("Œuvre ajoutée !");
} catch (err) {
    setError("Erreur lors de l'ajout de l'œuvre.");
}
};

return (
<div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
    <h2>Ajouter une œuvre</h2>
    <form onSubmit={handleUpload}>
    <input
        type="text"
        placeholder="Titre de l'œuvre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
    />
    <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
    />
    <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
        style={{ marginBottom: "1rem" }}
    />
    <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
        Ajouter
    </button>
    </form>
    {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
</div>
);
}

export default ArtworkManager;
