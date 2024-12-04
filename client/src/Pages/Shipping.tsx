import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AddressCard from "@/components/AddressCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [addShippingAddress, { isLoading: isAdding }] =
    useAddShippingAddressMutation();
  const [updateShippingAddress, { isLoading: isUpdating }] =
    useUpdateShippingAddressMutation();
  const [createOrder, { isLoading: isOrdering, data: orderResponse }] =
    useCreateOrderMutation();
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
    <div className="mt-8 md:px-20">
      <h1 className="text-4xl font-normal text-dark-500">Shipping Address</h1>
      <div className="mt-8 flex flex-col md:flex-row md:justify-between">
        <div>
          <div className="flex-grow">
            <h3 className="text-2xl font-bold">Select a delivery address</h3>
            <p className="text-lg font-normal text-dark-500">
              Is the address you'd like to use displayed below? If so, click the
              corresponding "Deliver here" button. Or you can enter new delivery
              address.
            </p>
            <div className="mt-4 flex  justify-between  gap-6">
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
          <form onSubmit={handleAddressSaveUpdate}>
            {/* Full Name */}
            <h1 className="my-4 text-2xl font-semibold">
              {editId ? "Edit address" : "Add a new address"}
            </h1>
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
                onClick={() => {
                  setAddress(initialAddress);
                  setEditId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isAdding || isUpdating}
                className="bg-dark-500 text-white"
              >
                {editId ? "Edit Address" : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </div>

        <div className="mt-8 h-fit w-full rounded-md border border-gray-200 p-6 shadow-sm md:ml-8 md:mt-0 md:w-[40%]">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-dark-500">Subtotal</h2>
            <span className=" font-bold text-dark-500">₹{totalPrice}</span>
          </div>
          <Separator className="mt-4" />

          <div className="mt-4 space-y-2">
            <label htmlFor="coupon" className="font-normal text-dark-80">
              Enter Discount Code
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="coupon"
                placeholder="Enter coupon code"
                className="w-full rounded-l-md border border-gray-300 p-3 text-dark-500"
              />
              <button className="hover:bg-dark-600 rounded-r-md border border-dark-500 bg-dark-500 px-6  py-3 font-normal text-white">
                Apply
              </button>
            </div>
          </div>
          {/* <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-normal text-dark-500">
              Delivery Charge:
            </span>
            <span className="text-base font-normal text-dark-500">₹{50.0}</span>
          </div> */}

          <div className="mt-4 flex justify-between border-t pt-4">
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
              className="mt-4 w-full  rounded-lg bg-dark-500 py-4 text-lg font-normal text-white  hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-[#3A383F] disabled:text-gray-80"
            >
              {isOrdering ? "Processing" : "Proceed to pay"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
