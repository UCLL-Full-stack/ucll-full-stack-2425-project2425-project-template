import React, { useState } from 'react';

type CocktailFormProps = {
  onSubmit: (cocktail: { name: string; description: string; strongness: number; imageUrl: string }) => void;
};

const CocktailForm: React.FC<CocktailFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    strongness: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'strongness' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...formData, imageUrl: '/placeholder.png' });
  };

  return (
    <form onSubmit={handleSubmit} className="cocktail-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="strongness">Strongness (0-5):</label>
        <input
          type="number"
          id="strongness"
          value={formData.strongness}
          onChange={handleChange}
          required
          min="0"
          max="5"
        />
      </div>
      <button type="submit" className="submit-btn">Add Cocktail</button>
    </form>
  );
};

export default CocktailForm;
