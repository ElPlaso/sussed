"use client";

import { createSusResponse } from "@/actions/create-sus-response";
import SusSurvey from "@/components/sus/SusSurvey";
import { useInvitationStatus } from "@/hooks/useInvitationStatus";
import { Card, CardBody } from "@nextui-org/react";
import { Project, SusInvitation, SusResponse } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export interface SusWrapperProps {
  project:
    | Project & {
        susResponses: Array<SusResponse>;
        susInvitations: Array<SusInvitation>;
      };
}

export default function SusWrapper(props: SusWrapperProps) {
  const { project } = props;

  const { invitationCode, invitationCodeExists, alreadySubmitted } =
    useInvitationStatus(project);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (project.id && invitationCode) {
        const result = await createSusResponse(
          project.id,
          formData,
          invitationCode
        );
        if (!result?.errors) {
          router.push(
            `/projects/${project.id}/sus/success?invite-code=${invitationCode}`
          );
        }
        return result;
      }
    },
    [invitationCode, project.id, router]
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
