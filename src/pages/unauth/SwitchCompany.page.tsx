import Pane from "@/components/Pane.tsx";
import CenteredPane from "@/components/CenteredPane";
import { useTranslation } from "react-i18next";
import React from "react";
import Heading from "@/components/Typography/Heading.tsx";
import Loader from "@/components/Loader.tsx";
import { useRunOnce } from "@/hooks/useRunOnce.tsx";
import { useDoLogin } from "@/pages/unauth/UnAuth.page.tsx";

export default function SwitchCompanyPage() {
  const { t } = useTranslation();

  const { doLogin } = useDoLogin();

  useRunOnce(() => doLogin());

  return (
    <CenteredPane className="grow items-center">
      <Pane className="flex flex-col gap-3 max-w-md">
        <Heading size="small">
          {t("switch_company_page.redirecting_you")}
        </Heading>
        <Pane className="flex self-center">
          <Loader size={50} />
        </Pane>
      </Pane>
    </CenteredPane>
  );
}
