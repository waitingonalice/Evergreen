/* eslint-disable react/no-array-index-key */
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button, Input, Modal, Text } from "~/components";
import { useAppContext } from "~/components/app-context";
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
  const { user } = useAppContext();

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const handleSignout = () => {
    navigate(`${clientRoutes.auth.login}?logout`);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const navigation = [
    {
      href: clientRoutes.profile.index,
      name: "Profile",
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
            <Cog8ToothIcon className="h-5 w-auto text-white opacity-60" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[200px] w-fit rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigation.map(({ href, name, onClick }) => (
                <Menu.Item key={name}>
                  {href ? (
                    <a
                      href={href}
                      className={clsx(
                        "px-4 py-2 hover:bg-gray-100 text-primary opacity-60 flex gap-x-2"
                      )}
                    >
                      <UserIcon className="h-5 w-auto" />
                      <Text type="body-bold">{name}</Text>
                    </a>
                  ) : (
                    <>
                      <div
                        className={clsx(
                          "px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-gray-100 text-primary opacity-60"
                        )}
                        role="button"
                        tabIndex={0}
                        aria-hidden="true"
                        onClick={onClick}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-auto text-primary" />
                        <Text type="body-bold">Sign out</Text>
                      </div>
                      <div className="mx-4 my-2 text-dark">
                        <Text type="body" className="pt-2 border-t">
                          {fullName.toUpperCase()}
                        </Text>
                        <Text type="caption-bold">{user?.email}</Text>
                      </div>
                    </>
                  )}
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
