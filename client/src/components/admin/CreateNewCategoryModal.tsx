import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useCreateCategoryMutation } from "@/services/categoryApi";
import { Categories } from "@/types/categoryType";

interface CreateNewCategoryModalProp {
  categories: Categories;
}

const CreateNewCategoryModal = ({ categories }: CreateNewCategoryModalProp) => {
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState<{
    name: string;
    parentId: null | number;
  }>({
    name: "",
    parentId: null,
  });
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleCreateNewCategory = async () => {
    await createCategory({
      name: newCategory.name,
      parentId: newCategory.parentId,
    }).unwrap();
    setNewCategory({ name: "", parentId: null });
    setIsNewCategoryModalOpen(false);
  };

  return (
    <Dialog
      open={isNewCategoryModalOpen}
      onOpenChange={setIsNewCategoryModalOpen}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* New Category Name */}
          <FormItem>
            <FormLabel>Category Name</FormLabel>
            <FormControl>
              <Input
                value={newCategory.name}
                name="newCategory"
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter new category name"
              />
            </FormControl>
          </FormItem>

          {/* Parent Category */}
          <FormItem>
            <FormLabel>Parent Category (optional)</FormLabel>
            <Select
              onValueChange={(value) =>
                setNewCategory({
                  ...newCategory,
                  parentId: value ? parseInt(value) : null,
                })
              }
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(categories).map((categoryName) => {
                  const category = categories[categoryName];
                  return (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {categoryName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FormItem>

          {/* Submit New Category */}
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleCreateNewCategory}
          >
            {isLoading ? "Creating..." : "Add Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewCategoryModal;
