import { Checkbox } from "@heroui/react";
import { useMemo } from "react";

export interface InvitationResponseStatusProps {
  invitationId: string;
  respondedToInvitationIds: Array<string>;
}

export default function InvitationResponseStatus(
  props: InvitationResponseStatusProps
) {
  const { invitationId, respondedToInvitationIds } = props;

  const isRespondedTo = useMemo(
    () => respondedToInvitationIds.includes(invitationId),
    [invitationId, respondedToInvitationIds]
  );

  return (
    <Checkbox
      readOnly
      isSelected={isRespondedTo}
      aria-label={isRespondedTo ? "submitted" : "pending"}
    />
  );
}
