import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ingredient, IngredientCategory } from "@/types/recipes";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const units = [
  "g",
  "kg",
  "ml",
  "l",
  "cup",
  "pcs",
  "tbsp",
  "can",
  "package",
] as const;

const mockStores = ["Albert Heijn", "Colruyt", "Carrefour", "Aldi", "Lidl"];

const defaultIngredient: Ingredient = {
  name: "",
  category: IngredientCategory.Other,
  quantity: 1,
  unit: "g",
};

export function AddIngredientDialog() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState<Ingredient>(defaultIngredient);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Adding ingredient:", ingredient);

    setIngredient(defaultIngredient);
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex-1"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4 mr-1" />
        {t('addIngredient')}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-in-out"
          />

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 animate-in fade-in duration-200">
            <div className="p-6">
              <h2 id="modal-title" className="text-lg font-semibold mb-4">
                {t('addIngredient')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input
                      id="name"
                      className="mt-1.5"
                      value={ingredient.name}
                      onChange={(e) =>
                        setIngredient({ ...ingredient, name: e.target.value })
                      }
                      placeholder={t('enterIngredientName')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">{t('category')}</Label>
                    <Select
                      value={ingredient.category}
                      onValueChange={(value: IngredientCategory) =>
                        setIngredient({ ...ingredient, category: value })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t('selectCategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(IngredientCategory).map((category) => (
                          <SelectItem
                            key={category as string}
                            value={category as string}
                          >
                            {t(category as string)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">{t('quantity')}</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        step="1"
                        className="mt-1.5"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          setIngredient({
                            ...ingredient,
                            quantity: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="unit">{t('unit')}</Label>
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) =>
                          setIngredient({ ...ingredient, unit: value })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder={t('selectUnit')} />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="store">{t('store')} ({t('optional')})</Label>
                    <Select
                      value={ingredient.store || "no-store"}
                      onValueChange={(value) =>
                        setIngredient({
                          ...ingredient,
                          store: value === "no-store" ? undefined : value,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t('noStoreSelected')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-store">
                          {t('noStoreSelected')}
                        </SelectItem>
                        {mockStores.map((store) => (
                          <SelectItem key={store} value={store}>
                            {store}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button type="submit">{t('addIngredient')}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
