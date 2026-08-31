import { requireProfile } from "@/lib/auth-guard";
import ProfileEditor from "@/components/profile/ProfileEditor";
import AudioTestButton from "@/components/debug/AudioTestButton";
export default async function ProfilePage() {
  const { user } = await requireProfile();

  return (
  <>
    <div className="mb-4">
      <AudioTestButton />
    </div>

    <ProfileEditor
      initialProfile={{
        displayName: user.displayName || user.name || "",
        email: user.email || "",
        image: user.image || "",
        goal: user.goal || "",
        ageGroup: user.ageGroup || "",
        preferredLanguage:
          user.preferredLanguage === "zh"
            ? "zh"
            : "en",
        country: user.country || "",
        city: user.city || "",
        companionName:
          user.companionName || "",
        companionType:
          user.companionType || "",
        companionAvatar:
          user.companionAvatar || "",
      }}
    />
  </>
);

}
