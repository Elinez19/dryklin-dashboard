import { ReactNode } from "react";

export interface NavItem {
  icon: ReactNode;
  name: string;
  path: string;
  subItems?: { name: string; path: string; pro: boolean }[];
}

export interface AssetsStatsCard {
  title: string;
  icon: ReactNode;
  getValue: (data: Record<string, unknown>) => string | number;
  getPercentage: (data: Record<string, unknown>) => string | number;
}

// Service Partner Types
export interface IServicePartner {
  id: string;
  companyName: string;
  contactPersonName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface IServicePartnersResponse {
  data: IServicePartner[];
  httpStatus: string;
  message: string;
  debugMessage: string;
  time: string;
} 

// Service Type Types
export interface IServiceType {
  id?: string;
  name?: string;
  laundryServiceTypeName?: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceTypeRequest {
  laundryServiceTypeName: string;
  description?: string;
  price?: number;
}

export interface IServiceTypesResponse {
  data: IServiceType[] | IServiceType;
  httpStatus: string;
  message: string;
  debugMessage: string;
  time: string;
} 

// Order Types
export interface IOrderItem {
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrder {
  id: string;
  customerId: string;
  sessionId: string;
  normalDeliveryModePrice: number;
  expressDeliveryModePrice: number;
  serviceFee: number;
  serviceType: string;
  items: IOrderItem[];
  totalAmount: number;
  deliveryMode: 'NORMAL' | 'EXPRESS';
  pickupLocation: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  deliveryLocation: string;
  orderStatus: 'PENDING' | 'IN_PROGRESS' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'SUCCESSFUL';
  paymentStatus: 'PENDING' | 'PAID' | 'PROCESSING';
  checkedOut: boolean;
  expressServiceFee: number;
  normalServiceFee: number;
  message: string;
  orderDate: string;
  deliveryDate: string;
}

export interface IOrdersResponse {
  data: IOrder[];
  httpStatus: string;
  message: string;
  debugMessage: string;
  time: string;
} 

// Pending Order Types
export interface IPendingOrderItem {
  itemName: string;
  quantity: number;
}

export interface IPendingOrderRequest {
  customerName: string;
  customerEmail: string;
  serviceType: string;
  items: IPendingOrderItem[];
  deliveryModePrice: string;
}

export interface IPendingOrderResponse {
  data: IOrder[];
  httpStatus: string;
  message: string;
  debugMessage: string;
  time: string;
} 