import { SusRating, SusResponse } from "@prisma/client";

export const susRatingNumbers: Record<SusRating, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export type SusReponseScores = Omit<
  SusResponse,
  "id" | "campaignId" | "respondeeId" | "createdAt" | "invitationId"
>;

function calculateSusScore(response: SusReponseScores) {
  const positiveScores = [
    response.questionOne,
    response.questionThree,
    response.questionFive,
    response.questionSeven,
    response.questionNine,
  ];

  const negativeScores = [
    response.questionTwo,
    response.questionFour,
    response.questionSix,
    response.questionEight,
    response.questionTen,
  ];

  const positiveSum = positiveScores.reduce(
    (acc, score) => acc + susRatingNumbers[score],
    0
  );
  const negativeSum = negativeScores.reduce(
    (acc, score) => acc + susRatingNumbers[score],
    0
  );

  const score = 2.5 * (20 + positiveSum - negativeSum);

  return score;
}

export function calculateAverageSusScore(responses: Array<SusReponseScores>) {
  const scores = responses.map(calculateSusScore);

  return scores.reduce((acc, score) => acc + score, 0) / scores.length;
}
