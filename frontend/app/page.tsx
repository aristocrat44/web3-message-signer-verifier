import { Connect } from "@/components/auth/connect";
import { Text } from "@/components/core/text";
import DynamicProvider from "@/providers/DynamicProvider";
import { CheckCircle, Pencil, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* header*/}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <Text
            size="2xl"
            weight="bold"
            className="mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Web3 Message Signer & Verifier
          </Text>

          <Text size="xl" className="text-gray-300 mb-8 leading-relaxed">
            Securely sign messages with your wallet and verify cryptographic
            signatures using cutting-edge Web3 technology
          </Text>

          {/* dummy features cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <Text size="lg" weight="semibold" className="text-white mb-2">
                Secure Authentication
              </Text>
              <Text size="sm" className="text-gray-400">
                Connect with any Web3 wallet using Dynamic.xyz multi-factor
                authentication
              </Text>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center mb-4">
                <Pencil className="w-6 h-6 text-purple-400" />
              </div>
              <Text size="lg" weight="semibold" className="text-white mb-2">
                Message Signing
              </Text>
              <Text size="sm" className="text-gray-400">
                Sign any custom message with your private key to prove ownership
              </Text>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <Text size="lg" weight="semibold" className="text-white mb-2">
                Instant Verification
              </Text>
              <Text size="sm" className="text-gray-400">
                Verify signatures instantly and view your signing history
              </Text>
            </div>
          </div>
        </div>

        {/* connect section */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <Text size="lg" className="text-white text-center mb-6">
            Ready to start signing messages securely?
          </Text>

          <DynamicProvider>
            <Connect />
          </DynamicProvider>
        </div>

        {/* footer */}
        <div className="absolute bottom-2 text-center">
          <Text size="sm" className="text-gray-500">
            Powered by Dynamic.xyz • Ethereum • Next.js
          </Text>
        </div>
      </div>

      {/* background */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-800 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-800 rounded-full blur-xl animate-pulse delay-1000"></div>
    </div>
  );
}
