"use client";

import * as React from "react";
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
import { Ingredient, IngredientCategory } from "@/types/meal-planner";

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [ingredient, setIngredient] =
    React.useState<Ingredient>(defaultIngredient);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
        Add ingredient
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="absolute inset-0 bg-black/50 transition-opacity duration-200 ease-in-out"
          />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 animate-in fade-in duration-200">
            <div className="p-6">
              <h2 id="modal-title" className="text-lg font-semibold mb-4">
                Add Ingredient
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      className="mt-1.5"
                      value={ingredient.name}
                      onChange={(e) =>
                        setIngredient({ ...ingredient, name: e.target.value })
                      }
                      placeholder="Enter ingredient name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={ingredient.category}
                      onValueChange={(value: IngredientCategory) =>
                        setIngredient({ ...ingredient, category: value })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(IngredientCategory).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
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
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) =>
                          setIngredient({ ...ingredient, unit: value })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select unit" />
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
                    <Label htmlFor="store">Store (Optional)</Label>
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
                        <SelectValue placeholder="No store selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-store">
                          No store selected
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
                    Cancel
                  </Button>
                  <Button type="submit">Add Ingredient</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
