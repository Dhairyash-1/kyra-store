import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  onApply,
  onClear,
}: FilterModalProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[80vh] overflow-y-scroll sm:h-[90vh]"
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="flex flex-col ">
            <CategoryFilter />
            <Separator />
            <PriceFilter />
            <Separator />
            <ColorFilter />
            <Separator />
            <SizeFilter />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClear}>
              Clear All
            </Button>
            <Button onClick={onApply}>Apply Filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
