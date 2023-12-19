/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CalendarIcon,
  ChartPieIcon,
  ClipboardIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { clientRoutes } from "~/constants";

const routes = [
  {
    name: "Dashboard",
    href: clientRoutes.dashboard.index,
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Code Editor",
    href: clientRoutes.codeEditor.index,
    icon: ComputerDesktopIcon,
    current: false,
  },
];

export const navigation = () => {
  const path = window.location.pathname;

  for (let i = 0; i < routes.length; i += 1) {
    if (routes[i].href === path) {
      routes[i].current = true;
    } else {
      routes[i].current = false;
    }
  }

  return { path, routes };
};
