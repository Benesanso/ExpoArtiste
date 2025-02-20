import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from './Footer';

function Home() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Toutes");

    useEffect(() => {
        // Charger les images et catégories enregistrées
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || ["Peinture", "Crayon", "Stylo"];

        setImages(storedImages);
        setCategories(["Toutes", ...storedCategories]); // "Toutes" pour afficher toutes les images
    }, []);

    // Filtrer les images par catégorie
    const filteredImages = selectedCategory === "Toutes"
        ? images
        : images.filter(image => image.category === selectedCategory);

    return (
        <div className="home-container">
            <Header />
            <h1>Galerie d'Images</h1>
            <h2>Mon mot d'artiste :</h2>
            <p>Etiam tristique nibh eget felis iaculis bibendum. Quisque venenatis nunc vel molestie tincidunt. Vivamus sodales hendrerit luctus. Vivamus in augue sodales, ultrices libero quis, pulvinar ex. Aliquam erat volutpat. 
            Proin vel pretium turpis, sit amet ornare erat. In dolor ex, iaculis in lacus ut, varius egestas leo. Nam molestie feugiat purus, sed ornare elit tempus eget. Nulla in varius ante, convallis iaculis sem. 
            Aenean nec sapien dolor. Morbi venenatis lectus urna. Nunc sit amet iaculis nisi. Aliquam nec nisi placerat, sollicitudin turpis in, venenatis ante.</p>

            {/* Menu déroulant pour sélectionner une catégorie */}
            <div className="filter-section">
                <label  className="filter">Filtrer par catégorie :</label>
                <select className="filter-button" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Affichage des images filtrées */}
            <div className="images-container">
                {filteredImages.length === 0 ? (
                    <p>Aucune image dans cette catégorie.</p>
                ) : (
                    filteredImages.map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={image.url} alt={image.name} />
                            <p>{image.name} - <strong>{image.category}</strong></p>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Home;
