import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartPieIcon,
  ClipboardIcon,
  CreditCardIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import clsx from "clsx";
import { Text } from "~/components";
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
    name: "Payments",
    href: clientRoutes.payment.index,
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

const useNavigation = () => {
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

const transition = "ease-out transition duration-200";
export const IconNavBar = () => {
  const { navigation } = useNavigation();
  return (
    <nav className="mt-8">
      <ul className="flex flex-col items-center space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={clsx(
                transition,
                "flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold",
                item.current
                  ? "bg-primary text-white"
                  : "text-gray-300 opacity-60 hover:text-white hover:bg-primary hover:opacity-80"
              )}
            >
              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span className="sr-only">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface FullNavBarProps {
  icon: React.ReactNode;
  show: boolean;
  onClickClose: (show: boolean) => void;
}
export const FullNavBar = ({ show, onClickClose, icon }: FullNavBarProps) => {
  const { navigation } = useNavigation();
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClickClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => onClickClose(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-tertiary px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">{icon}</div>
                <nav className="flex flex-1 flex-col">
                  <ul className="-mx-2 flex-1 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={clsx(
                            transition,
                            "flex gap-x-3 rounded-md p-2",
                            item.current
                              ? "bg-primary text-white"
                              : "text-gray-300 opacity-60 hover:text-white hover:bg-primary hover:opacity-80"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          <Text type="body-bold">{item.name}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
