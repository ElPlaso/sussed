"use client";

import { RadioGroup, Radio, CardBody, Card } from "@nextui-org/react";
import SubmitButton from "../shared/SubmitButton";
import { useMemo } from "react";
import { useFormState } from "react-dom";

const susQuestions = [
  "I think that I would like to use this system frequently.",
  "I found the system unnecessarily complex",
  "I thought the system was easy to use.",
  "I think that I would need the support of a technical person to be able to use this system.",
  "I found the various functions in this system were well integrated.",
  "I thought there was too much inconsistency in this system.",
  "I would imagine that most people would learn to use this system very quickly.",
  "I found the system very cumbersome to use.",
  "I felt very confident using the system.",
  "I needed to learn a lot of things before I could get going with this system.",
];

interface FormState {
  errors?: Array<string>;
}

const initialState: FormState = {
  errors: [],
};

export interface SusSurveyProps {
  onSubmit?: (formData: FormData) => Promise<FormState | undefined>;
}

export default function SusSurvey(props: SusSurveyProps) {
  const { onSubmit } = props;

  const handleAction = (_prevState: unknown, formData: FormData) => {
    return onSubmit?.(formData);
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
    <form className="flex flex-col gap-y-8" action={formAction}>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg">System Usability Scale Questionnaire (SUS)</h2>
        <div className="text-sm text-neutral-500">{`Strongly Agree -> Strongly Disagree`}</div>
      </div>
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
      <div className="flex flex-col gap-y-6">
        {susQuestions.map((question, i) => (
          <Card key={i} className="max-w-[48rem]">
            <CardBody>
              <RadioGroup
                isRequired
                name={(i + 1).toString()}
                label={`${i + 1}: ${question}`}
                orientation="horizontal"
              >
                <Radio className="mr-4" value="1">
                  1
                </Radio>
                <Radio className="mx-4" value="2">
                  2
                </Radio>
                <Radio className="mx-4" value="3">
                  3
                </Radio>
                <Radio className="mx-4" value="4">
                  4
                </Radio>
                <Radio className="ml-4" value="5">
                  5
                </Radio>
              </RadioGroup>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex w-full justify-end">
        <SubmitButton className="bg-primary-500 text-white">
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
