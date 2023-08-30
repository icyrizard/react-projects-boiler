import Pane from "@/components/Pane.tsx";
import CenteredPane from "@/components/CenteredPane";
import Button from "@/components/Button";
import {
  generateCodeChallengeFromVerifier,
  generateRandomString,
} from "@/lib/functions.ts";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";

import InfoBox from "@/components/InfoBox";
import { useAuth } from "@/context/AuthContext.tsx";
import { useState } from "react";
import {useApi} from "@/context/AxiosContext.tsx";

export function useDoLogin() {
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

export default function UnAuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { errorMessage, errorDescription } = location?.state ?? {};

  const { doLogin } = useDoLogin();

  const [isLoginIn, setIsLoginIn] = useState<boolean>(false);

  async function onLogin() {
    setIsLoginIn(true);

    await doLogin();

    // navigate("/recipes");
  }

  return (
    <CenteredPane
      containerProps={{ className: "gap-2" }}
      className="grow items-center"
    >
      <Pane className="flex max-w-md">
        <Button
          isLoading={isLoginIn}
          onClick={onLogin}
          className="text-2xl px-5 py-5 btn-primary items-center rounded-[4px] shadow focus:outline-none"
        >
          Login
        </Button>
      </Pane>
      {(errorDescription || errorMessage) && (
        <Pane>
          <InfoBox
            appearance="error"
            message={errorMessage ?? ""}
            description={errorDescription ?? ""}
          ></InfoBox>
        </Pane>
      )}
    </CenteredPane>
  );
}
