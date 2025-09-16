"use client";

import { Text } from "../core/text";
import { SignedMessageHistory } from "../form/signMessageForm";
import { TextBlock } from "./textBlock";

interface SignedHistoryProps {
  signedHistory: SignedMessageHistory[];
}

export const SignedHistory = ({ signedHistory }: SignedHistoryProps) => {
  if (signedHistory.length === 0) {
    return (
      <Text className="text-gray-500 text-center py-8">
        No signed messages yet
      </Text>
    );
  }

  return (
    <ul className="space-y-4 m-10">
      {signedHistory.map((item, i) => {
        const message = item.message || "Unknown message";
        const signature = item.signature || "";
        const isValid = item.isValid ?? false;
        const signer = item.signer || "-";
        const error = item.error || "";

        return (
          <li
            key={`${signature}-${i}`}
            className="bg-white/10 backdrop-filter backdrop-blur-sm p-4 rounded-lg border border-white border-opacity-30 shadow-inner"
          >
            <div className="grid gap-2">
              <div className="flex">
                <Text size="sm" weight="semibold" className="w-25">
                  Message:
                </Text>
                <Text size="sm" className="break-words">
                  <TextBlock fullText={message} sliceLength={25} />
                </Text>
              </div>

              <div className="flex">
                <Text size="sm" weight="semibold" className="w-25">
                  Valid:
                </Text>
                <Text
                  size="sm"
                  className={`${isValid ? "text-green-500" : "text-red-500"}`}
                >
                  {isValid ? "Yes" : `No - ${error}`}
                </Text>
              </div>

              <div className="flex">
                <Text size="sm" weight="semibold" className="w-25">
                  Signer:
                </Text>
                <Text size="sm" className="break-all">
                  <TextBlock
                    fullText={signer !== "-" ? signer : ""}
                    sliceLength={25}
                    fallback="No Signer"
                  />
                </Text>
              </div>

              <div className="flex">
                <Text size="sm" weight="semibold" className="min-w-25">
                  Signature:
                </Text>
                <Text size="sm" className="break-all">
                  <TextBlock
                    fullText={signature}
                    sliceLength={25}
                    fallback="No signature"
                  />
                </Text>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
