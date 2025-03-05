import { deleteSusInvitation } from "@/actions/delete-sus-invitation";
import DangerousActionConfirmation from "@/components/shared/DangerousActionConfirmation";
import useToggleState from "@/hooks/useToggleState";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { useMemo } from "react";

export interface DeleteInvitationProps {
  invitationId: string;
  respondedToInvitationIds: Array<string>;
}

export default function DeleteInvitation(props: DeleteInvitationProps) {
  const { invitationId, respondedToInvitationIds } = props;

  const [isModalOpen, toggleModal] = useToggleState();

  const isDisabled = useMemo(
    () => respondedToInvitationIds.includes(invitationId),
    [invitationId, respondedToInvitationIds]
  );

  const onDelete = async () => {
    await deleteSusInvitation(invitationId);
    toggleModal();
  };

  return (
    <>
      <Button
        startContent={<FontAwesomeIcon icon={faTrash} />}
        isIconOnly
        isDisabled={isDisabled}
        onPress={toggleModal}
        variant="light"
        color={"danger"}
        className={isDisabled ? "text-neutral-500" : ""}
      />
      {isModalOpen && (
        <DangerousActionConfirmation
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          title="Delete Invitation"
          message="Are you sure you want to delete this invitation? This cannot be undone."
          confirmLabel={"Yes, Delete"}
          onDangerousAction={onDelete}
        />
      )}
    </>
  );
}
