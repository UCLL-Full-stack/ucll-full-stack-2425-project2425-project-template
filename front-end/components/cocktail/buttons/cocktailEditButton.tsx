import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import CocktailForm from "../cocktailForm";
import CocktailService from "@services/CocktailService";

interface CocktailEditButtonProps {
  cocktailId: string;
  name: string;
  description: string;
  strongness: number;
  image: string;
  onEdit: () => void;
}

const CocktailEditButton: React.FC<CocktailEditButtonProps> = ({ cocktailId, name, description, strongness, image, onEdit }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (formData: any) => {
    setLoading(true);
    try {
      await CocktailService.updateCocktail({ cocktailId, ...formData });
      onEdit();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to edit cocktail:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn-edit" onClick={() => setIsEditing(true)} disabled={loading}>
        {t("cocktailContainer.edit")}
      </button>
      {isEditing && (
        <CocktailForm
          initialData={{ name, description, strongness, image }}
          onSubmit={handleEdit}
          submitButtonText={t("addCocktail.submit")}
        />
      )}
    </>
  );
};

export default CocktailEditButton;