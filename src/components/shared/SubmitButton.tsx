import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export interface SubmitButtonProps {
  className?: string;
  children?: ReactNode;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { className, children } = props;

  const { pending } = useFormStatus();

  return (
    <Button
      className={className}
      isDisabled={pending}
      type="submit"
      startContent={
        pending ? <FontAwesomeIcon icon={faSpinner} spin /> : undefined
      }
    >
      {children}
    </Button>
  );
}
