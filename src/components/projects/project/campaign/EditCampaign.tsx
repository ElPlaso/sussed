import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Campaign } from "@prisma/client";
import CampaignForm, { CampaignFormState } from "./CampaignForm";

export interface EditCampaignProps {
  campaign: Campaign;
  isModalOpen: boolean;
  toggleModal: () => void;
  onSubmit: (formData: FormData) => Promise<CampaignFormState | undefined>;
}

export default function EditCampaign(props: EditCampaignProps) {
  const { campaign, isModalOpen, toggleModal, onSubmit } = props;

  const handleAction = async (_prevState: unknown, formData: FormData) => {
    const result = await onSubmit(formData);
    if (!result?.errors) {
      toggleModal();
    }
    return result;
  };

  return (
    <Modal backdrop="transparent" isOpen={isModalOpen} onClose={toggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Campaign</ModalHeader>
        <ModalBody>
          <CampaignForm
            campaign={campaign}
            onAction={handleAction}
            onCancel={toggleModal}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
