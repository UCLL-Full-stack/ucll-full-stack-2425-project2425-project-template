/*
 * NOT IMPLEMENTED, THE CODE HERE IS FOR REFERENCE
 * This component displays a shopping list sidebar where users can view, add, edit, and remove ingredients
 * Ingredients can be grouped by category or viewed all together in alphabetical order
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AddIngredientDialog } from "./shopping-list-functionality/AddIngredientPopup";

// This comes from the backend
type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
};

type GroupBy = "all" | "category";

const ShoppingList = () => {
  const [groupBy, setGroupBy] = useState<GroupBy>("category");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editingIngredientId, setEditingIngredientId] = useState<String | null>(
    null
  );

  // Temporary mock data - this will come from the backend
  const mockIngredients: Ingredient[] = [
    {
      id: "1",
      name: "Flour",
      quantity: 500,
      unit: "g",
      category: "Baking & Cooking",
      checked: true,
    },
    {
      id: "2",
      name: "Sugar",
      quantity: 200,
      unit: "g",
      category: "Baking & Cooking",
      checked: false,
    },
    {
      id: "3",
      name: "Salt",
      quantity: 100,
      unit: "g",
      category: "Baking & Cooking",
      checked: false,
    },
    {
      id: "4",
      name: "Tomatoes",
      quantity: 4,
      unit: "pcs",
      category: "Produce",
      checked: false,
    },
    {
      id: "5",
      name: "Lettuce",
      quantity: 1,
      unit: "head",
      category: "Produce",
      checked: true,
    },
    {
      id: "6",
      name: "Carrots",
      quantity: 6,
      unit: "pcs",
      category: "Produce",
      checked: false,
    },
    {
      id: "7",
      name: "Onions",
      quantity: 3,
      unit: "pcs",
      category: "Produce",
      checked: true,
    },
    {
      id: "8",
      name: "Chicken Breast",
      quantity: 500,
      unit: "g",
      category: "Meat",
      checked: false,
    },
    {
      id: "9",
      name: "Ground Beef",
      quantity: 400,
      unit: "g",
      category: "Meat",
      checked: false,
    },
  ];

  useEffect(() => {
    setIngredients(mockIngredients);
  }, []);

  const handleQuantityChange = (id: string, change: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? {
              ...ingredient,
              quantity: Math.max(0, ingredient.quantity + change), // to make sure it doesn't go bellow 0
            }
          : ingredient
      )
    );
  };

  const handleQuantityEdit = (id: string, newQuantity: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ing.id === id ? { ...ing, quantity: Math.max(0, newQuantity) } : ing
      )
    );
    setEditingIngredientId(null);
  };

  const handleDeleteIngredient = (id: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const handleToggleCheck = (id: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
  };

  // group ingredients by their categories
  const groupedIngredients: Record<string, Ingredient[]> = {};
  ingredients.forEach((ingredient) => {
    if (!groupedIngredients[ingredient.category]) {
      groupedIngredients[ingredient.category] = [];
    }
    groupedIngredients[ingredient.category].push(ingredient);
  });

  // render ingredients to handle the logic easier
  const renderIngredient = (ingredient: Ingredient) => (
    <div
      key={ingredient.id}
      className="flex items-center justify-between text-sm py-2 group"
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={ingredient.checked}
          onCheckedChange={() => handleToggleCheck(ingredient.id)}
          id={`checkbox-${ingredient.id}`}
        />
        <label
          htmlFor={`checkbox-${ingredient.id}`}
          className={`cursor-pointer ${
            ingredient.checked ? "line-through text-gray-400" : ""
          }`}
        >
          {ingredient.name}
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => handleQuantityChange(ingredient.id, -1)}
        >
          <Minus className="h-3 w-3" />
        </Button>

        {editingIngredientId === ingredient.id ? (
          <Input
            type="number"
            value={ingredient.quantity}
            onChange={(e) =>
              handleQuantityEdit(ingredient.id, Number(e.target.value))
            }
            onBlur={() => setEditingIngredientId(null)}
            className="w-16 h-6 text-center"
            autoFocus
          />
        ) : (
          <span
            className="w-16 text-center cursor-pointer"
            onClick={() => setEditingIngredientId(ingredient.id)}
          >
            {ingredient.quantity} {ingredient.unit}
          </span>
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => handleQuantityChange(ingredient.id, 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => handleDeleteIngredient(ingredient.id)}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <aside className="h-screen border-l bg-white">
      <div className="flex flex-col h-full">
        <section className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Shopping List</h2>
          <section className="flex items-center gap-2">
            <AddIngredientDialog />
            <Select
              value={groupBy}
              onValueChange={(value: GroupBy) => setGroupBy(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Group by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Show All</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </section>
        </section>

        <section className="flex-1 overflow-auto p-4">
          <section className="space-y-4">
            {groupBy === "all" ? (
              <Card>
                <CardContent className="p-4">
                  <section className="space-y-2">
                    {ingredients.map(renderIngredient)}
                  </section>
                </CardContent>
              </Card>
            ) : (
              Object.entries(groupedIngredients).map(
                ([category, categoryIngredients]) => (
                  <Card key={category}>
                    <CardContent className="p-4">
                      <article className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">
                          {category} ({categoryIngredients.length})
                        </h3>
                      </article>
                      <section className="space-y-2">
                        {categoryIngredients.map(renderIngredient)}
                      </section>
                    </CardContent>
                  </Card>
                )
              )
            )}
          </section>
        </section>
      </div>
    </aside>
  );
};

export default ShoppingList;
