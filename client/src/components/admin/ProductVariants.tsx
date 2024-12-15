import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import { CreateEntityModal } from "./CreateEntityModal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateColorMutation,
  useCreateSizeMutation,
  useGetProductColorsQuery,
  useGetProductSizesQuery,
} from "@/services/productApi";

interface ProductVariantsProps {
  form: UseFormReturn<any>;
}

// const colors = ["Red", "Blue", "Green", "Black", "White", "Add New"];
// const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Add New"];

export function ProductVariants({ form }: ProductVariantsProps) {
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });
  const [isNewColorModalOpen, setNewColorModalOpen] = useState<boolean>(false);
  const [newColor, setNewColor] = useState({ name: "", hexCode: "" });
  const [createColor, { isLoading }] = useCreateColorMutation();
  const { data } = useGetProductColorsQuery();
  const colors = data?.data ?? [];
  const handleCreateNewColor = async () => {
    console.log("color", newColor);
    await createColor(newColor).unwrap();
    setNewColorModalOpen(false);
    setNewColor({ name: "", hexCode: "" });
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {variantFields.map((variantField, variantIndex) => (
          <AccordionItem
            value={`variant-${variantIndex}`}
            key={variantField.id}
          >
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between">
                <span>Variant {variantIndex + 1}</span>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mr-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVariant(variantIndex);
                  }}
                >
                  <Trash2 className="h-4 w-4 " />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Variant Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`variants.${variantIndex}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const selectedColor = colors.find(
                              (color) => color.id === Number(value)
                            );
                            if (selectedColor) {
                              field.onChange(selectedColor);
                            }
                          }}
                          value={field.value?.id?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colors.map((color) => (
                              <SelectItem
                                key={color.id}
                                value={color.id.toString()}
                              >
                                {
                                  <div className="flex items-center">
                                    <span
                                      className="mr-2 h-4 w-4 rounded-full"
                                      style={{
                                        backgroundColor: color.hexCode,
                                      }}
                                    />
                                    {color.name}
                                  </div>
                                }
                              </SelectItem>
                            ))}

                            <div className="px-2 ">
                              <Button
                                type="button"
                                variant="link"
                                className="text-left text-blue-500"
                                onClick={() => setNewColorModalOpen(true)}
                              >
                                + Add New Color
                              </Button>
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <VariantSizes variantIndex={variantIndex} form={form} />
                  <VariantImages variantIndex={variantIndex} form={form} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => appendVariant({ color: "", sizes: [], images: [] })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Variant
      </Button>
      <CreateEntityModal
        entityType="color"
        isOpen={isNewColorModalOpen}
        onOpenChange={setNewColorModalOpen}
        entityData={newColor}
        setEntityData={setNewColor}
        handleCreateEntity={handleCreateNewColor}
        isLoading={isLoading}
      />
    </div>
  );
}

function VariantSizes({
  variantIndex,
  form,
}: {
  variantIndex: number;
  form: UseFormReturn<any>;
}) {
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control: form.control,
    name: `variants.${variantIndex}.sizes`,
  });
  const [isNewSizeModalOpen, setNewSizeModalOpen] = useState<boolean>(false);
  const [newSize, setNewSize] = useState({ size: "" });
  const { data } = useGetProductSizesQuery();
  const [createSize, { isLoading }] = useCreateSizeMutation();
  const sizes = data?.data ?? [];

  const handleCreateNewSize = async () => {
    console.log("size", newSize);
    await createSize({ name: newSize.size }).unwrap();
    setNewSizeModalOpen(false);
    setNewSize({ size: "" });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Sizes</h4>
      {sizeFields.map((sizeField, sizeIndex) => (
        <Card key={sizeField.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.sizes.${sizeIndex}.size`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const selectedSize = sizes.find(
                          (size) => size.id === Number(value)
                        );
                        if (selectedSize) {
                          field.onChange(selectedSize);
                        }
                      }}
                      value={field.value?.id?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id.toString()}>
                            {size.name}
                          </SelectItem>
                        ))}
                        <div className="px-4">
                          <Button
                            type="button"
                            variant="link"
                            className="text-left text-blue-500"
                            onClick={() => setNewSizeModalOpen(true)}
                          >
                            + Add New Size
                          </Button>
                        </div>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.sizes.${sizeIndex}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.sizes.${sizeIndex}.listPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter List Price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.sizes.${sizeIndex}.sku`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.sizes.${sizeIndex}.stock`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter stock quantity"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-4"
              onClick={() => removeSize(sizeIndex)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Size
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => appendSize({ size: "", price: 0, sku: "", stock: 0 })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Size
      </Button>
      <CreateEntityModal
        entityType="size"
        isOpen={isNewSizeModalOpen}
        onOpenChange={setNewSizeModalOpen}
        entityData={newSize}
        setEntityData={setNewSize}
        handleCreateEntity={handleCreateNewSize}
        isLoading={isLoading}
      />
    </div>
  );
}

function VariantImages({
  variantIndex,
  form,
}: {
  variantIndex: number;
  form: UseFormReturn<any>;
}) {
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: `variants.${variantIndex}.images`,
  });

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Images</h4>
      {imageFields.map((imageField, imageIndex) => (
        <Card key={imageField.id}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name={`variants.${variantIndex}.images.${imageIndex}.url`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${variantIndex}.images.${imageIndex}.file`}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`variants.${variantIndex}.images.${imageIndex}.isMainImage`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Set as Main Image
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-4"
              onClick={() => removeImage(imageIndex)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Image
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => appendImage({ url: "", file: null, isMainImage: false })}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Image
      </Button>
    </div>
  );
}
