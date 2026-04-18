import { ScrollytellingLookbook } from "@/components/scrollytelling-lookbook";
import { lookbookScenes } from "@/lib/site-data";

export const metadata = {
  title: "Lookbook / Narrative Arc"
};

export default function LookbookPage() {
  return (
    <div className="w-full">
      <ScrollytellingLookbook scenes={lookbookScenes} />
    </div>
  );
}
