import { Edit, Eye, MoreHorizontal, Star, Trash } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatCustomDate(date: Date) {
  const options = { month: "long", day: "numeric" };
  // @ts-ignore
  const monthDay = new Intl.DateTimeFormat("en-US", options).format(date);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if needed

  return `${monthDay} ${formattedHours}:${formattedMinutes} ${ampm}`;
}
export const OrderTable = ({ orders }) => {
  const products = [];
  const selectedProducts = [];
  const onSelectedProductsChange = () => {};
  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      onSelectedProductsChange([]);
    } else {
      onSelectedProductsChange(products.map((product) => product.id));
    }
  };

  const toggleOne = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      onSelectedProductsChange(
        selectedProducts.filter((id) => id !== productId)
      );
    } else {
      onSelectedProductsChange([...selectedProducts, productId]);
    }
  };
  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 ">
            <TableHead className="w-12">
              <Checkbox
                // checked={selectedProducts.length === products.length}
                onCheckedChange={() => {}}
                aria-label="Select all products"
              />
            </TableHead>
            <TableHead className="w-[80px]">OrderId</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead className="text-start">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              className="group hover:bg-gray-50"
              data-selected={selectedProducts.includes(order.id)}
            >
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(order.id)}
                  onCheckedChange={() => toggleOne(order.id)}
                  aria-label={`Select ${order.user.firstName}`}
                />
              </TableCell>
              <TableCell>#OD82{order.id}</TableCell>
              <TableCell>
                {formatCustomDate(new Date(order.createdAt))}
              </TableCell>
              <TableCell className="text-start font-medium">
                {order.user.firstName}
              </TableCell>
              <TableCell>
                {order.paymentStatus === "COMPLETED" ? (
                  <div className="w-fit rounded-xl bg-green-100 px-4 py-1 text-base font-normal text-green-500">
                    Paid
                  </div>
                ) : (
                  <div className="w-fit rounded-xl bg-red-100 px-4 py-1 text-base font-normal text-red-500">
                    Unpaid
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded px-3 py-1 text-sm font-bold font-medium text-white ${
                    order.orderStatus === "FAILED"
                      ? "bg-red-500"
                      : order.orderStatus === "CONFIRMED"
                      ? "bg-green-500"
                      : order.orderStatus === "INPROCESS"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </TableCell>
              <TableCell className="text-start font-medium">
                ₹{order.totalAmount.toFixed(2)}
              </TableCell>

              <TableCell>
                <div className="flex items-center   gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/products/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Table;
