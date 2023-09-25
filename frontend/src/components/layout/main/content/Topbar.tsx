/* eslint-disable react/no-array-index-key */
import { Menu, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button, Input, Modal, Text } from "~/components";
import { ButtonProps } from "~/components/button";
import { clientRoutes } from "~/constants";

interface TopbarProps {
  search?: {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  buttons?: ButtonProps[];
  className?: string;
}

const Topbar = ({ buttons, className, search }: TopbarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    navigate(`${clientRoutes.auth.login}?logout`);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const navigation = [
    {
      href: clientRoutes.profile.index,
      name: "Your Profile",
    },
    {
      name: "Sign out",
      onClick: handleOpen,
    },
  ];

  return (
    <>
      <Modal
        onClose={handleClose}
        open={open}
        buttons={[
          {
            variant: "secondary",
            children: "Cancel",
            onClick: handleClose,
          },
          {
            children: "Sign out",
            onClick: handleSignout,
          },
        ]}
        title="Are you sure you want to sign out?"
      />

      <div
        className={clsx(
          "sticky top-0 pl-40 pr-4 py-4 border-b border-gray-300 bg-primary shadow-md flex justify-end items-center",
          className
        )}
      >
        {search && (
          <Input
            prefixIcon={<MagnifyingGlassIcon className="h-5 text-gray-400" />}
            className="w-full mr-16 mb-1"
            id="search"
            onChange={search.onChange}
            value={search.value}
            placeholder={search.placeholder}
          />
        )}
        {buttons?.map((item, index) => (
          <Button
            {...item}
            variant={item.variant ?? "secondary"}
            key={index}
            onClick={item.onClick}
            className={clsx("mr-4", item.className)}
          >
            {item.children}
          </Button>
        ))}
        <Menu as="div" className="relative">
          <Menu.Button className="items-center flex transition duration-100 ease-out rounded-full focus:outline-none focus:ring-2 focus:ring-primary-2">
            {/* TODO: integrate profile avatar */}
            <UserCircleIcon className="h-10 w-auto text-white opacity-60" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigation.map(({ href, name, onClick }) => (
                <Menu.Item key={name}>
                  {({ active }) =>
                    href ? (
                      <a
                        href={href}
                        className={clsx(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-gray-700"
                        )}
                      >
                        <Text type="body-bold" className="text-dark opacity-60">
                          {name}
                        </Text>
                      </a>
                    ) : (
                      <div
                        className={clsx(
                          "px-4 py-2 text-gray-700 cursor-pointer",
                          active && "bg-gray-100"
                        )}
                        role="button"
                        tabIndex={0}
                        aria-hidden="true"
                        onClick={onClick}
                      >
                        <Text type="body-bold" className="text-dark opacity-60">
                          Sign out
                        </Text>
                      </div>
                    )
                  }
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Topbar;
