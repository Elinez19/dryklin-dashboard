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
  id: string;
  name: string;
  description?: string;
  price?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceTypeRequest {
  name: string;
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