import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Pane from "@/components/Pane.tsx";

import { Link as RouterDomLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { BiChevronDown } from "react-icons/bi";

type LinkProps = React.ComponentProps<typeof RouterDomLink> & {
  children: React.ReactNode;
};

const MenuItem = ({ children, ...props }: LinkProps) => {
  const { to, ...rest } = props;

  const location = useLocation();

  const classes = twMerge(
    "hover:bg-gray-100 hover:text-gray-900 rounded-md px-4 cursor-pointer py-4 w-full",
    location.pathname === to
      ? "bg-gray-100 text-gray-900 border-l-2 border-blue-500"
      : "",
  );

  return (
    <NavigationMenu.Item className={classes}>
      <RouterDomLink to={to} {...rest}>
        <NavigationMenu.Link>{children}</NavigationMenu.Link>
      </RouterDomLink>
    </NavigationMenu.Item>
  );
};

export default function SideNavigation() {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="relative h-full flex flex-col w-[10rem] shadow"
    >
      <Pane className="grow">
        <NavigationMenu.List>
          <MenuItem to="/users">Users</MenuItem>
          <MenuItem to="/stuff">Stuff</MenuItem>
          <MenuItem to="/other-stuff">Other stuff</MenuItem>
        </NavigationMenu.List>
      </Pane>

      <Pane className="shrink min-h-[2rem]">
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <MenuItem to="/settings">Settings</MenuItem>
            <BiChevronDown />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </Pane>
    </NavigationMenu.Root>
  );
}
