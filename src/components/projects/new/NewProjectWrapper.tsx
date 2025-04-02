"use client";

import { createProject } from "@/actions/create-project";
import { useRouter } from "next/router";
import ProjectForm from "../ProjectForm";

export default function NewProjectWrapper() {
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

  return <ProjectForm onAction={handleAction} onCancel={handleCancel} />;
}
