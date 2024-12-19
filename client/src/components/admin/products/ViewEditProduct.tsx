import { useState } from "react";

import { ArrowLeft, Plus, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface Variant {
  id: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  sku: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  image: string;
  variants: Variant[];
}

const mockProduct: Product = {
  id: "1",
  name: "T-Shirt A",
  description: "A comfortable and stylish t-shirt for everyday wear.",
  category: "T-Shirts",
  sku: "TS-001",
  image: "/placeholder.svg",
  variants: [
    {
      id: "1",
      color: "Black",
      size: "S",
      price: 19.99,
      stock: 50,
      sku: "TS-001-BLK-S",
    },
    {
      id: "2",
      color: "Black",
      size: "M",
      price: 19.99,
      stock: 75,
      sku: "TS-001-BLK-M",
    },
    {
      id: "3",
      color: "White",
      size: "S",
      price: 19.99,
      stock: 60,
      sku: "TS-001-WHT-S",
    },
    {
      id: "4",
      color: "White",
      size: "M",
      price: 19.99,
      stock: 80,
      sku: "TS-001-WHT-M",
    },
  ],
};

export function ViewEditProduct({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>(mockProduct);
  const [newVariant, setNewVariant] = useState<Omit<Variant, "id">>({
    color: "",
    size: "",
    price: 0,
    stock: 0,
    sku: "",
  });

  const handleProductChange = (field: keyof Product, value: string) => {
    setProduct({ ...product, [field]: value });
  };

  const handleVariantChange = (
    id: string,
    field: keyof Variant,
    value: string | number
  ) => {
    setProduct({
      ...product,
      variants: product.variants.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    });
  };

  const handleAddVariant = () => {
    const newId = (
      Math.max(...product.variants.map((v) => parseInt(v.id))) + 1
    ).toString();
    setProduct({
      ...product,
      variants: [...product.variants, { id: newId, ...newVariant }],
    });
    setNewVariant({ color: "", size: "", price: 0, stock: 0, sku: "" });
  };

  const handleDeleteVariant = (id: string) => {
    setProduct({
      ...product,
      variants: product.variants.filter((v) => v.id !== id),
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/products"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold">View/Edit Product</h1>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-6">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={product.name}
              onChange={(e) => handleProductChange("name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={product.description}
              onChange={(e) =>
                handleProductChange("description", e.target.value)
              }
              className="mt-1"
              rows={4}
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="product-category">Category</Label>
            <Select
              value={product.category}
              onValueChange={(value) => handleProductChange("category", value)}
            >
              <SelectTrigger id="product-category" className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-6">
            <Label htmlFor="product-sku">SKU</Label>
            <Input
              id="product-sku"
              value={product.sku}
              onChange={(e) => handleProductChange("sku", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <Label>Main Image</Label>
            <div className="mt-1 flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload/Change Image
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>
                  <Input
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "color", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "size", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "stock",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "sku", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteVariant(variant.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 grid gap-4 md:grid-cols-5">
          <Input
            placeholder="Color"
            value={newVariant.color}
            onChange={(e) =>
              setNewVariant({ ...newVariant, color: e.target.value })
            }
          />
          <Input
            placeholder="Size"
            value={newVariant.size}
            onChange={(e) =>
              setNewVariant({ ...newVariant, size: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            value={newVariant.price || ""}
            onChange={(e) =>
              setNewVariant({
                ...newVariant,
                price: parseFloat(e.target.value),
              })
            }
          />
          <Input
            type="number"
            placeholder="Stock"
            value={newVariant.stock || ""}
            onChange={(e) =>
              setNewVariant({ ...newVariant, stock: parseInt(e.target.value) })
            }
          />
          <Input
            placeholder="SKU"
            value={newVariant.sku}
            onChange={(e) =>
              setNewVariant({ ...newVariant, sku: e.target.value })
            }
          />
        </div>
        <Button onClick={handleAddVariant} className="mt-4">
          <Plus className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Additional Settings</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Shipping Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-weight">Weight (kg)</Label>
                <Input id="product-weight" type="number" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="product-dimensions">Dimensions (cm)</Label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  <Input id="product-length" placeholder="Length" />
                  <Input id="product-width" placeholder="Width" />
                  <Input id="product-height" placeholder="Height" />
                </div>
              </div>
              <div>
                <Label htmlFor="shipping-class">Shipping Class</Label>
                <Select>
                  <SelectTrigger id="shipping-class" className="mt-1">
                    <SelectValue placeholder="Select a shipping class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="overnight">Overnight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea id="meta-description" className="mt-1" rows={3} />
              </div>
              <div>
                <Label htmlFor="meta-keywords">Keywords</Label>
                <Input id="meta-keywords" className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
