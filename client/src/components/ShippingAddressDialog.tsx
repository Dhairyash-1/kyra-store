import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAddShippingAddressMutation,
  useGetShippingAddressByIdQuery,
  useUpdateShippingAddressMutation,
} from "@/services/authApi";

interface DialogPropType {
  mode: "create" | "edit";
  addressId?: number;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}
const initialAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

const ShippingAddressDialog: React.FC<DialogPropType> = ({
  mode = "create",
  addressId,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [address, setAddress] = useState(initialAddress);

  const [addShippingAddress, { isLoading: isAdding }] =
    useAddShippingAddressMutation();
  const [updateShippingAddress, { isLoading: isUpdating }] =
    useUpdateShippingAddressMutation();

  const { data: existingAddressData, isFetching } =
    useGetShippingAddressByIdQuery(
      { id: addressId || 0 },
      { skip: mode === "create" || !addressId }
    );

  useEffect(() => {
    if (mode === "edit" && existingAddressData) {
      const existingAddress = existingAddressData.data;
      setAddress({
        ...existingAddress,
        isDefault: existingAddress.isDefaultShipping,
      });
    } else {
      setAddress(initialAddress);
    }
  }, [mode, existingAddressData, isDialogOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "edit") {
        await updateShippingAddress(address).unwrap();
      } else {
        await addShippingAddress(address).unwrap();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(false);
        setAddress(initialAddress);
      }}
    >
      <DialogContent className="sm:max-w-[480px]">
        {isFetching ? (
          <DialogHeader>
            <p>Loading...</p>
          </DialogHeader>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {mode === "edit" ? "Edit Address" : "Add New Address"}
              </DialogTitle>
              <DialogDescription>
                {mode === "edit"
                  ? "Update the details of your address."
                  : "Fill in the details for your new address."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-2 py-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2 py-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              {/* Address Line 1 */}
              <div className="space-y-2 py-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={address.addressLine1}
                  onChange={(e) =>
                    setAddress({ ...address, addressLine1: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              {/* City */}
              <div className="space-y-2 py-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              {/* State */}
              <div className="space-y-2 py-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              {/* Pincode */}
              <div className="space-y-2 py-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="rounded-md p-2"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="isDefault"
                  checked={address.isDefault}
                  onCheckedChange={(value) =>
                    setAddress({ ...address, isDefault: Boolean(value) })
                  }
                />
                <Label htmlFor="isDefault">Use as my default address</Label>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isAdding || isUpdating}
                  className="bg-dark-500 text-white"
                >
                  {isAdding || isUpdating ? "Saving..." : "Save Address"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAddressDialog;
