import SusScoreCircle from "@/components/shared/SusScoreCircle";
import {
  BEST_THRESHOLD,
  EXCELLENT_THRESHOLD,
  GOOD_THRESHOLD,
  OK_THRESHOLD,
} from "@/components/utils/score-results";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@heroui/react";
import Image from "next/image";

export default async function WelcomePage() {
  return (
    <main className="flex flex-col px-16 pt-12 items-center">
      <div className="w-2/3 max-lg:w-full flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 px-8">
          <h1 className="text-5xl font-sans font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Sussed.
          </h1>
          <p className="text-lg max-w-[36rem]">
            Sussed is an online tool for measuring system usability across
            multiple projects. Easily distribute surveys and analyze the
            results!
          </p>

          <Button
            as="a"
            href="/auth/signin"
            className="w-fit bg-primary-500 dark:bg-primary-400 text-white mt-4"
          >
            Login now to get started!
          </Button>
        </div>

        <Divider />

        <div className="flex flex-col gap-y-4">
          <div className="text-xl font-semibold">Learn More</div>

          <p className="text-lg">
            Sussed uses the tried and tested{" "}
            <Link
              target="_blank"
              href="https://en.wikipedia.org/wiki/System_usability_scale"
            >
              System Usability Scale (SUS)
            </Link>{" "}
            to calculate your project&apos;s usability.
          </p>
        </div>

        <Card>
          <CardHeader className="justify-center bg-neutral-500 bg-opacity-10">
            <Image
              className="shadow-lg"
              src="/sussed-new-project.PNG"
              width={650}
              height={650}
              alt={"New Project"}
            />
          </CardHeader>
          <Divider />
          <CardFooter>Step 1: Create a Project</CardFooter>
        </Card>

        <Card>
          <CardHeader className="justify-center bg-neutral-500 bg-opacity-10">
            <Image
              className="shadow-lg"
              src="/sussed-new-campaign.PNG"
              width={650}
              height={650}
              alt={"New Campaign"}
            />
          </CardHeader>
          <CardFooter>Step 2: Create a campaign</CardFooter>
        </Card>

        <Card>
          <CardHeader className="justify-center bg-neutral-500 bg-opacity-10">
            <Image
              className="shadow-lg"
              src="/sussed-new-invitation.PNG"
              width={650}
              height={650}
              alt={"New Invitation"}
            />
          </CardHeader>
          <CardFooter>
            Step 3: Create an invitation and share with a respondee
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-4">
          <p>
            Step 4: Wait for a response. Your respondee will see a form like{" "}
            <Link target="_blank" href="/examples/sus">
              this
            </Link>
            .
          </p>

          <p>
            Step 5: View your automatically calculated SUS score once a response
            is submitted.
          </p>
        </div>

        <Card>
          <CardHeader className="justify-center">
            <Image
              src="/sussed-sus-score.PNG"
              width={500}
              height={500}
              alt={"Sus Score"}
            />
          </CardHeader>
        </Card>

        <Divider />

        <div className="flex flex-col gap-y-4">
          <div className="text-lg font-medium">
            Here&apos;s how the scores work:
          </div>

          <ul className="flex flex-col gap-y-2">
            <li className="flex gap-x-2 items-center">
              <SusScoreCircle score={BEST_THRESHOLD} size="lg" />A score of{" "}
              {BEST_THRESHOLD} or above is generally best
            </li>

            <li className="flex gap-x-2 items-center">
              <SusScoreCircle score={EXCELLENT_THRESHOLD} size="lg" /> A score
              of {EXCELLENT_THRESHOLD} or above is generally excellent
            </li>

            <li className="flex gap-x-2 items-center">
              <SusScoreCircle score={GOOD_THRESHOLD} size="lg" /> A score of{" "}
              {GOOD_THRESHOLD} or above is generally good
            </li>

            <li className="flex gap-x-2 items-center">
              <SusScoreCircle score={OK_THRESHOLD} size="lg" /> A score of{" "}
              {OK_THRESHOLD} or above is generally okay
            </li>

            <li className="flex gap-x-2 items-center">
              <SusScoreCircle score={OK_THRESHOLD - 1} size="lg" /> A score
              below {OK_THRESHOLD} or above is generally not okay
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
