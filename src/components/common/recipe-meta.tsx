type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
}

export function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  return (
    <div className="space-y-1 text-sm text-gray-600">
      <p>Cuisine: {cuisine}</p>
      <p>Meal Type: {mealType.join(" , ")}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Cooking time (minutes): {cookTimeMinutes} mins</p>
    </div>
  )
}