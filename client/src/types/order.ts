export type OrderStatus =
  | "INPROCESS"
  | "FAILED"
  | "DELIVERED"
  | "CONFIRMED"
  | "SHIPPED";

export interface OrderItem {
  id: number;
  name: string;
  mainImage: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: number;
  items: OrderItem[];
  orderStatus: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  orderDate: string;
  expectedDelivery?: string;
  trackingNumber?: string;
}

export interface OrdersResponse {
  data: Order[];
}
