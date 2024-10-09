"use client";

import {
  BEST_THRESHOLD,
  EXCELLENT_THRESHOLD,
  GOOD_THRESHOLD,
  OK_THRESHOLD,
} from "@/components/utils/score-results";
import useProjectSusScore from "@/hooks/useProjectSusScore";
import { useMemo } from "react";

export interface ProjectSusScoreCommentProps {
  projectId: string;
}

export default function ProjectSusScoreComment(
  props: ProjectSusScoreCommentProps
) {
  const { projectId } = props;

  const { data: score } = useProjectSusScore(projectId);

  const scoreComment = useMemo(() => {
    if (score == null) {
      return "";
    }
    if (score < OK_THRESHOLD) {
      return "Oh no! This project has a poor SUS score. This may not be acceptable.";
    }
    if (score < GOOD_THRESHOLD) {
      return "This project has an OK SUS score. This is marginally acceptable.";
    }
    if (score < EXCELLENT_THRESHOLD) {
      return "This project has a good SUS score! This is acceptable.";
    }
    if (score < BEST_THRESHOLD) {
      return "This project has an excellent SUS score! This is acceptable.";
    }
    return "WOW! This SUS score is one of the best imaginable! This is acceptable.";
  }, [score]);

  return <>{scoreComment}</>;
}
