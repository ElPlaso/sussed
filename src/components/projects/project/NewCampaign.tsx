import { createCampaign } from "@/actions/create-campaign";
import SubmitButton from "@/components/shared/SubmitButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { useFormState } from "react-dom";

interface FormState {
  errors?: Array<string>;
}

const initialState: FormState = {
  errors: [],
};

export interface NewCampaignProps {
  projectId: string;
}

export default function NewCampaign(props: NewCampaignProps) {
  const { projectId } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

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

  const [state, formAction] = useFormState(handleAction, initialState);

  const errorMessages = useMemo(() => {
    return (
      state?.errors?.filter((error) => {
        return !error.includes("url");
      }) || []
    );
  }, [state]);

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
            New PCampaig
          </ModalHeader>
          <ModalBody>
            <form action={formAction} className="flex flex-col gap-y-8">
              {errorMessages.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  {errorMessages.map((error, index) => {
                    return (
                      <div key={index} className="text-red-500 text-sm">
                        {error}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="flex flex-col gap-y-4">
                <Input
                  name="title"
                  label="Title"
                  labelPlacement="outside"
                  placeholder="Title"
                  isRequired
                  maxLength={100}
                />
                <Textarea
                  name="description"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Description"
                  maxLength={250}
                />
              </div>
              <div className="flex gap-x-4 max-md:w-full justify-end">
                <Button className="max-md:w-full" onClick={toggleModal}>
                  Cancel
                </Button>
                <SubmitButton className="bg-primary-500 dark:bg-primary-400 text-white max-md:w-full">
                  Add Campaign
                </SubmitButton>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
