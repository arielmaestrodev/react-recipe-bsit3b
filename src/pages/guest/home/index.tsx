import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-lg font-medium mb-5">Recipe List</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border border-gray-200 rounded-lg">
            <div className="aspect-[4/3] bg-gray-100">
              <img src={recipe.image} alt={recipe.name} />
            </div>

            <div className="space-y-3 p-4">
              <h1 className="font-medium">{recipe.name}</h1>

              <div className="space-y-1 text-sm text-gray-600">
                <p>Cuisine: {recipe.cuisine}</p>
                <p>Meal Type: {recipe.mealType.join(" , ")}</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <p>Cooking time (minutes): {recipe.cookTimeMinutes} mins</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-5">
                <Link to={`/recipe/${recipe.id}`}>
                  <button className="bg-gray-700 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-all cursor-pointer w-full">
                    View
                  </button>
                </Link>
                <button onClick={() => handleDelete(recipe.id)} className="bg-red-600 text-white text-sm px-3 py-2 rounded-md hover:bg-red-700 transition-all cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}