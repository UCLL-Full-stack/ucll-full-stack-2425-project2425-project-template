import React, { useState } from 'react';
import { Cocktail } from '@types';

type CocktailFormProps = {
  onSubmit: (cocktail: { id: number; name: string; description: string; strongness: number; imageUrl: string }) => void;
};

const CocktailForm: React.FC<CocktailFormProps> = ({ onSubmit }) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [strongness, setStrongness] = useState<number>(0);
  const [imageUrl, setImage] = useState<string>('');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCocktail = { id, name, description, strongness, imageUrl };
    onSubmit(newCocktail);


  };

  return (
    <form onSubmit={handleSubmit} className="cocktail-details">
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="strongness">Strongness (0-100):</label>
        <input
          type="number"
          id="strongness"
          value={strongness}
          onChange={(e) => setStrongness(Number(e.target.value))}
          required
          min="0"
          max="100"
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={imageUrl}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Cocktail</button>
    </form>
  );
};

export default CocktailForm;
