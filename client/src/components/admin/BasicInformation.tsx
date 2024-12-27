import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateProductBasicInfoMutation } from "@/services/productApi";

interface BasicInformationProps {
  form: UseFormReturn<any>;
  mode: "ADD" | "EDIT";
}

export function BasicInformation({ form, mode }: BasicInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const isInputDisabled = !isEditing && mode === "EDIT";
  const [updateBasicInfo, { isLoading: isUpdating }] =
    useUpdateProductBasicInfoMutation();
  const { id } = useParams();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const data = form.getValues();
    await updateBasicInfo({
      id: Number(id),
      name: data.name,
      brand: data.brand,
      isPublished: data.isPublished,
      description: data.description,
      slug: data.slug,
      additionalInfo: data.additionalInfo,
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
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Shirt, Pant, Shoes"
                {...field}
                disabled={isInputDisabled}
              />
            </FormControl>
            <FormDescription>Enter the name of your product.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Levi's, Louis Philippe"
                {...field}
                disabled={isInputDisabled}
              />
            </FormControl>
            <FormDescription>
              Enter the brand name of your product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Description</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={isInputDisabled} />
            </FormControl>
            <FormDescription>
              Enter the brand name of your product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* show when  form in edit mode */}
      {mode === "EDIT" && (
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Status</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={(value) => field.onChange(value.toString())}
                disabled={isInputDisabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Published</SelectItem>
                  <SelectItem value="false">Unpublished</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the current status of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex">
              Product Slug
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="ml-2 h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      This will be used in the product's URL. It's automatically
                      generated based on the product name, but you can edit it
                      if needed.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Auto-generated from product name"
                {...field}
                disabled={isInputDisabled}
              />
            </FormControl>
            <FormDescription>
              This will automatically be generated based on the product name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information (JSON Format)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter additional product information in JSON format"
                className="font-mono"
                rows={10}
                {...field}
                disabled={isInputDisabled}
              />
            </FormControl>
            <FormDescription>
              For example:{" "}
              {
                '{\n  "material": "100% Cotton",\n  "careInstructions": "Machine wash cold"\n}'
              }
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
