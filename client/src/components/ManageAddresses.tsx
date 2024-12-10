import {
  PenSquareIcon,
  PhoneCallIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";

import FullPageLoader from "./FullPageLoader";
import ShippingAddressDialog from "./ShippingAddressDialog";
import { Separator } from "./ui/separator";

import {
  useDeleteShippingAddressMutation,
  useGetShippingAddressQuery,
} from "@/services/authApi";

const ManageAddresses = () => {
  const [editId, setEditId] = useState<number | undefined>();
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading } = useGetShippingAddressQuery();
  const [deleteShippingAddress] = useDeleteShippingAddressMutation();
  const allAddresses = data?.data;

  if (isLoading) return <FullPageLoader />;

  async function handleAddressDelete(id: number) {
    try {
      await deleteShippingAddress({ id }).unwrap();
      console.log(`Address with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete the address:", error);
    }
  }

  const openDialogForCreate = () => {
    setMode("create");
    setEditId(undefined);
    setIsDialogOpen(true);
  };

  const openDialogForEdit = (id: number) => {
    setEditId(id);
    setMode("edit");
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <button
          className="flex-center max-w-[35%]  gap-2 rounded-md bg-dark-500 px-5 py-4 text-white"
          onClick={openDialogForCreate}
        >
          <PlusIcon className="h-6 w-6" />
          Add New Address
        </button>
        <ShippingAddressDialog
          addressId={editId}
          mode={mode}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
        <div className="space-y-4">
          {allAddresses?.map((address) => (
            <div className="flex flex-col gap-6" key={address.id}>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-3 font-normal text-dark-500">
                  <h1 className="text-xl font-bold">{address.fullName}</h1>
                  <p className="text-lg">
                    {[
                      address.addressLine1,
                      address.city,
                      address.pincode,
                      address.state,
                    ].join(", ")}
                  </p>
                  <p className="flex items-center gap-2 text-lg">
                    <PhoneCallIcon /> {address.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => openDialogForEdit(address.id)}
                    className="flex-center gap-2 rounded-xl bg-gray-20 px-4 py-3 font-normal text-dark-80"
                  >
                    <PenSquareIcon /> Edit
                  </button>
                  <button
                    onClick={() => handleAddressDelete(address.id)}
                    className="flex-center gap-2 rounded-xl bg-red-100 px-4 py-3 font-normal text-red-400"
                  >
                    <TrashIcon /> Delete
                  </button>
                </div>
              </div>
              <Separator className="text-dark-80" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ManageAddresses;
