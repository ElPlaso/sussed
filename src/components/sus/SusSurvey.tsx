"use client";

import { RadioGroup, Radio, CardBody, Card } from "@heroui/react";
import SubmitButton from "../shared/SubmitButton";
import { useMemo } from "react";
import { useFormState } from "react-dom";
import { SusRating } from "@prisma/client";

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

const radioValues: Record<number, SusRating> = {
  1: SusRating.ONE,
  2: SusRating.TWO,
  3: SusRating.THREE,
  4: SusRating.FOUR,
  5: SusRating.FIVE,
};

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
                key={i}
                isRequired
                name={`${i + 1}`}
                label={`${i + 1}: ${question}`}
                orientation="horizontal"
              >
                {Object.entries(radioValues).map(([key, value]) => (
                  <Radio
                    className="lg:first:-ml-2 mx-4 lg:last:-mr-2"
                    key={key}
                    value={value}
                  >
                    {key}
                  </Radio>
                ))}
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
