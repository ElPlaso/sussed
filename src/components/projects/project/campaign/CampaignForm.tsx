import SubmitButton from "@/components/shared/SubmitButton";
import { Textarea, Input, Button } from "@heroui/react";
import { Campaign } from "@prisma/client";
import { useMemo } from "react";
import { useFormState } from "react-dom";

export interface CampaignFormState {
  errors?: Array<string>;
}

const initialState: CampaignFormState = {
  errors: [],
};

export interface CampaignFormProps {
  campaign?: Campaign;
  onAction: (
    prevState: CampaignFormState | undefined,
    formData: FormData
  ) => Promise<CampaignFormState | undefined>;
  onCancel: () => void;
}

export default function CampaignForm(props: CampaignFormProps) {
  const { campaign, onAction, onCancel } = props;

  const [state, formAction] = useFormState(onAction, initialState);

  const errorMessages = useMemo(() => {
    return (
      state?.errors?.filter((error) => {
        return !error.includes("url");
      }) || []
    );
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-8">
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
          defaultValue={campaign?.title}
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Description"
          maxLength={250}
          defaultValue={campaign?.description || undefined}
        />
      </div>
      <div className="flex gap-x-4 max-md:w-full justify-end">
        <Button className="max-md:w-full" onClick={onCancel}>
          Cancel
        </Button>
        <SubmitButton className="bg-primary-500 dark:bg-primary-400 text-white max-md:w-full">
          {campaign ? "Save" : "Add Campaign"}
        </SubmitButton>
      </div>
    </form>
  );
}
