"use client";

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea, Input, Button, Switch } from "@heroui/react";
import SubmitButton from "../shared/SubmitButton";
import { Project } from "@prisma/client";
import { useFormState } from "react-dom";
import { useMemo, useState } from "react";

export interface ProjectFormState {
  errors?: Array<string>;
}

const initialState: ProjectFormState = {
  errors: [],
};

export interface ProjectFormProps {
  project?: Project;
  onAction: (
    _prevState: ProjectFormState | undefined,
    formData: FormData
  ) => Promise<ProjectFormState | undefined>;
  onCancel: () => void;
}

export default function ProjectForm(props: ProjectFormProps) {
  const { project, onAction, onCancel } = props;

  const [state, formAction] = useFormState(onAction, initialState);

  const errorMessages = useMemo(() => {
    return state?.errors || [];
  }, [state]);

  const [isSetPublic, setSetPublic] = useState(project?.isPublic || false);

  return (
    <form className="flex flex-col gap-y-8" action={formAction}>
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
          defaultValue={project?.title}
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Description"
          maxLength={250}
          defaultValue={project?.description || undefined}
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
          defaultValue={project?.link || undefined}
        />
        <Switch
          size="sm"
          name="is-public"
          isSelected={isSetPublic}
          value={isSetPublic ? "on" : "off"}
          onChange={() => setSetPublic(!isSetPublic)}
        >
          Public Project?
        </Switch>
      </div>
      <div className="flex gap-x-4 max-md:w-full justify-end">
        <Button className="max-md:w-full" onClick={onCancel}>
          Cancel
        </Button>
        <SubmitButton className="bg-primary-500 dark:bg-primary-400 text-white max-md:w-full">
          {project ? "Save" : "Add Project"}
        </SubmitButton>
      </div>
    </form>
  );
}
