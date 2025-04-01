import { calculateAverageSusScore, SusReponseScores } from "@/utils";
import { expect, test, describe } from "vitest";

describe("Calculate Sus Score", () => {
  test("for one positive response", () => {
    const susResponse: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "ONE",
      questionThree: "FIVE",
      questionFour: "ONE",
      questionFive: "FIVE",
      questionSix: "ONE",
      questionSeven: "FIVE",
      questionEight: "ONE",
      questionNine: "FIVE",
      questionTen: "ONE",
    };

    const score = calculateAverageSusScore([susResponse]);

    expect(score).toEqual(100);
  });

  test("for one negative response", () => {
    const susResponse: SusReponseScores = {
      questionOne: "ONE",
      questionTwo: "FIVE",
      questionThree: "ONE",
      questionFour: "FIVE",
      questionFive: "ONE",
      questionSix: "FIVE",
      questionSeven: "ONE",
      questionEight: "FIVE",
      questionNine: "ONE",
      questionTen: "FIVE",
    };

    const score = calculateAverageSusScore([susResponse]);

    expect(score).toEqual(0);
  });

  test("for one mixed response", () => {
    const susResponse: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "FIVE",
      questionThree: "FIVE",
      questionFour: "FIVE",
      questionFive: "FIVE",
      questionSix: "FIVE",
      questionSeven: "FIVE",
      questionEight: "FIVE",
      questionNine: "FIVE",
      questionTen: "FIVE",
    };

    const score = calculateAverageSusScore([susResponse]);

    expect(score).toEqual(50);
  });

  test("for one positive response and one negative response", () => {
    const susResponse1: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "ONE",
      questionThree: "FIVE",
      questionFour: "ONE",
      questionFive: "FIVE",
      questionSix: "ONE",
      questionSeven: "FIVE",
      questionEight: "ONE",
      questionNine: "FIVE",
      questionTen: "ONE",
    };

    const susResponse2: SusReponseScores = {
      questionOne: "ONE",
      questionTwo: "FIVE",
      questionThree: "ONE",
      questionFour: "FIVE",
      questionFive: "ONE",
      questionSix: "FIVE",
      questionSeven: "ONE",
      questionEight: "FIVE",
      questionNine: "ONE",
      questionTen: "FIVE",
    };

    const score = calculateAverageSusScore([susResponse1, susResponse2]);

    expect(score).toEqual(50);
  });

  test("for one positive response and one mixed response", () => {
    const susResponse1: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "ONE",
      questionThree: "FIVE",
      questionFour: "ONE",
      questionFive: "FIVE",
      questionSix: "ONE",
      questionSeven: "FIVE",
      questionEight: "ONE",
      questionNine: "FIVE",
      questionTen: "ONE",
    };

    const susResponse2: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "FIVE",
      questionThree: "FIVE",
      questionFour: "FIVE",
      questionFive: "FIVE",
      questionSix: "FIVE",
      questionSeven: "FIVE",
      questionEight: "FIVE",
      questionNine: "FIVE",
      questionTen: "FIVE",
    };

    const score = calculateAverageSusScore([susResponse1, susResponse2]);

    expect(score).toEqual(75);
  });

  test("for one negative response and one mixed response", () => {
    const susResponse1: SusReponseScores = {
      questionOne: "ONE",
      questionTwo: "FIVE",
      questionThree: "ONE",
      questionFour: "FIVE",
      questionFive: "ONE",
      questionSix: "FIVE",
      questionSeven: "ONE",
      questionEight: "FIVE",
      questionNine: "ONE",
      questionTen: "FIVE",
    };

    const susResponse2: SusReponseScores = {
      questionOne: "FIVE",
      questionTwo: "FIVE",
      questionThree: "FIVE",
      questionFour: "FIVE",
      questionFive: "FIVE",
      questionSix: "FIVE",
      questionSeven: "FIVE",
      questionEight: "FIVE",
      questionNine: "FIVE",
      questionTen: "FIVE",
    };

    const score = calculateAverageSusScore([susResponse1, susResponse2]);

    expect(score).toEqual(25);
  });
});
