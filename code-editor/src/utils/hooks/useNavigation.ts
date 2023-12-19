/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ClipboardIcon,
  ComputerDesktopIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clientRoutes } from "~/constants";

const initRoute = [
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
  {
    name: "Kanban",
    href: clientRoutes.kanban.index,
    icon: ClipboardIcon,
    current: false,
  },
];

export const useNavigation = () => {
  const [routes, setRoutes] = useState(initRoute);
  const router = useRouter();

  useEffect(() => {
    setRoutes((prev) =>
      prev.map((route) => ({
        ...route,
        current: route.href === router.pathname,
      }))
    );
  }, []);
  return { routes, path: router.pathname };
};
