import React from "react";

import Pane from "@/components/Pane";
import { Outlet } from "react-router-dom";
import { useApp } from "@/context/AppContext.tsx";
import TopNavbar from "@/components/navigation/TopNavbar.tsx";

import * as Toast from "@radix-ui/react-toast";
import AppToast from "@/components/Toast.tsx";

export default function Layout() {
  const { contentRef, toast } = useApp();

  return (
    <Toast.Provider swipeDirection="down">
      <Pane ref={contentRef} className="h-full flex flex-col">
        <AppToast ref={toast} />
        <Pane>
          <TopNavbar />
        </Pane>
        <Pane className="bg-neutral flex grow p-2 pt-4 md:p-10">
          <Pane className="p-2 w-full">
            <Outlet />
          </Pane>
        </Pane>
      </Pane>
    </Toast.Provider>
  );
}
