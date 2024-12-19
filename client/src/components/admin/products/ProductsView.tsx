import {
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BulkActions } from "./BulkActions";
import { Pagination } from "./Pagination";
import { ProductsEmptyState } from "./ProductsEmptyState";
import { ProductsTable } from "./ProductsTable";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useGetAdminProductsQuery } from "@/services/productApi";
import ClipLoader from "react-spinners/ClipLoader";

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Name: Z to A", value: "name_desc" },
];

const filterOptions = [
  { id: "in_stock", label: "In Stock" },
  { id: "out_of_stock", label: "Out of Stock" },
  { id: "sale", label: "On Sale" },
];

export function ProductsView() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAdminProductsQuery();
  console.log(data);
  const products = data?.data;

  const hasProducts = products?.length > 0;
  const hasSelectedProducts = selectedProducts.length > 0;

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 bg-gray-50 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your products
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => navigate("/admin/products/create")}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-center">
          {" "}
          <ClipLoader />
        </div>
      ) : hasProducts ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-300 pl-8 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filterOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.id}
                      checked={filters.includes(option.id)}
                      onCheckedChange={(checked) => {
                        setFilters(
                          checked
                            ? [...filters, option.id]
                            : filters.filter((id) => id !== option.id)
                        );
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sortOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={sortBy === option.value}
                      onCheckedChange={() => setSortBy(option.value)}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="relative">
            <ProductsTable
              products={products}
              selectedProducts={selectedProducts}
              onSelectedProductsChange={setSelectedProducts}
            />
            {hasSelectedProducts && (
              <BulkActions
                selectedCount={selectedProducts.length}
                onClearSelection={() => setSelectedProducts([])}
              />
            )}
          </div>

          <Pagination
            totalItems={products.length}
            itemsPerPage={10}
            currentPage={1}
            onPageChange={(page) => console.log(`Navigate to page ${page}`)}
          />
        </div>
      ) : (
        <ProductsEmptyState />
      )}
    </div>
  );
}
