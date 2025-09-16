"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { CoreButton } from "../core/button";
import { Spinner } from "../core/spinner";
import { Text } from "../core/text";
import { SignedHistory } from "../profile/signedHistory";

interface VerifyResult {
  isValid?: boolean;
  signer?: string;
  originalMessage?: string;
  error?: string;
}

export interface SignedMessageHistory extends VerifyResult {
  message: string;
  signature: string;
}

export function SignMessageForm() {
  const { primaryWallet } = useAuth();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<SignedMessageHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("signedMessages");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse signed messages history:", err);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("signedMessages", JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const handleSignAndVerify = async () => {
    setLoading(true);

    if (!primaryWallet) {
      alert("No wallet connected.");
      setLoading(false);
      return;
    }

    try {
      const signature = await primaryWallet.signMessage(message);
      if (!signature) throw new Error("Failed to sign message");

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });

      const data: VerifyResult = await res.json();

      setHistory((prev) => [...prev, { message, signature, ...data }]);
    } catch (err: unknown) {
      const errorObj = err as { error?: string; code?: string };

      setHistory((prev) => [
        ...prev,
        {
          message,
          signature: "",
          isValid: false,
          error: errorObj.error || "User rejected signing",
        },
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 p-4">
      {/* Sign Message Form Section */}
      <div className="bg-white/5 rounded-xl shadow-xl p-8">
        <Text weight="semibold" size="lg" className="mb-6">
          Sign a New Message
        </Text>

        <div className="flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message to sign..."
            rows={4}
            className="w-full p-4 bg-white text-black rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 resize-none"
          />
          <CoreButton
            handleClick={handleSignAndVerify}
            disabled={loading || !message}
            className="w-full sm:w-auto self-end"
          >
            {loading ? <Spinner /> : "Sign & Verify"}
          </CoreButton>
        </div>
      </div>

      {/* Signing History Section */}
      <div className="bg-white/10 rounded-xl shadow-xl p-8">
        <Text weight="semibold" size="lg" className="mb-6">
          Signing History
        </Text>
        <SignedHistory signedHistory={history} />
      </div>
    </div>
  );
}
