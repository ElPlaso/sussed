import SusSurvey from "@/components/sus/SusSurvey";
import { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Example",
  description: "An example SUS survey",
};

export default function SusExample() {
  return (
    <main className="flex flex-col px-12 items-center py-8">
      <div className="flex flex-col gap-y-4 items-start">
        <h1 className="text-2xl">Example</h1>
        <SusSurvey />
      </div>
    </main>
  );
}
