import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface CocktailFormProps {
  onSubmit: (formData: { name: string; description: string; strongness: number; image: string }) => void;
}

const CocktailForm: React.FC<CocktailFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', description: '', strongness: 0, image: '' });
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [strongnessError, setStrongnessError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const clearErrors = () => {
    setNameError(null);
    setDescriptionError(null);
    setStrongnessError(null);
  };

  const validate = (): boolean => {
    let result = true;

    if (!formData.name || formData.name.trim() === '') {
      setNameError(t('addCocktail.nameRequired'));
      result = false;
    }

    if (!formData.description || formData.description.trim() === '') {
      setDescriptionError(t('addCocktail.descriptionRequired'));
      result = false;
    }

    if (formData.strongness <= 0) {
      setStrongnessError(t('addCocktail.strongnessRequired'));
      result = false;
    }

    return result;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    if (!validate()) {
      return;
    }

    onSubmit({ ...formData, image: '/placeholder.png' });
  };

  return (
    <form onSubmit={handleSubmit} className="cocktail-form">
      <div className="form-group">
        <label htmlFor="name">{t('addCocktail.name')}:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {nameError && <div className="error">{nameError}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">{t('addCocktail.description')}:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {descriptionError && <div className="error">{descriptionError}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="strongness">{t('addCocktail.strongness')}:</label>
        <input
          type="number"
          id="strongness"
          value={formData.strongness}
          onChange={handleChange}
          required
        />
        {strongnessError && <div className="error">{strongnessError}</div>}
      </div>
      <button type="submit" className="submit-btn">{t('addCocktail.submit')}</button>
    </form>
  );
};

export default CocktailForm;