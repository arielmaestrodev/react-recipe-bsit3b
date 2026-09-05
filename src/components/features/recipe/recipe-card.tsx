import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { RecipeMeta } from "@/components/common/recipe-meta";

type RecipeCardProps = {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: number) => void;
}

export function RecipeCard({ id, image, name, cuisine, mealType, difficulty, cookTimeMinutes, tags, onDelete }: RecipeCardProps) {
  return (
    <Card>
      <div className="h-72 bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-3 p-4">
        <h1 className="font-medium">{name}</h1>

        <RecipeMeta
          cuisine={cuisine}
          mealType={mealType}
          difficulty={difficulty}
          cookTimeMinutes={cookTimeMinutes}
        />

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-5">
          <Link to={`/recipe/${id}`}>
            <Button className="w-full">
              View
            </Button>
          </Link>
          <Button onClick={() => onDelete(id)} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}