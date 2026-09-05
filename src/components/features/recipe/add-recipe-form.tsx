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
}

type AddRecipeFormProps = {
  onSuccess: (newRecipe: Recipe) => void;
}

type FormErrors = {
  image?: string;
  name?: string;
  cuisine?: string;
  mealType?: string;
  difficulty?: string;
  cookTimeMinutes?: string;
  tags?: string;
  ingredients?: string;
  instructions?: string;
}

const requiredMessages: FormErrors = {
  image: "Image URL is required",
  name: "Name is required",
  cuisine: "Cuisine is required",
  mealType: "Meal type is required",
  difficulty: "Difficulty is required",
  cookTimeMinutes: "Cook time minutes is required",
  tags: "Name is required",
  ingredients: "Ingredients is required",
  instructions: "Instructions is required"
}

export function AddRecipeForm({ onSuccess }: AddRecipeFormProps) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? requiredMessages[field] : undefined,
    });
  }

  // Collect Data from Form then Submit to API
  const handleAddRecipe = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { image, name, cuisine, mealType, difficulty, cookTimeMinutes, tags, ingredients, instructions };

    // Validate required fields
    const newErrors: FormErrors = {};
    let hasError = false;

    // Check each required field
    for (const field in values) {
      const key = field as keyof FormErrors;

      if (values[key].trim() === "") {
        newErrors[key] = requiredMessages[key];
        hasError = true;
      }
    }

    setErrors(newErrors);
    if (hasError === true) {
      return;
    }

    // Handle API Submission
    try {
      const response = await api.post("/recipes/add", {
        name,
        image,
        cuisine,
        difficulty,
        cookTimeMinutes: Number(cookTimeMinutes),
        mealType: mealType.split("\n").filter((item) => item.trim() !== ""),
        tags: tags.split("\n").filter((item) => item.trim() !== ""),
        ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
        instructions: instructions.split("\n").filter((item) => item.trim() !== ""),
      });

      onSuccess(response.data);
      alert("Recipe added successfully");

    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  }

  return (
    <form onSubmit={handleAddRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label error={errors.name}>Name</Label>
        <Input type="text" value={name} onChange={(e) => { setName(e.target.value); checkField("name", e.target.value); }}
          onBlur={() => checkField("name", name)} error={errors.name}
        />
      </div>

      <div>
        <Label error={errors.image}>Image URL</Label>
        <Input type="text" value={image} onChange={(e) => { setImage(e.target.value); checkField("image", e.target.value); }}
          onBlur={() => checkField("image", image)} error={errors.image}
        />
      </div>

      <div>
        <Label error={errors.cuisine}>Cuisine</Label>
        <Input type="text" value={cuisine} onChange={(e) => { setCuisine(e.target.value); checkField("cuisine", e.target.value); }}
          onBlur={() => checkField("cuisine", cuisine)} error={errors.cuisine}
        />
      </div>

      <div>
        <Label error={errors.difficulty}>Difficulty</Label>
        <Input type="text" value={difficulty} onChange={(e) => { setDifficulty(e.target.value); checkField("difficulty", e.target.value); }}
          onBlur={() => checkField("difficulty", difficulty)} error={errors.difficulty}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.cookTimeMinutes}>Cook Time (minutes)</Label>
        <Input type="text" value={cookTimeMinutes} onChange={(e) => { setCookTimeMinutes(e.target.value); checkField("cookTimeMinutes", e.target.value); }}
          onBlur={() => checkField("cookTimeMinutes", cookTimeMinutes)} error={errors.cookTimeMinutes}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.mealType}>Meal Type</Label>
        <TextArea rows={3} value={mealType} onChange={(e) => { setMealType(e.target.value); checkField("mealType", e.target.value); }}
          onBlur={() => checkField("mealType", mealType)} error={errors.mealType} placeholder={"BreakFast\nLunch\nDinner"}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.tags}>Tags (one per line)</Label>
        <TextArea rows={3} value={tags} onChange={(e) => { setTags(e.target.value); checkField("tags", e.target.value); }}
          onBlur={() => checkField("tags", tags)} error={errors.tags} placeholder={"Itallian\nPizza"}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.ingredients}>Ingredients (one per line)</Label>
        <TextArea rows={3} value={ingredients} onChange={(e) => { setIngredients(e.target.value); checkField("ingredients", e.target.value); }}
          onBlur={() => checkField("ingredients", ingredients)} error={errors.ingredients} placeholder={"Ingredient 1\nIngredient 2\nIngredient 3"}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.instructions}>Instructions (one per line)</Label>
        <TextArea rows={3} value={instructions} onChange={(e) => { setInstructions(e.target.value); checkField("instructions", e.target.value); }}
          onBlur={() => checkField("instructions", instructions)} error={errors.instructions} placeholder={"Instruction 1\nInstruction 2\nInstruction 3"}
        />
      </div>

      <Button type="submit" className="w-full md:col-span-2">
        Add Recipe
      </Button>
    </form>
  )
}