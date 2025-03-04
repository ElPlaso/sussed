"use client";

import { Card, CardBody, CardHeader, Snippet } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { createSusInvitation } from "@/actions/create-sus-invitation";
import { createId } from "@paralleldrive/cuid2";
import SubmitButton from "@/components/shared/SubmitButton";
import { useFormState } from "react-dom";

export default function SusInviter() {
  const [uniqueCode, setUniqueCode] = useState<string>("");

  const url = process.env.NEXT_PUBLIC_URL; // TODO: Validate env variable
  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[4], [pathName]);

  const uniqueLink = useMemo(
    () => `${url}${pathName}/sus?invite-code=${uniqueCode}`,
    [url, pathName, uniqueCode]
  );

  const onGenerate = useCallback(async () => {
    const newId = createId();
    setUniqueCode(newId);

    await createSusInvitation(projectId, newId);
  }, [projectId]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useFormState(onGenerate, null);

  return (
    // TODO: Display all current invite codes + potentially set limit on how many are created + allow deleting invite codes
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardHeader>
        <div className="flex gap-x-4 items-center w-full justify-between">
          Invite Guests to Sus Surveys
          <form action={formAction}>
            <SubmitButton className="bg-primary text-white">
              Generate Unique Link
            </SubmitButton>
          </form>
        </div>
      </CardHeader>
      <CardBody>
        <Snippet
          symbol=""
          variant="bordered"
          className="overflow-x-auto"
          disableCopy={!uniqueCode}
        >
          {uniqueLink}
        </Snippet>
      </CardBody>
    </Card>
  );
}
