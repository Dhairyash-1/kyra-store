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
    <div
      className="
    mx-auto flex w-full 
    min-w-[250px] max-w-[400px] flex-col 
    gap-4
  "
      key={address.id}
    >
      <div
        className="
          flex w-full 
          flex-col space-y-4 
          rounded-md 
          border bg-gray-50 
          px-4
          py-3
    "
      >
        <div className="flex flex-col space-y-3 font-normal text-dark-500">
          <div className="flex w-full items-center justify-between">
            <h1 className="mr-2 truncate text-lg font-bold sm:text-xl">
              {address.fullName}
            </h1>
            <Checkbox
              className="h-5 w-5 sm:h-6 sm:w-6"
              checked={isSelected}
              onCheckedChange={() => onAddressSelect(address.id)}
            />
          </div>
          <p className="line-clamp-2 text-sm sm:text-base">
            {[
              address.addressLine1,
              address.city,
              address.pincode,
              address.state,
            ].join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => setEditId(address.id)}
            aria-label="Edit Address"
            className="
          flex 
          flex-1 items-center justify-center 
          gap-2 
          rounded-xl 
          bg-gray-100 
          px-3 py-2 
          text-xs font-normal 
          text-dark-500 
          transition-colors
          hover:bg-gray-200
          sm:text-sm
        "
          >
            <PenSquareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            aria-label="delete address"
            onClick={() => onAddressDelete(address.id)}
            className="flex  flex-1 items-center justify-center  gap-2  rounded-xl bg-red-100  px-3 py-2  text-xs font-normal  text-red-400  transition-colors hover:bg-red-200 sm:text-sm
        "
          >
            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
      {isSelected && (
        <button className="hover:bg-dark-600  w-full  rounded-lg  bg-dark-500 px-4  py-3 text-sm text-white transition-colors sm:text-base">
          Deliver Here
        </button>
      )}
    </div>
  );
};

export default AddressCard;
