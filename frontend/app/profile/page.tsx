import { ProfileContent } from "@/components/profile/content";
import DynamicProvider from "@/providers/DynamicProvider";

export default function ProfilePage() {
  return (
    <DynamicProvider>
      <ProfileContent />
    </DynamicProvider>
  );
}
