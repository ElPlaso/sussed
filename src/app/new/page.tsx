"use client";

import { createProject } from "@/actions";
import SubmitButton from "@/components/shared/SubmitButton";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useFormState } from "react-dom";

interface FormState {
  errors?: Array<string>;
}

const initialState: FormState = {
  errors: [],
};

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

  const [state, formAction] = useFormState(handleAction, initialState);

  const handleCancel = () => {
    router.push("/");
  };

  const errorMessages = useMemo(() => {
    return (
      state?.errors?.filter((error) => {
        return !error.includes("url");
      }) || []
    );
  }, [state]);

  return (
    <main className="flex flex-col px-12 py-10 items-center">
      <form
        className="flex flex-col gap-y-8 w-2/3 max-lg:w-full"
        action={formAction}
      >
        <h2 className="text-lg text-start">New Project</h2>
        {errorMessages.length > 0 && (
          <div className="flex flex-col gap-y-2">
            {errorMessages.map((error, index) => {
              return (
                <div key={index} className="text-red-500 text-sm">
                  {error}
                </div>
              );
            })}
          </div>
        )}
        <div className="flex flex-col gap-y-4">
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Title"
            isRequired
            maxLength={100}
          />
          <Textarea
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Description"
            maxLength={250}
          />
          <Input
            name="link"
            label="Link"
            labelPlacement="outside"
            placeholder="Link"
            description="The URL that your app/website is hosted at (optional)"
            startContent={
              <FontAwesomeIcon
                icon={faLink}
                size="sm"
                className="text-default-500"
              />
            }
            maxLength={250}
            errorMessage={
              state?.errors?.find((error) => {
                return error.includes("url");
              }) || null
            }
          />
        </div>
        <div className="flex gap-x-4 max-md:w-full justify-end">
          <Button className="max-md:w-full" onClick={handleCancel}>
            Cancel
          </Button>
          <SubmitButton className="bg-primary-500 dark:bg-primary-400 text-white max-md:w-full">
            Add Project
          </SubmitButton>
        </div>
      </form>
    </main>
  );
}
