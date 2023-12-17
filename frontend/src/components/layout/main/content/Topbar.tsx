/* eslint-disable react/no-array-index-key */
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Cog8ToothIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button, Modal, Text } from "~/components";
import { useAppContext } from "~/components/app-context";
import { ButtonProps } from "~/components/button";
import { clientRoutes } from "~/constants";

interface TopbarProps {
  children?: React.ReactNode;
  buttons?: ButtonProps[];
  onBackClick?: () => void;
  className?: string;
  title?: string;
}

const Topbar = ({
  buttons,
  className,
  onBackClick,
  title,
  children,
}: TopbarProps) => {
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
      <nav
        className={clsx(
          "sticky top-0 px-4 py-3 bg-important border-b border-primary-2 flex items-center z-30 gap-x-4 w-full justify-between",
          className
        )}
      >
        <span className="flex items-center">
          {(title || onBackClick) && (
            <span className="flex gap-x-4">
              {onBackClick && (
                <>
                  <Button variant="primaryLink" onClick={onBackClick}>
                    <XMarkIcon className="h-5 w-auto" />
                  </Button>
                  <div className="border-l border-gray-400 h-5" />
                </>
              )}
              {title && (
                <Text type="body-bold" className="text-dark whitespace-nowrap">
                  {title}
                </Text>
              )}
            </span>
          )}
          <div className="flex gap-x-2 ml-16">{children}</div>
        </span>

        <div className="flex items-center">
          {buttons?.map((item, index) => (
            <Button
              size={item.size ?? "small"}
              {...item}
              variant={item.variant ?? "primary"}
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
              <Cog8ToothIcon className="h-5 w-auto text-primary" />
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
                          "px-4 py-2 hover:bg-gray-100 text-primary flex gap-x-2"
                        )}
                      >
                        <UserIcon className="h-5 w-auto" />
                        <Text type="body-bold">{name}</Text>
                      </a>
                    ) : (
                      <>
                        <div
                          className={clsx(
                            "px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-gray-100 text-primary"
                          )}
                          role="button"
                          tabIndex={0}
                          aria-hidden="true"
                          onClick={onClick}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-auto text-primary" />
                          <Text type="body-bold">Sign out</Text>
                        </div>
                        {user && (
                          <div className="mx-4 my-2 text-dark">
                            <Text type="body" className="pt-2 border-t">
                              {fullName.toUpperCase()}
                            </Text>
                            <Text type="caption-bold">{user.email}</Text>
                          </div>
                        )}
                      </>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
