import SubmitButton from "@/components/shared/SubmitButton";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { useFormState } from "react-dom";

export interface DeleteProjectProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  onDelete: () => void;
}

export default function DeleteProject(props: DeleteProjectProps) {
  const { isModalOpen, toggleModal, onDelete } = props;

  const [_, formAction] = useFormState(onDelete, null);

  return (
    <Modal backdrop="transparent" isOpen={isModalOpen} onClose={toggleModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Project
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this project? All of its data will be
          lost.
          <form
            action={formAction}
            className="flex gap-x-4 max-md:w-full justify-end"
          >
            <Button className="max-md:w-full" onClick={toggleModal}>
              Cancel
            </Button>
            <SubmitButton className="bg-danger-500 dark:bg-danger-400 text-white max-md:w-full">
              Yes, Delete
            </SubmitButton>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
