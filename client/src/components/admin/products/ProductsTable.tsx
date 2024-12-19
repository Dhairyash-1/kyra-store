import { Edit, Eye, MoreHorizontal, Star, Trash } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Product {
  id: number;
  name: string;
  category: { name: string };
  productImage: { url: string }[];
  totalStock: number;
  uniqueColors: any;
  price: number;
  rating: number;
  votes: number;
  status: string;
}

interface ProductsTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectedProductsChange: (selectedProducts: number[]) => void;
}

export function ProductsTable({
  products,
  selectedProducts,
  onSelectedProductsChange,
}: ProductsTableProps) {
  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      onSelectedProductsChange([]);
    } else {
      onSelectedProductsChange(products.map((product) => product.id));
    }
  };

  const toggleOne = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      onSelectedProductsChange(
        selectedProducts.filter((id) => id !== productId)
      );
    } else {
      onSelectedProductsChange([...selectedProducts, productId]);
    }
  };

  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 ">
            <TableHead className="w-12">
              <Checkbox
                // checked={selectedProducts.length === products.length}
                onCheckedChange={toggleAll}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead className="text-start">Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow
              key={product.id}
              className="group hover:bg-gray-50"
              data-selected={selectedProducts.includes(product.id)}
            >
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleOne(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell>
                <img
                  src={product.productImage[0]?.url}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {product.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.category.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-start font-medium">
                {product.isPublished ? "Published" : "Unpublished"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={product.totalStock > 0 ? "default" : "destructive"}
                  className="w-fit"
                >
                  {product.totalStock > 0
                    ? `${product.totalStock} in stock`
                    : "Out of stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {product.uniqueColors.map((color: any) => (
                    <div
                      key={color.hexCode}
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor: color.hexCode,
                        borderColor: color.hexCode,
                      }}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-start font-medium">
                ₹{product.price}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating || 0}</span>
                  <span className="text-sm text-gray-500">
                    ({product.votes || 0})
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <div className="flex items-center   gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="">
                          <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
