import { deleteSusInvitation } from "@/actions/delete-sus-invitation";
import DangerousActionConfirmation from "@/components/shared/DangerousActionConfirmation";
import useToggleState from "@/hooks/useToggleState";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@heroui/react";
import { useMemo } from "react";

export interface DeleteInvitationProps {
  itemId: string;
  respondedToInvitationIds: Array<string>;
}

export default function DeleteInvitation(props: DeleteInvitationProps) {
  const { itemId, respondedToInvitationIds } = props;

  const [isModalOpen, toggleModal] = useToggleState();

  const isDisabled = useMemo(
    () => respondedToInvitationIds.includes(itemId),
    [itemId, respondedToInvitationIds]
  );

  const onDelete = async () => {
    await deleteSusInvitation(itemId);
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
        color={isDisabled ? "default" : "danger"}
      />
      <DangerousActionConfirmation
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        title="Delete Invitation"
        message="Are you sure you want to delete this invitation? This cannot be undone."
        confirmLabel={"Yes, Delete"}
        onDangerousAction={onDelete}
      />
    </>
  );
}
