import { NavItem } from "@/types/dashboard_types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  LineChart,
  UserRoundCheck,
  FlagIcon,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/",
    // subItems: [{ name: "Ecommerce", path: "/", pro: true }],
  },
  {
    icon: <Users />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <UserRoundCheck />,
    name: "Roles",
    path: "/roles",
  },
  {
    icon: <FlagIcon />,
    name: "Countries",
    path: "/countries",
  },
  {
    icon: <Wallet />,
    name: "Assets",
    subItems: [
      { name: "Currencies", path: "/currencies", pro: false },
      { name: "Tokens", path: "/tokens", pro: false },
    ],
  },
  {
    icon: <BarChart3 />,
    name: "Markets",
    subItems: [
      { name: "Futures Contracts", path: "/contracts", pro: false },
      { name: "Fiat Currencies", path: "/fiats", pro: false },
      { name: "Blockchain", path: "/blockchains", pro: false },
    ],
  },
  {
    icon: <LineChart />,
    name: "Trading",
    subItems: [
      { name: "Trading fees", path: "/trading-fees", pro: false },
      { name: "Trading pairs", path: "/trading-pairs", pro: false },
    ],
  },
  // Add more nav items as needed
];
