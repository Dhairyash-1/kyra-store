import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";

import CreateNewCategoryModal from "./CreateNewCategoryModal";
import { Button } from "../ui/button";

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
import { useUpdateProductCategoryMutation } from "@/services/productApi";

interface CategorySelectionProps {
  form: UseFormReturn<any>;
  categories: any;
  mode: "EDIT" | "SAVE";
}

export function CategorySelection({
  form,
  categories,
  mode,
}: CategorySelectionProps) {
  const selectedMainCategory = form.watch("mainCategory");
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateProductCategoryMutation();
  const [isEditing, setIsEditing] = useState(false);
  const isInputDisabled = !isEditing && mode === "EDIT";
  const { id } = useParams();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const data = form.getValues();
    await updateCategory({
      mainCategoryId: data.mainCategory.id,
      subCategoryId: data.subCategory.id,
      id: Number(id),
    }).unwrap();
    setIsEditing(false);
  };

  const handleCancel = () => {
    // You can reset the form to the last saved state
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="mt-6 flex justify-end space-x-4">
        {mode === "EDIT" &&
          (!isEditing ? (
            <Button type="button" onClick={handleEdit} variant="outline">
              Edit
            </Button>
          ) : (
            <>
              <Button
                disabled={isUpdating}
                type="button"
                onClick={handleSave}
                variant="default"
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                disabled={isUpdating}
                onClick={handleCancel}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ))}
      </div>
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
              disabled={isInputDisabled}
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
              disabled={isInputDisabled || !selectedMainCategory.name} // Disable if no main category is selected
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
