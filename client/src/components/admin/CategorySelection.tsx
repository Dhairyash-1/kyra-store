import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import CreateNewCategoryModal from "./CreateNewCategoryModal";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/services/categoryApi";

interface CategorySelectionProps {
  form: UseFormReturn<any>;
}

export function CategorySelection({ form }: CategorySelectionProps) {
  // const [selectedMainCategory, setSelectedMainCategory] = useState<
  //   string | undefined
  // >();
  const selectedMainCategory = form.watch("mainCategory");
  const { data } = useGetAllCategoryQuery();
  const categories = data?.data ?? {};

  return (
    <div className="space-y-4">
      {/* Main Category Selection */}
      <FormField
        control={form.control}
        name="mainCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Category</FormLabel>
            <Select
              value={field.value?.name}
              onValueChange={(value) => {
                const category = categories[value];
                console.log(category);
                field.onChange({ id: category.id, name: value });

                console.log("Selected Main Category:", value);
                form.setValue("subCategory", "");
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories &&
                  Object.keys(categories)?.map((categoryName) => {
                    const category = categories[categoryName];
                    return (
                      <SelectItem key={category.id} value={categoryName}>
                        {categoryName}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Subcategory Selection */}
      <FormField
        control={form.control}
        name="subCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subcategory</FormLabel>
            <Select
              value={field.value?.id?.toString()}
              onValueChange={(value) => {
                const selectedSubcategory = Object.keys(categories)
                  .map((name) =>
                    categories[name].subcategories.find(
                      (subcategory) => subcategory.id === Number(value)
                    )
                  )
                  .find((sub) => sub !== undefined); // Find the first matching subcategory

                if (selectedSubcategory) {
                  field.onChange({
                    name: selectedSubcategory.name,
                    id: Number(value),
                  });
                  console.log(
                    "Selected Subcategory:",
                    selectedSubcategory,
                    value
                  );
                } else {
                  console.error("Subcategory not found for value:", value);
                }
              }}
              disabled={!selectedMainCategory.name} // Disable if no main category is selected
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedMainCategory &&
                  categories[selectedMainCategory.name]?.subcategories.map(
                    (subCategory) => (
                      <SelectItem
                        key={subCategory.id}
                        value={subCategory.id.toString()}
                      >
                        {subCategory.name}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* New Category Modal */}
      <CreateNewCategoryModal categories={categories} />
    </div>
  );
}
