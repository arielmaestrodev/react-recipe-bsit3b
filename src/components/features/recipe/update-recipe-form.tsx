import { useState, type SubmitEvent } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";

type Recipe = {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onSuccess: (updatedRecipe: Recipe) => void;
}

export function UpdateRecipeForm({ recipe, onSuccess }: UpdateRecipeFormProps) {
  const [name, setName] = useState(recipe.name);
  const [cuisine, setCuisine] = useState(recipe.cuisine);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(recipe.cookTimeMinutes);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join("\n"));
  const [instructions, setInstructions] = useState(recipe.instructions.join("\n"));

  const handleUpdateRecipe = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.put(`/recipes/${recipe.id}`, {
        name,
        cuisine,
        difficulty,
        cookTimeMinutes: Number(cookTimeMinutes),
        ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
        instructions: instructions.split("\n").filter((item) => item.trim() !== ""),
      })

      onSuccess(response.data);
      alert("Recipe Updated!");
    } catch (error) {
      console.error("Error on updating recipe: ", error);
    }
  }

  return (
    <form onSubmit={handleUpdateRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label>Name</Label>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <Label>Cuisine</Label>
        <Input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      </div>

      <div>
        <Label>Difficulty</Label>
        <Input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
      </div>

      <div>
        <Label>Cook Times (minutes)</Label>
        <Input type="number" value={cookTimeMinutes} onChange={(e) => setCookTimeMinutes(Number(e.target.value))} />
      </div>

      <div className="md:col-span-2">
        <Label>Ingredients (one per line)</Label>
        <TextArea rows={5} value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      </div>

      <div className="md:col-span-2">
        <Label>Instructions (one per line)</Label>
        <TextArea rows={5} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      </div>

      <Button type="submit" className="w-full md:col-span-2">
        Save Changes
      </Button>
    </form>
  )
}