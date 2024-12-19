import React from "react";
import { useTranslation } from "next-i18next";
import CocktailService from "@services/CocktailService";

interface CocktailDeleteButtonProps {
  cocktailId: string;
  onDelete: () => void;
}

const CocktailDeleteButton: React.FC<CocktailDeleteButtonProps> = ({ cocktailId, onDelete }) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await CocktailService.deleteCocktail(cocktailId);
      onDelete();
    } catch (error) {
      console.error("Failed to delete cocktail:", error);
    }
  };

  return (
    <button className="btn-delete" onClick={handleDelete}>
      {t("delete")}
    </button>
  );
};

export default CocktailDeleteButton;