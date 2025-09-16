"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CoreButton } from "../core/button";
import { Text } from "../core/text";
import { SignMessageForm } from "../form/signMessageForm";

export const ProfileContent = () => {
  const { user, primaryWallet } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="p-8 bg-white/5 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl mx-auto my-12">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-gray-700 flex flex-col gap-1 sm:flex-row justify-between items-start sm:items-center">
        <Text weight="bold" size="sm">
          Welcome, {user?.firstName || user?.email}
        </Text>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-gray-700">
          <Text weight="semibold" size="sm" className="text-gray-400">
            Connected Wallet:
          </Text>
          <Text size="sm" className="text-gray-300 truncate">
            {primaryWallet?.address
              ? `${primaryWallet.address.slice(10)}...`
              : "Not connected"}
          </Text>
        </div>

        <CoreButton
          handleClick={handleLogout}
          className="p-2 rounded-lg bg-orange-400 hover:bg-orange-500 text-white flex items-center gap-2"
        >
          Logout
        </CoreButton>
      </div>

      {/* Sign Message Form Section */}
      <SignMessageForm />
    </div>
  );
};
