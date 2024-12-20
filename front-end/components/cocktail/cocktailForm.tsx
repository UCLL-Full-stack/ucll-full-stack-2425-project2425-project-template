import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  initialData?: {
    name: string;
    description: string;
    strongness: number;
    image: string;
  };
  onSubmit: (data: any) => void;
  submitButtonText: string;
};

const CocktailForm: React.FC<Props> = ({ initialData, onSubmit, submitButtonText }) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [strongness, setStrongness] = useState(initialData?.strongness || 0);
  const [image, setImage] = useState(initialData?.image || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = t('addCocktail.nameRequired');
    if (!description.trim()) newErrors.description = t('addCocktail.descriptionRequired');
    if (strongness === undefined || strongness === null) newErrors.strongness = t('addCocktail.strongnessRequired');
    if (!image.trim()) newErrors.image = t('addCocktail.imageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, description, strongness, image });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{t('addCocktail.name')}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>{t('addCocktail.description')}</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div>
        <label>{t('addCocktail.strongness')}</label>
        <input type="number" value={strongness} onChange={(e) => setStrongness(Number(e.target.value))} />
        {errors.strongness && <p className="error">{errors.strongness}</p>}
      </div>
      <div>
        <label>{t('addCocktail.image')}</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default CocktailForm;