import { createCampaign } from "@/actions/create-campaign";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import CampaignForm from "./campaign/CampaignForm";
import useToggleState from "@/hooks/useToggleState";

export interface NewCampaignProps {
  projectId: string;
}

export default function NewCampaign(props: NewCampaignProps) {
  const { projectId } = props;

  const [isModalOpen, toggleModal] = useToggleState();

  const handleSubmit = async (formData: FormData) => {
    const result = await createCampaign(formData, projectId);
    if (!result?.errors) {
      toggleModal();
    }
    return result;
  };

  const handleAction = (_prevState: unknown, formData: FormData) => {
    return handleSubmit(formData);
  };

  return (
    <>
      <Button
        className="bg-primary-500 dark:bg-primary-400 text-white"
        startContent={<FontAwesomeIcon icon={faAdd} />}
        onClick={toggleModal}
      >
        Add Campaign
      </Button>
      <Modal backdrop="transparent" isOpen={isModalOpen} onClose={toggleModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            New Campaign
          </ModalHeader>
          <ModalBody>
            <CampaignForm onAction={handleAction} onCancel={toggleModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
