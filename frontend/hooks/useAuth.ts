"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useMemo } from "react";

export const useAuth = () => {
  const { user, primaryWallet, setShowAuthFlow } = useDynamicContext();

  const isAuthenticated = useMemo(
    () => !!user && !!primaryWallet,
    [user, primaryWallet]
  );

  const handleLogin = async () => {
    setShowAuthFlow(true);

    await fetch("/api/auth", { method: "POST" });
  };

  return {
    user,
    primaryWallet,
    isAuthenticated,
    handleLogin,
  };
};
