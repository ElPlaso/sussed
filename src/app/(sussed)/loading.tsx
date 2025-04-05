import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Spinner size="sm" aria-label="Page Loading" />
    </div>
  );
}
