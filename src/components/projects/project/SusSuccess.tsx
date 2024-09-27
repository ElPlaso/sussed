"use client";

import { useInvitationStatus } from "@/hooks/useInvitationStatus";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Project, SusInvitation, SusResponse } from "@prisma/client";

export interface SusSuccessProps {
  project:
    | Project & {
        susResponses: Array<SusResponse>;
        susInvitations: Array<SusInvitation>;
      };
}

export default function SusSuccess(props: SusSuccessProps) {
  const { project } = props;

  const { invitationCodeExists, alreadySubmitted } =
    useInvitationStatus(project);

  if (!invitationCodeExists) {
    return (
      <Card>
        <CardBody className="text-danger">Invalid invitation code.</CardBody>
      </Card>
    );
  }

  if (!alreadySubmitted) {
    return (
      <Card>
        <CardBody className="text-danger">
          This response has not been submitted yet.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl">Thank you!</h1>
      </CardHeader>
      <CardBody>
        {`Your response for "${project.title}" has been submitted.`}
      </CardBody>
    </Card>
  );
}
