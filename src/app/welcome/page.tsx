import {
  BEST_THRESHOLD,
  EXCELLENT_THRESHOLD,
  GOOD_THRESHOLD,
  OK_THRESHOLD,
} from "@/components/utils/score-results";

export default async function WelcomePage() {
  return (
    <main className="flex flex-col px-12 py-8 gap-y-4">
      <h1 className="text-xl font-semibold">Welcome to Sussed!</h1>
      <p>
        Sussed is an online tool for measuring system usability across multiple
        projects. Easily distribute surveys and analyze the results!
      </p>

      <p>
        Sussed uses the tried and tested{" "}
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/System_usability_scale"
        >
          System Usability Scale (SUS)
        </a>{" "}
        to calculate your project&apos;s usability
      </p>

      <p>Step 1: Create a Project</p>

      <p>Step 2: Create a campaign</p>

      <p>Step 3: Create an invitation and share with a respondee</p>

      <p>
        Step 4: Wait for a response. Your respondee will see a form like in{" "}
        <a target="_blank" href="/examples/sus">
          this example
        </a>
        .
      </p>

      <p>
        View your automatically calculated SUS score once a response is
        submitted.
      </p>

      <div>Here&apos;s how the scores work:</div>

      <ul>
        <li>A score of {BEST_THRESHOLD} or above is generally best</li>

        <li>
          A score of {EXCELLENT_THRESHOLD} or above is generally excellent
        </li>

        <li>A score of {GOOD_THRESHOLD} or above is generally good</li>

        <li>A score of {OK_THRESHOLD} or above is generally okay</li>
      </ul>

      <a target="_blank" href="/auth/signin">
        Login now to get started!
      </a>
    </main>
  );
}
