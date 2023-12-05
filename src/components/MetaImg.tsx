import React from 'react';

const MetaImg = ({ data, format }) => {
  // Convertir le tableau d'octets en une chaîne base64
  const CHUNK_SIZE = 8192; // Taille des morceaux, vous pouvez ajuster selon vos besoins
  let base64Image = '';

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE);
    base64Image += String.fromCharCode.apply(null, chunk);
  }

  base64Image = btoa(base64Image);


//   // Construire l'URL de l'image en utilisant le format indiqué
  const imageUrl = `data:${format};base64,${base64Image}`;

  return (
    <div>
      <img className='w-12 h-12 object-contain' src={imageUrl} alt="Album Cover" />
    </div>
  );
};

export default MetaImg;
