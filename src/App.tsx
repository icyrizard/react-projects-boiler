import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { AppProvider } from "@/providers/AppProvider.tsx";
import { AuthProvider } from "@/providers/AuthProvider.tsx";
import { AxiosProvider } from "@/providers/AxiosProvider.tsx";
import { BootstrapProvider } from "@/providers/BootstrapProvider.tsx";

import AppRoutes from "@/AppRoutes.tsx";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AxiosProvider>
            <BootstrapProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </BootstrapProvider>
          </AxiosProvider>
        </QueryClientProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
