"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// TODO: Get providers from auth config or next-auth once more providers are needed
// Ref: https://github.com/nextauthjs/next-auth/issues/9293
const PROVIDER_ID = "github";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 py-8">
        <CardHeader className="flex flex-col gap-y-2 items-center">
          <Image
            src="/favicon.ico"
            alt="Sussed Logo"
            width={120}
            height={120}
          />
          <h1 className="text-2xl font-semibold">Sussed.</h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-y-4 items-center">
          <Button
            variant="light"
            startContent={<FontAwesomeIcon icon={faGithub} size="lg" />}
            onPress={() => signIn(PROVIDER_ID)}
          >
            Sign in with GitHub
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
