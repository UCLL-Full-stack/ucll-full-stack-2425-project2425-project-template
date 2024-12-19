import React, { useState } from 'react';
import { useTranslation } from "next-i18next";


type CocktailFormProps = {
  onSubmit: (cocktail: { name: string; description: string; strongness: number; image: string }) => void;
};

const CocktailForm: React.FC<CocktailFormProps> = ({ onSubmit }) => {

  const {t} = useTranslation()

  
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
    onSubmit({ ...formData, image: '/placeholder.png' });
  };

  return (
    <form onSubmit={handleSubmit} className="cocktail-form">
      <div className="form-group">
        <label htmlFor="Name">{t('addCocktail.name')}:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">{t('addCocktail.description')}:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="strongness">{t('addCocktail.strongness')}:</label>
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
      <button type="submit" className="submit-btn">{t('addCocktail.save')}</button>
    </form>
  );
};

export default CocktailForm;
