export const transformMenuCategories = (
  data: object
): Record<string, { id: number; name: string; slug: string }[]> => {
  const transformedCategories: Record<
    string,
    { id: number; name: string; slug: string }[]
  > = {};

  for (const [category, value] of Object.entries(data)) {
    transformedCategories[category] = value.subcategories.map(
      (subcategory: { id: number; name: string; slug: string }) => ({
        id: subcategory.id,
        name: subcategory.name,
        slug: subcategory.slug,
      })
    );
  }

  return transformedCategories;
};
