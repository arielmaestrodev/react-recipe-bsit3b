import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
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
  instructions: string[];
  ingredients: string[];
}

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // Get Recipe by ID
  useEffect(() => {
    const getRecipeById = async () => {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
      console.log(response.data);
    }

    getRecipeById();
  }, [recipe]);

  if (!recipe) {
    return (
      <section className="h-screen flex justify-center items-center flex-col gap-4">
        <img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original" />
        Loading...
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
        Back to Page
      </Link>

      <div className="mt-6 overflow-hidden rounded-md border border-gray-200">
        <div className="h-full bg-gray-100">
          <img className="w-full h-[400px] object-cover" src={recipe.image} alt={recipe.name} />
        </div>

        <div className="space-y-6 p-6">
          {/* Header Title */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">{recipe.name}</h1>
            <button className="bg-gray-700 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-all cursor-pointer">
              Update
            </button>
          </div>

          {/* Mini Details */}
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

          {/* Ingredients */}
          <div>
            <h2 className="mb-2 font-medium">Ingredients</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="mb-2 font-medium">Instructions</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              {recipe.instructions.map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}