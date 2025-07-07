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