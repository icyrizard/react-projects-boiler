import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Layout from "./layouts/Layout";
import {useAuth} from "./context/AuthContext";
import UnAuthLayout from "./layouts/UnAuthLayout";
import {useApp} from "./context/AppContext";

import {LOGIN_ROUTE, RECIPES_ROUTE,} from "./routeMap.ts";

import Pane from "@/components/Pane.tsx";
import UnAuthPage from "@/pages/unauth/UnAuth.page.tsx";
import RecipeListPage from "@/pages/recipes/RecipeList.page.tsx";

export default function AppRoutes() {
  const app = useApp();
  const { user } = useAuth();

  if (!app.initialized) {
    return (
      <Pane
        className={
          "fixed top-0 left-0 w-[100vw] min-h-screen flex justify-center items-center mx-auto bg-gray-400 bg-opacity-10"
        }
      >
        <Pane className="my-20 max-w-sm flex flex-col items-center justify-center">
          <p>Loading Portal...</p>
        </Pane>
      </Pane>
    );
  }

  return (
    <Routes>
      {!user && (
        <Route path="/">
          <Route element={<UnAuthLayout />}>
            <Route index path="/" element={<RouteDecider />} />
            <Route path={LOGIN_ROUTE} element={<UnAuthPage />} />
          </Route>

          <Route path="*" element={<RouteDecider />} />
        </Route>
      )}

      {user && (
        <Route element={<Layout />}>
          <Route index element={<Navigate to={RECIPES_ROUTE} replace />} />

          <Route path={RECIPES_ROUTE}>
            <Route index element={<RecipeListPage />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
}

function RouteDecider() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}