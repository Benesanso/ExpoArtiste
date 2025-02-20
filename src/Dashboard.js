import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import './dashboard.css';

function Dashboard() {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem("images")) || [];
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];

        setImages(storedImages);
        setCategories(storedCategories);
        if (storedCategories.length > 0) {
            setCategory(storedCategories[0]);
        }
    }, []);

    const addImage = (event) => {
        const file = event.target.files[0];
        if (!file || categories.length === 0) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImage = {
                id: new Date().getTime(),
                name: file.name,
                url: reader.result,
                category: category,
            };

            const newImages = [newImage, ...images];
            setImages(newImages);
            localStorage.setItem("images", JSON.stringify(newImages));
        };

        reader.readAsDataURL(file);
    };

    const addCategory = () => {
        if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            setNewCategory("");
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            if (categories.length === 0) {
                setCategory(newCategory);
            }
        }
    };

    const deleteCategory = (categoryToDelete) => {
        const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));

        const updatedImages = images.map(img => img.category === categoryToDelete ? { ...img, category: "Non classé" } : img);
        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));

        if (category === categoryToDelete) {
            setCategory(updatedCategories.length > 0 ? updatedCategories[0] : "");
        }
    };

    const deleteImage = (id) => {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));
    };

    const updateImageName = (id, newName) => {
        const updatedImages = images.map(image =>
            image.id === id ? { ...image, name: newName } : image
        );
        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));
    };

    const updateImageCategory = (id, newCategory) => {
        const updatedImages = images.map(image =>
            image.id === id ? { ...image, category: newCategory } : image
        );
        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));
    };

    return (
        <div className="dashboard-container">
            <Header />
            <h1>Gestion des Images</h1>

            <div className="category-management">
                <input
                    type="text"
                    placeholder="Nouvelle catégorie"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={addCategory}>Ajouter</button>
            </div>

            <div className="category-list">
                {categories.length === 0 ? (
                    <p>Aucune catégorie disponible. Ajoutez-en une pour commencer.</p>
                ) : (
                    categories.map((cat) => (
                        <div key={cat} className="category-item">
                            <span>{cat}</span>
                            <button onClick={() => deleteCategory(cat)}>Supprimer</button>
                        </div>
                    ))
                )}
            </div>

            <div className="input-section">
                {categories.length > 0 && (
                    <>
                        <select className="filter-button" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input type="file" accept="image/*" onChange={addImage} />
                    </>
                )}
            </div>

            <div className="images-container">
                {images.length === 0 ? (
                    <p>Aucune image disponible.</p>
                ) : (
                    images.map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={image.url} alt={image.name} />
                            <input className="images-name"
                                type="text"
                                value={image.name}
                                onChange={(e) => updateImageName(image.id, e.target.value)}
                            />
                            <select className="filter-button"
                                value={image.category}
                                onChange={(e) => updateImageCategory(image.id, e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select >
                            <button onClick={() => deleteImage(image.id)}>Supprimer</button>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
