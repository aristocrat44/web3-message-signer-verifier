"use client";

import { CoreButton } from "@/components/core/button";
import { Spinner } from "@/components/core/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Connect = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const onConnectClick = async () => {
    setIsLoading(true);

    try {
      await handleLogin();
    } catch (err) {
      console.error("Login failed:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <CoreButton
        handleClick={onConnectClick}
        disabled={isLoading || isAuthenticated}
        className="w-28 font-semibold"
      >
        {isLoading ? <Spinner /> : "Connect"}
      </CoreButton>
    </div>
  );
};
