import { Download, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActions({
  selectedCount,
  onClearSelection,
}: BulkActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-t bg-background p-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearSelection}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear selection</span>
        </Button>
        <p className="text-sm font-medium">
          {selectedCount} item{selectedCount === 1 ? "" : "s"} selected
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Selected
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
}
