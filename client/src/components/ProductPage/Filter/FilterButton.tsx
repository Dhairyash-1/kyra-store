import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  onClick: () => void;
  activeFilters: number;
}

export function FilterButton({ onClick, activeFilters }: FilterButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="z-50 rounded-full border border-dark-90 bg-transparent text-dark-500  lg:hidden"
      size="sm"
    >
      <Filter className="mr-2 h-4 w-4" />
      Filter
      {activeFilters > 0 && (
        <span className="ml-2 rounded-full bg-primary-foreground px-2 py-1 text-xs font-bold text-primary">
          {activeFilters}
        </span>
      )}
    </Button>
  );
}
