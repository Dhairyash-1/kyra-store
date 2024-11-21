export const createSlug = (name: string) => {
  const randomSuffix = Math.random().toString(36).substring(2, 8); //
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${randomSuffix}`
  );
};
