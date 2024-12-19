import { Package } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProductsEmptyState() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Package className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No products added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You haven&apos;t added any products yet. Start by adding a new
          product.
        </p>
        <Button size="sm">Add Product</Button>
      </div>
    </div>
  );
}
