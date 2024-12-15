import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import { Categories } from "@/types/categoryType";

export function CreateEntityModal({
  entityType,
  isOpen,
  onOpenChange,
  entityData,
  setEntityData,
  handleCreateEntity,
  isLoading,
  categories = {},
}: {
  entityType: "category" | "size" | "color";
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  entityData: any;
  setEntityData: (data: any) => void;
  handleCreateEntity: () => void;
  isLoading: boolean;
  categories?: Categories;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Entity-Specific Inputs */}
          {entityType === "category" && (
            <>
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    value={entityData.name || ""}
                    onChange={(e) =>
                      setEntityData({ ...entityData, name: e.target.value })
                    }
                    placeholder="Enter new category name"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Parent Category (optional)</FormLabel>
                <Select
                  onValueChange={(value) =>
                    setEntityData({
                      ...entityData,
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
            </>
          )}
          {entityType === "size" && (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input
                  value={entityData.size || ""}
                  onChange={(e) =>
                    setEntityData({ ...entityData, size: e.target.value })
                  }
                  placeholder="Enter size"
                />
              </FormControl>
            </FormItem>
          )}
          {entityType === "color" && (
            <>
              <FormItem>
                <FormLabel>Color Name</FormLabel>
                <FormControl>
                  <Input
                    value={entityData.name || ""}
                    onChange={(e) =>
                      setEntityData({
                        ...entityData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter color name"
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Hex Code (optional)</FormLabel>
                <FormControl>
                  <Input
                    value={entityData.hexCode || ""}
                    onChange={(e) =>
                      setEntityData({ ...entityData, hexCode: e.target.value })
                    }
                    placeholder="#FFFFFF"
                  />
                </FormControl>
              </FormItem>
            </>
          )}

          {/* Submit Button */}
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleCreateEntity}
          >
            {isLoading ? (
              <>
                Creating...
                <ClipLoader color="white" size={16} />
              </>
            ) : (
              `Add ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
