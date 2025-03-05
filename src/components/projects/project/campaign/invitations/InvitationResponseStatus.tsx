import { Checkbox } from "@heroui/react";
import { useMemo } from "react";

export interface InvitationResponseStatusProps {
  itemId: string;
  respondedToInvitationIds: Array<string>;
}

export default function InvitationResponseStatus(
  props: InvitationResponseStatusProps
) {
  const { itemId, respondedToInvitationIds } = props;

  const isRespondedTo = useMemo(
    () => respondedToInvitationIds.includes(itemId),
    [itemId, respondedToInvitationIds]
  );

  return <Checkbox readOnly isSelected={isRespondedTo} />;
}
