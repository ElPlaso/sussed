import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import ProjectForm, { ProjectFormState } from "../ProjectForm";
import { Project } from "@prisma/client";

export interface EditProjectProps {
  project: Project;
  isModalOpen: boolean;
  toggleModal: () => void;
  onSubmit: (formData: FormData) => Promise<ProjectFormState | undefined>;
}

export default function EditProject(props: EditProjectProps) {
  const { project, isModalOpen, toggleModal, onSubmit } = props;

  const handleAction = async (_prevState: unknown, formData: FormData) => {
    const result = await onSubmit(formData);
    toggleModal();
    return result;
  };

  return (
    <Modal backdrop="transparent" isOpen={isModalOpen} onClose={toggleModal}>
      <ModalContent>
        <ModalHeader>Edit Project</ModalHeader>
        <ModalBody>
          <ProjectForm
            project={project}
            onAction={handleAction}
            onCancel={toggleModal}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
