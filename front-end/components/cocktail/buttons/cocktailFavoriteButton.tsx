import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import CocktailService from "@services/CocktailService";

interface CocktailFavoriteButtonProps {
  cocktailId: string;
  isFavorite: boolean;
  onFavoriteChange: (isFavorite: boolean) => void;
}

const CocktailFavoriteButton: React.FC<CocktailFavoriteButtonProps> = ({ cocktailId, isFavorite, onFavoriteChange }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        await CocktailService.unfavoriteCocktail(cocktailId);
      } else {
        await CocktailService.favoriteCocktail(cocktailId);
      }
      onFavoriteChange(!isFavorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn-favorite" onClick={handleFavoriteToggle} disabled={loading}>
      {isFavorite ? t("cocktailContainer.unfavorite") : t("cocktailContainer.favorite")}
    </button>
  );
};

export default CocktailFavoriteButton;