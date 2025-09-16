"use client";

import { useAuth } from "@/hooks/useAuth";
import { Text } from "../core/text";
import { SignMessageForm } from "../form/signMessageForm";

export const ProfileContent = () => {
  const { user, primaryWallet } = useAuth();

  return (
    <div className="p-8 bg-white/5 rounded-2xl shadow-2xl border border-gray-700 max-w-4xl mx-auto my-12">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Text weight="bold" size="xl">
          Welcome, {user?.firstName || user?.email}
        </Text>

        <div className="flex items-center gap-4 p-3 rounded-lg bg-white/10 border border-gray-700">
          <Text weight="semibold" size="sm" className="text-gray-400">
            Connected Wallet:
          </Text>
          <Text size="sm" className="text-gray-300 truncate">
            {primaryWallet?.address
              ? `${primaryWallet.address.slice(10)}...`
              : "Not connected"}
          </Text>
        </div>
      </div>

      {/* Sign Message Form Section */}
      <SignMessageForm />
    </div>
  );
};
