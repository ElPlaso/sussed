"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { uniqueId } from "lodash";

// TODO: implement action for creating invite code
export default function ProjectInviter() {
  const [uniqueCode, setUniqueCode] = useState<string>("");

  const url = process.env.NEXT_PUBLIC_URL; // TODO: Validate env variable
  const pathName = usePathname();

  const handleGenerateUniqueLink = () => {
    const newId = uniqueId();
    setUniqueCode(newId);
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardHeader>
        <div className="flex gap-x-4 items-center w-full justify-between">
          Invite Guests to Sus Surveys
          <Button color="primary" onClick={handleGenerateUniqueLink}>
            Generate Unique Link
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex gap-x-2 items-center">
          <Input
            className="flex-1"
            isReadOnly
            value={`${url}${pathName}/sus/invite/${uniqueCode}`}
          />
          <Button isDisabled={!uniqueCode}>Copy</Button>
        </div>
      </CardBody>
      <CardFooter>
        <p className="text-xs text-danger">
          Generated codes not used within 7 days will be deleted.
        </p>
      </CardFooter>
    </Card>
  );
}
