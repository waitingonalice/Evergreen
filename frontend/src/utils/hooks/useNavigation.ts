import {
  CalendarIcon,
  ChartPieIcon,
  ClipboardIcon,
  CreditCardIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { clientRoutes } from "~/constants";

const navigation = [
  {
    name: "Dashboard",
    href: clientRoutes.dashboard.index,
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Balances",
    href: clientRoutes.balance.index,
    icon: ChartPieIcon,
    current: false,
  },
  {
    name: "Transactions",
    href: clientRoutes.transactions.index,
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: "Billings",
    href: clientRoutes.billing.index,
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Kanban",
    href: clientRoutes.kanban.index,
    icon: ClipboardIcon,
    current: false,
  },
];

export const useNavigation = () => {
  const path = window.location.pathname;

  for (let i = 0; i < navigation.length; i += 1) {
    if (navigation[i].href === path) {
      navigation[i].current = true;
    } else {
      navigation[i].current = false;
    }
  }

  return { path, navigation };
};
