import SusSurvey from "@/components/sus/SusSurvey";

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
