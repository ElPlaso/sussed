"use client";

import {
  Button,
  Card,
  CardBody,
  // CardFooter,
  CardHeader,
  Snippet,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { createSusInvitation } from "@/actions/create-sus-invitation";
import { createId } from "@paralleldrive/cuid2";

export default function ProjectInviter() {
  const [uniqueCode, setUniqueCode] = useState<string>("");

  const url = process.env.NEXT_PUBLIC_URL; // TODO: Validate env variable
  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[2], [pathName]);

  const uniqueLink = useMemo(
    () => `${url}${pathName}/sus?invite-code=${uniqueCode}`,
    [url, pathName, uniqueCode]
  );

  const handleCreateInvitation = useCallback(async () => {
    const newId = createId();
    setUniqueCode(newId);

    await createSusInvitation(projectId, newId);
  }, [projectId]);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardHeader>
        <div className="flex gap-x-4 items-center w-full justify-between">
          Invite Guests to Sus Surveys
          <Button color="primary" onClick={handleCreateInvitation}>
            Generate Unique Link
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Snippet symbol="" variant="bordered" className="overflow-x-auto">
          {uniqueLink}
        </Snippet>
      </CardBody>
      {/* <CardFooter>
        <p className="text-xs text-danger">
          Generated codes not used within 7 days will be deleted.
        </p>
      </CardFooter> */}
    </Card>

    // TODO: Display all current invite codes + potentially set limit on how many are created + allow deleting invite codes
  );
}
