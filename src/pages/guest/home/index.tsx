import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Section } from "@/components/ui/section";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/features/recipe/recipe-card";
import { AddRecipeForm } from "@/components/features/recipe/add-recipe-form";

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

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data.recipes);
        console.log(response.data.recipes);
      } catch (error) {
        console.error(error);
      }
    }

    getAllRecipes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const confirmed = confirm("Do you want to delete this recipe?");
      if (!confirmed) {
        return;
      }

      await api.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      alert(`Deleted recipe no. ${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Section>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg font-medium">Recipe List</h1>
        <Button onClick={() => setOpenModal(true)}>Add Recipe</Button>
      </div>

      {/* Recipe List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            image={recipe.image}
            name={recipe.name}
            cuisine={recipe.cuisine}
            mealType={recipe.mealType}
            difficulty={recipe.difficulty}
            cookTimeMinutes={recipe.cookTimeMinutes}
            tags={recipe.tags}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Add Recipe Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Add Recipe">
        <AddRecipeForm onSuccess={(newRecipe) => {
          setRecipes([
            {
              ...newRecipe,
              image: newRecipe.image || '',
              mealType: newRecipe.mealType || [],
              tags: newRecipe.tags || [],
            },
            ...recipes
          ]);
          setOpenModal(false);
        }}
        />
      </Modal>
    </Section>
  )
}