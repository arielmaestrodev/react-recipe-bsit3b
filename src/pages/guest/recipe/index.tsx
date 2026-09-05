import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "@/lib/axios";
import { Section } from "@/components/ui/section";
import { PageLoading } from "@/components/common/page-loading";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { RecipeMeta } from "@/components/common/recipe-meta";
import { UpdateRecipeForm } from "@/components/features/recipe/update-recipe-form";

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
  const [openModal, setOpenModal] = useState(false);

  // Get Recipe by ID
  useEffect(() => {
    const getRecipeById = async () => {
      const response = await api.get(`/recipes/${id}`);
      setRecipe(response.data);
      console.log(response.data);
    }

    getRecipeById();
  }, [id]);

  if (!recipe) {
    return (
      <PageLoading />
    )
  }

  return (
    <Section>
      <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
        Back to Page
      </Link>

      {/* Recipe Details */}
      <Card className="mt-6">
        <div className="h-full bg-gray-100">
          <img className="w-full h-[400px] object-cover" src={recipe.image} alt={recipe.name} />
        </div>

        <div className="space-y-6 p-6">
          {/* Header Title */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium">{recipe.name}</h1>
            <Button onClick={() => setOpenModal(true)}>Update</Button>
          </div>

          {/* Mini Details */}
          <RecipeMeta
            cuisine={recipe.cuisine}
            mealType={recipe.mealType}
            difficulty={recipe.difficulty}
            cookTimeMinutes={recipe.cookTimeMinutes}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <Tag key={tag}>
                {tag}
              </Tag>
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

        {/* Update Recipe Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)} title="Update Recipe">
          <UpdateRecipeForm
            recipe={recipe}
            onSuccess={(updatedRecipe) => {
              setRecipe({ ...recipe, ...updatedRecipe });
              setOpenModal(false);
            }}
          />
        </Modal>
      </Card>
    </Section>
  )
}