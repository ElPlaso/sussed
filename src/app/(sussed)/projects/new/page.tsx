"use client";

import { createProject } from "@/actions/create-project";
import ProjectForm from "@/components/projects/ProjectForm";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await createProject(formData);
    if (!result?.errors) {
      router.push("/");
    }
    return result;
  };

  const handleAction = (_prevState: unknown, formData: FormData) => {
    return handleSubmit(formData);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col px-12 py-10 items-center max-sm:px-8">
      <div className="flex flex-col gap-y-8 w-2/3 max-lg:w-full">
        <h2 className="text-lg text-start">New Project</h2>
        <ProjectForm onAction={handleAction} onCancel={handleCancel} />
      </div>
    </main>
  );
}
