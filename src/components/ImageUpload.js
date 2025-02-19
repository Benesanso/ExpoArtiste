import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Créer une instance de FileReader pour lire l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Créer un canvas pour redimensionner l'image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const maxWidth = 400; // Largeur maximale souhaitée
          const scale = maxWidth / img.width;
          const newHeight = img.height * scale;

          canvas.width = maxWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, maxWidth, newHeight);

          // Convertir l'image redimensionnée en URL de données
          const resizedImageUrl = canvas.toDataURL();
          setImageUrl(resizedImageUrl); // Mettre à jour l'URL de l'image redimensionnée
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (image) {
      // Simuler l'envoi de l'image redimensionnée vers un serveur ou Firebase
      const formData = new FormData();
      formData.append('image', image);

      // Remplacer par l'URL de ton serveur si tu en as un pour gérer le téléchargement
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Erreur lors du téléchargement', error));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="Aperçu de l'image téléchargée" style={{ maxWidth: '100%' }} />}
      <button onClick={handleUpload}>Télécharger l'image</button>
    </div>
  );
}

export default ImageUpload;
