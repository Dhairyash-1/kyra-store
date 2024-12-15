import { UseFormReturn } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInformationProps {
  form: UseFormReturn<any>;
}

export function AdditionalInformation({ form }: AdditionalInformationProps) {
  return (
    <div className="space-y-4">
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
