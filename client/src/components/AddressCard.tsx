import { PenSquareIcon, TrashIcon } from "lucide-react";

import { Checkbox } from "./ui/checkbox";

const AddressCard = ({
  address,
  selectedAddressId,
  onAddressSelect,
  onAddressDelete,
  setEditId,
}: {
  address: any;
  selectedAddressId: number | null;
  onAddressSelect: (id: number) => void;
  onAddressDelete: (id: number) => void;
  setEditId: (id: number) => void;
}) => {
  const isSelected = address.id === selectedAddressId;

  return (
    <div className="flex min-w-[200px] flex-1 flex-col gap-6" key={address.id}>
      <div className="flex flex-col space-y-4 rounded-md border bg-gray-5 px-5 py-3 ">
        <div className="flex flex-col space-y-3 font-normal text-dark-500">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{address.fullName}</h1>
            <Checkbox
              className="h-6 w-6"
              checked={isSelected}
              onCheckedChange={() => onAddressSelect(address.id)}
            />
          </div>
          <p className="line-clamp-2 text-base">
            {[
              address.addressLine1,
              address.city,
              address.pincode,
              address.state,
            ].join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 align-bottom">
          <button
            onClick={() => setEditId(address.id)}
            className="flex-center flex-1 gap-2 rounded-xl bg-gray-20 px-4 py-3 font-normal text-dark-500"
          >
            <PenSquareIcon /> Edit
          </button>
          <button
            onClick={() => onAddressDelete(address.id)}
            className="flex-center flex-1 gap-2 rounded-xl bg-red-100 px-4 py-3 font-normal text-red-400"
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </div>
      {isSelected && (
        <button className=" mx-2 rounded-lg bg-dark-500 px-6 py-4 text-white">
          Deliver Here
        </button>
      )}
    </div>
  );
};

export default AddressCard;
