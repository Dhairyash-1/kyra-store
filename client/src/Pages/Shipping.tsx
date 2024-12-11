import { loadStripe } from "@stripe/stripe-js";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddressCard from "@/components/AddressCard";
import AddressForm from "@/components/AddressForm";
import CouponInput from "@/components/CouponInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  useAddShippingAddressMutation,
  useDeleteShippingAddressMutation,
  useGetShippingAddressByIdQuery,
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
} from "@/services/authApi";
import { useCreateOrderMutation } from "@/services/orderApi";
import { RootState } from "@/store/store";

const stripePromise = loadStripe(
  "pk_test_51PuK56P76TUji6q9c0aFYwIKOO31SXrHWXzH4NHucF8NzLIWWaq3coMQYwWUUJq8Z4nO07VjDLBTnUznlFRdkTJD00aPPtN7uv"
);

const initialAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};
const Shipping = () => {
  const { data } = useGetShippingAddressQuery();
  const allAddress = data?.data || [];
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [address, setAddress] = useState(initialAddress);
  const [editId, setEditId] = useState<null | number>(null);

  const [deleteShippingAddress] = useDeleteShippingAddressMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [updateShippingAddress] = useUpdateShippingAddressMutation();
  const [createOrder, { isLoading: isOrdering }] = useCreateOrderMutation();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const { data: existingAddressData } = useGetShippingAddressByIdQuery(
    { id: editId || 0 },
    { skip: editId === null }
  );

  const defaultAddress = allAddress.find(
    (address) => address.isDefaultShipping
  );
  const remainingAddresses = allAddress.filter(
    (address) => address.id !== defaultAddress?.id
  );
  const selectedAddresses = [
    ...(defaultAddress ? [defaultAddress] : []),
    ...remainingAddresses,
  ];

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (existingAddressData && editId) {
      const existingAddress = existingAddressData.data;
      setAddress({
        ...existingAddress,
        isDefault: existingAddress.isDefaultShipping,
      });
    } else {
      setAddress(initialAddress);
    }
  }, [editId, existingAddressData]);

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const addressDelete = async (id: number) => {
    await deleteShippingAddress({ id }).unwrap();
  };
  const handleAddressSaveUpdate = async () => {
    if (editId) {
      await updateShippingAddress(address).unwrap();
    } else {
      await addShippingAddress(address).unwrap();
    }
  };

  const resetAddressForm = () => {
    setAddress({
      fullName: "",
      phone: "",
      addressLine1: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddressSaveUpdate();
    resetAddressForm();
  };

  async function handlePayment() {
    if (!selectedAddressId) return alert("addressId not vaild");
    try {
      const response = await createOrder({
        addressId: selectedAddressId,
        cartItems: items,
        totalAmount: totalPrice,
      }).unwrap();
      console.log("order", response);
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: response?.data?.sessionId as string,
        });
        console.log(error, "stripecheckout");
      } else {
        console.error("Stripe is not loaded");
      }
    } catch (error) {
      console.log("error in creating order", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-normal text-dark-500">Shipping Address</h1>
      <div className="mt-8 flex flex-col  lg:flex-row lg:space-x-8">
        <div className="flex-grow lg:w-2/3">
          <div>
            <h3 className="mb-2 text-xl font-bold sm:text-2xl">
              Select a delivery address
            </h3>
            <p className="mb-4 text-sm text-dark-500 sm:text-base">
              Is the address you'd like to use displayed below? If so, click the
              corresponding "Deliver here" button. Or you can enter a new
              delivery address.
            </p>

            {/* Address Form dialog for small screen */}
            <div className="mb-4 lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editId ? "Edit Address" : "Add New Address"}
                    </DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    address={address}
                    setAddress={setAddress}
                    onSubmit={handleSubmit}
                    editId={editId}
                    resetForm={resetAddressForm}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-4  flex justify-between gap-6">
              {selectedAddresses?.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={handleAddressSelect}
                  onAddressDelete={addressDelete}
                  setEditId={setEditId}
                />
              ))}
            </div>
            <Separator className="my-8" />
          </div>
          <div className="mt-8 hidden lg:block">
            <AddressForm
              onSubmit={handleSubmit}
              address={address}
              setAddress={setAddress}
              editId={editId}
              resetForm={resetAddressForm}
            />
          </div>
        </div>

        <div className="h-fit w-full rounded-lg border bg-white p-6 shadow-sm lg:w-1/3 lg:max-w-[400px] xl:p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-dark-500">Subtotal</h2>
              <span className="font-bold text-dark-500">₹{totalPrice}</span>
            </div>
            <Separator />
            <CouponInput />
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold text-dark-500">
                Grand Total:
              </span>
              <span className="text-lg font-semibold text-dark-500">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>
            <Link to="/shipping">
              <button
                onClick={handlePayment}
                disabled={selectedAddressId === null}
                className="mt-4 w-full rounded-lg bg-dark-500 py-4 text-lg font-normal text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-[#3A383F] disabled:text-gray-80"
              >
                {isOrdering ? "Processing" : "Proceed to pay"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
