"use client";

import { createSusResponse } from "@/actions/create-sus-response";
import SusSurvey from "@/components/sus/SusSurvey";
import { useInvitationStatus } from "@/hooks/useInvitationStatus";
import { Card, CardBody } from "@heroui/react";
import { Campaign, SusInvitation, SusResponse } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export interface SusWrapperProps {
  campaign:
    | Campaign & {
        susResponses: Array<SusResponse>;
        susInvitations: Array<SusInvitation>;
      };
}

export default function SusWrapper(props: SusWrapperProps) {
  const { campaign } = props;

  const { invitationCode, invitationCodeExists, alreadySubmitted } =
    useInvitationStatus(campaign);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (campaign.id && invitationCode) {
        const result = await createSusResponse(
          campaign.id,
          formData,
          invitationCode
        );
        if (!result?.errors) {
          router.push(
            `/projects/${campaign.projectId}/campaigns/${campaign.id}/sus/success?invite-code=${invitationCode}`
          );
        }
        return result;
      }
    },
    [campaign.id, campaign.projectId, invitationCode, router]
  );

  if (!invitationCodeExists) {
    return (
      <Card>
        <CardBody className="text-danger">Invalid invitation code.</CardBody>
      </Card>
    );
  }

  if (alreadySubmitted) {
    return (
      <Card>
        <CardBody className="text-danger">
          A response with this invitation code has already been submitted for
          this project.
        </CardBody>
      </Card>
    );
  }

  return <SusSurvey onSubmit={handleSubmit} />;
}
