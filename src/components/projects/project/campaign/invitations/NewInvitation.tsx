"use client";

import { createSusInvitation } from "@/actions/create-sus-invitation";
import SubmitButton from "@/components/shared/SubmitButton";
import { useCallback } from "react";
import { useFormState } from "react-dom";

export interface NewInvitationProps {
  campaignId: string;
}

export default function NewInvitation(props: NewInvitationProps) {
  const { campaignId } = props;

  const onGenerate = useCallback(async () => {
    await createSusInvitation(campaignId);
  }, [campaignId]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useFormState(onGenerate, null);

  return (
    <form action={formAction}>
      <SubmitButton className="bg-primary text-white">
        Add New Invitation
      </SubmitButton>
    </form>
  );
}
