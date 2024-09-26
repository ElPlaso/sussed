"use client";

import { createSusResponse } from "@/actions/create-sus-response";
import SusSurvey from "@/components/sus/SusSurvey";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function SusWrapper() {
  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[2], [pathName]);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (projectId) {
        const result = await createSusResponse(projectId, formData);
        return result;
      }
    },
    [projectId]
  );

  return <SusSurvey onSubmit={handleSubmit} />;
}
