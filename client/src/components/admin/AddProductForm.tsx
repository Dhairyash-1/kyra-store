import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as z from "zod";

import { AdditionalInformation } from "./AdditionalInformation";
import { BasicInformation } from "./BasicInformation";
import { CategorySelection } from "./CategorySelection";
import { ProductSummary } from "./ProductSummary";
import { ProductVariants } from "./ProductVariants";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useGetAllCategoryQuery } from "@/services/categoryApi";
import {
  useAddProductMutation,
  useGetAdminProductByIdQuery,
  useGetProductColorsQuery,
  useGetProductSizesQuery,
} from "@/services/productApi";
import FullPageLoader from "../FullPageLoader";

const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  brand: z.string().min(1, { message: "Brand name is required" }),
  isPublished: z.string().optional(),
  description: z
    .string()
    .min(20, { message: "Product description is required" }),

  slug: z.string().optional(),
  mainCategory: z.object({
    id: z.number().int(),
    name: z.string().min(1, { message: "Main category is required" }),
  }),
  subCategory: z.object({
    id: z.number().int(),
    name: z.string().min(1, { message: "Sub category is required" }),
  }),

  variants: z
    .array(
      z.object({
        color: z.object({
          id: z.number().int(),
          name: z.string().min(1, { message: "Color is required" }),
          hexCode: z.string().optional(),
        }),
        sizes: z
          .array(
            z
              .object({
                size: z.object({
                  id: z.number().int(),
                  name: z.string().min(1, { message: "Size is required" }),
                }),
                price: z
                  .number()
                  .min(0, { message: "Price must be a positive number" }),
                listPrice: z
                  .number()
                  .min(0, { message: "List Price must be a positive number" }),
                sku: z.string().optional(),
                stock: z
                  .number()
                  .int()
                  .min(0, { message: "Stock must be a positive integer" }),
              })
              .refine((data) => data.listPrice > data.price, {
                message: "List Price must be greater than Price",
                path: ["listPrice"],
              })
          )
          .min(1, { message: "At least one size is required" }),
        images: z
          .array(
            z.object({
              url: z.string().url({ message: "Invalid image URL" }),
              isMainImage: z.boolean(),
            })
          )
          .min(1, { message: "At least one image is required" }),
      })
    )
    .min(1, { message: "At least one variant is required" }),
  additionalInfo: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const steps = ["Basic Info", "Category", "Variants", "Summary"];
type formModeTypes = "ADD" | "EDIT";

export function AddProductForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formMode, setFormMode] = useState<formModeTypes>("ADD");
  const [AddProduct, { isLoading: isCreating }] = useAddProductMutation();
  const { id } = useParams();
  const { data, isLoading } = useGetAdminProductByIdQuery(
    { id: Number(id) },
    { skip: !id }
  );
  const { data: categoryData } = useGetAllCategoryQuery();
  const { data: sizesData } = useGetProductSizesQuery();
  const { data: colorsData } = useGetProductColorsQuery();

  const categories = categoryData?.data ?? {};
  const sizes = sizesData?.data ?? [];
  const colors = colorsData?.data ?? [];

  const productData = data?.data;
  const defaultValues = useMemo(
    () =>
      productData
        ? {
            name: productData.name || "",
            brand: productData.brand || "",
            isPublished: productData.isPublished.toString(),
            description: productData.description || "",
            slug: productData.slug || "",
            mainCategory: productData.mainCategory || {},
            subCategory: productData.subCategory || {},
            variants: productData.variants || [
              { color: {}, sizes: [], images: [] },
            ],
            additionalInfo: productData.additionalInfo || "",
          }
        : {
            name: "",
            brand: "",
            isPublished: "",
            description: "",
            slug: "",
            mainCategory: {},
            subCategory: {},
            variants: [{ color: {}, sizes: [], images: [] }],
            additionalInfo: "",
          },
    [productData]
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (id && productData) {
      console.log(productData);
      form.reset(productData);
      setFormMode("EDIT");
    }
  }, [id, productData]);

  async function onSubmit(data: ProductFormValues) {
    console.log(data);
    console.log("submitting");
    await AddProduct({ ...data, isPublished: true }).unwrap();
    toast({ title: "Product Published", variant: "success" });
  }
  function onError(errors: any) {
    console.error("Validation errors:", errors);
  }

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  if (id && isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="mt-16 space-y-8 px-8"
      >
        <Progress
          value={(currentStep / (steps.length - 1)) * 100}
          className="w-full"
        />
        <div className="mb-4 flex justify-between">
          {steps.map((step, index) => (
            <Button
              key={step}
              variant={currentStep === index ? "default" : "outline"}
              onClick={() => setCurrentStep(index)}
              disabled={index > currentStep}
            >
              {step}
            </Button>
          ))}
        </div>
        {currentStep === 0 && <BasicInformation form={form} mode={formMode} />}
        {currentStep === 1 && (
          <CategorySelection
            form={form}
            categories={categories}
            mode={formMode}
          />
        )}
        {currentStep === 2 && (
          <ProductVariants form={form} sizes={sizes} colors={colors} />
        )}
        {/* {currentStep === 3 && <AdditionalInformation form={form} />} */}
        {currentStep === 3 && <ProductSummary form={form} />}
        <div className="mt-8 flex justify-between">
          <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => console.log("Save as Draft")}
              >
                Save as Draft
              </Button>
              <Button type="submit">
                {isCreating ? (
                  <>
                    Publishing <ClipLoader size={12} color="white" />
                  </>
                ) : (
                  "Publish Product"
                )}
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
