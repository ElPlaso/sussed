import SubmitButton from "@/components/shared/SubmitButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useFormState } from "react-dom";

export interface DangerousActionConfirmationProps {
  title: string;
  message: string;
  confirmLabel: string;
  isModalOpen: boolean;
  toggleModal: () => void;
  onDelete: () => void;
}

export default function DangerousActionConfirmation(
  props: DangerousActionConfirmationProps
) {
  const { title, message, confirmLabel, isModalOpen, toggleModal, onDelete } =
    props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useFormState(onDelete, null);

  return (
    <Modal backdrop="transparent" isOpen={isModalOpen} onClose={toggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          {message}
          <form
            action={formAction}
            className="flex gap-x-4 max-md:w-full justify-end"
          >
            <Button className="max-md:w-full" onClick={toggleModal}>
              Cancel
            </Button>
            <SubmitButton className="bg-danger-500 dark:bg-danger-400 text-white max-md:w-full">
              {confirmLabel}
            </SubmitButton>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
