import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AddressStateType {
  fullName: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}
interface AddressFormProp {
  address: AddressStateType;
  setAddress: (address: AddressStateType) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editId: null | number;
  resetForm: () => void;
}

const AddressForm = ({
  address,
  setAddress,
  onSubmit,
  editId,
  resetForm,
}: AddressFormProp) => {
  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold">
        {editId ? "Edit Address" : "Add New Address"}
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine1">Address Line 1</Label>
        <Input
          id="addressLine1"
          value={address.addressLine1}
          onChange={(e) =>
            setAddress({ ...address, addressLine1: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode</Label>
        <Input
          id="pincode"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isDefault"
          checked={address.isDefault}
          onCheckedChange={(value) =>
            setAddress({ ...address, isDefault: Boolean(value) })
          }
        />
        <Label htmlFor="isDefault">Use as my default address</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={resetForm}>
          Cancel
        </Button>
        <Button type="submit">
          {editId ? "Update Address" : "Save Address"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
