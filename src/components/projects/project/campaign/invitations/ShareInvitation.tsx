import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToast, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface ShareInvitationProps {
  invitationId: string;
  respondedToInvitationIds: Array<string>;
}

export default function ShareInvitation(props: ShareInvitationProps) {
  const { invitationId, respondedToInvitationIds } = props;

  const url = process.env.NEXT_PUBLIC_URL;

  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[2], [pathName]);
  const campaignId = useMemo(() => pathName.split("/")[4], [pathName]);

  const isDisabled = useMemo(
    () => respondedToInvitationIds.includes(invitationId),
    [invitationId, respondedToInvitationIds]
  );

  const handleShare = () => {
    if (isDisabled) return;
    navigator.clipboard.writeText(
      `${url}/projects/${projectId}/campaigns/${campaignId}/sus?invite-code${invitationId}`
    );
    addToast({
      title: "Invitation link copied to clipboard!",
      color: "primary",
      variant: "flat",
    });
  };

  return (
    <Button
      startContent={<FontAwesomeIcon icon={faShare} />}
      isIconOnly
      onPress={handleShare}
      isDisabled={isDisabled}
      className="text-neutral-500"
      variant="light"
    />
  );
}
