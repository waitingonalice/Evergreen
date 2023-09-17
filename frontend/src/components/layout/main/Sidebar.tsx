import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Text } from "~/components";
import { FullNavBar, IconNavBar } from "./Navigation";

const Icon = () => (
  <Text className="text-primary-2 !font-semibold" type="subhead-2">
    ET
  </Text>
);

export const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="fixed inset-y-0 left-0 z-40 block w-20 overflow-y-auto bg-tertiary pb-4">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <Icon />
      </div>
      <FullNavBar
        show={sidebarOpen}
        onClickClose={setSidebarOpen}
        icon={<Icon />}
      />
      <IconNavBar />
      <div className="flex justify-center items-center shrink-0">
        <ChevronDoubleRightIcon
          tabIndex={0}
          role="button"
          className="absolute bottom-12 text-gray-300 w-auto"
          height={32}
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};
