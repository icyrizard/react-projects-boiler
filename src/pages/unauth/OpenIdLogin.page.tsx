import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import Pane from "@/components/Pane.tsx";
import CenteredPane from "@/components/CenteredPane.tsx";
import Heading from "@/components/Typography/Heading.tsx";

import {useAuth} from "@/context/AuthContext.tsx";
import {useWindowSearchParams} from "@/hooks/useWindowSearchParams.tsx";
import {useApi} from "@/context/AxiosContext.tsx";
import {useRunOnce} from "@/hooks/useRunOnce.tsx";
import Loader from "@/components/Loader.tsx";
import {LOGIN_ROUTE} from "@/routeMap.ts";
import ApiError from "@/api/ApiError.ts";

function useLogin() {
  const { apiInstance } = useApi();
  const { setIdToken, setJwt } = useAuth();

  async function doLogin() {
    setJwt({
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dio0q16DFIMPY2C5FDxVIfqABO7L1Fbx3zKSU4J2RK8',
      refreshJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dio0q16DFIMPY2C5FDxVIfqABO7L1Fbx3zKSU4J2RK8',
    });
  }

  return {
    doLogin,
  };
}

export default function OpenIdLoginPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const queryParams = useWindowSearchParams();

  const { doLogin } = useLogin();

  useRunOnce(() => {
    async function doLogin() {
      try {
        await doLogin();
      } catch (error) {
        let errorMessage: string | null = t(
          "errors.unable_to_login",
        ).toString();
        let errorDescription: string | null = t(
          "errors.please_try_again",
        ).toString();

        if (error instanceof ApiError) {
          errorMessage = error.errorMessage;
          errorDescription = error.errorDescription;
        }

        navigate(
          {
            pathname: LOGIN_ROUTE,
          },
          {
            state: {
              errorMessage,
              errorDescription,
            },
          },
        );
      }
    }

    doLogin();
  }, []);

  return (
    <CenteredPane className="grow items-center">
      <Pane className="flex flex-col gap-3 max-w-md">
        <Heading size="small">{t("open_id_login_page.loader_label")}</Heading>
        <Pane className="flex self-center">
          <Loader size={50} />
        </Pane>
      </Pane>
    </CenteredPane>
  );
}
