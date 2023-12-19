import clsx from "clsx";
import { Text } from "~/components/text";
import { useNavigation } from "~/utils";

const transition = "ease-out transition duration-200";
export const SideBar = () => {
  const { routes } = useNavigation();
  return (
    <aside className="fixed left-0 h-full border-r border-primary-2 pl-4 pr-12 overflow-y-auto bg-white z-20">
      <nav className="mt-8">
        <ul className="flex flex-col space-y-1">
          {routes.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={clsx(
                  transition,
                  "flex gap-x-3 rounded-md p-2 items-center",
                  item.current
                    ? "text-primary"
                    : "text-dark opacity-60 hover:text-primary-2 hover:opacity-100"
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                <Text type="body-bold">{item.name}</Text>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
