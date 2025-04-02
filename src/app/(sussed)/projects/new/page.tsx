import { auth } from "@/auth";
import NewProjectWrapper from "@/components/projects/new/NewProjectWrapper";

import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  if (!(await auth())) {
    redirect("/auth/signin");
  }

  return (
    <main className="flex flex-col px-12 py-10 items-center">
      <div className="flex flex-col gap-y-8 w-2/3 max-lg:w-full">
        <h2 className="text-lg text-start">New Project</h2>
        <NewProjectWrapper />
      </div>
    </main>
  );
}
