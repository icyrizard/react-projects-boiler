import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { twMerge } from "tailwind-merge";
import { BiChevronDown } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.tsx";
import Pane from "@/components/Pane.tsx";
import Logo from "@/components/navigation/Logo.tsx";
import Button from "@/components/Button.tsx";
import Paragraph from "@/components/Typography/Paragraph.tsx";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher.tsx";
import SubMenuItem from "@/components/navigation/SubMenuItem.tsx";

import * as Separator from "@radix-ui/react-separator";

type DropdownMenuProps = React.ComponentProps<typeof DropdownMenu.Trigger> & {
  children: React.ReactNode;
  className?: string;
};

function useLogout() {
  const { setUser, setIdToken, setJwt } = useAuth();

  async function doLogout() {
    setJwt(null);
    setIdToken(null);
    setUser(null);
  }

  return {
    doLogout,
  };
}

export default function TopNavbar() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      orientation="horizontal"
      className="relative flex w-screen items-center z-[1] px-4 py-4 shadow list-none"
    >
      {/*Top Navbar Left*/}
      <Pane className="shrink">
        <Pane className="w-[6rem]">
          <Link to="/">
            <Logo />
          </Link>
        </Pane>
      </Pane>
      {/****************/}

      {/*Top Navbar Middle*/}
      <Pane className="grow">
        <Pane className="w-[10rem]"></Pane>
      </Pane>
      {/****************/}

      {/*Top Navbar Right*/}
      <Pane>
        <NavigationMenu.List>
          <Pane className="flex gap-1 items-center">
            <LanguageSwitcher />
            <Separator.Root
              className="SeparatorRoot bg-theme-gray-900 h-8 w-2 mx-4 h-full"
              orientation="vertical"
              decorative
            />
            <UserDropdown>
              <Pane>
                <Pane className="text-left">
                  <span>{user?.firstName}</span>
                  <span>{user?.lastName}</span>
                </Pane>
                <Pane className="text-left">
                  <Paragraph
                    size="xsmall"
                    className="max-w-[15em] truncate overflow-hidden ..."
                  >
                    {user?.groupsName}
                  </Paragraph>
                </Pane>
              </Pane>
            </UserDropdown>
          </Pane>
        </NavigationMenu.List>
      </Pane>
      {/****************/}
    </NavigationMenu.Root>
  );
}

const UserDropdown = ({ children, ...props }: DropdownMenuProps) => {
  const { t } = useTranslation();
  const { className, ...rest } = props;

  const { doLogout } = useLogout();
  const navigate = useNavigate();

  function onLogout() {
    return doLogout();
  }

  const classes = twMerge(
    className,
    "group flex select-none items-center justify-between gap-2 font-medium",
    "hover:bg-gray-100 hover:text-gray-900 px-4 cursor-pointer py-2 w-full",
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={classes} {...rest}>
        {children}
        <BiChevronDown className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white shadow w-[15rem] py-2">
        <SubMenuItem>
          <Button
            onClick={onLogout}
            className="whitespace-nowrap text-theme-900"
            appearance="default"
          >
            {t("common.logout")}
          </Button>
        </SubMenuItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
