"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { SusRating, SusResponse } from "@prisma/client";

const columns = [
  {
    key: "respondeeId",
    label: "NAME",
  },
  { key: "questionOne", label: "Q1" },
  { key: "questionTwo", label: "Q2" },
  { key: "questionThree", label: "Q3" },
  { key: "questionFour", label: "Q4" },
  { key: "questionFive", label: "Q5" },
  { key: "questionSix", label: "Q6" },
  { key: "questionSeven", label: "Q7" },
  { key: "questionEight", label: "Q8" },
  { key: "questionNine", label: "Q9" },
  { key: "questionTen", label: "Q10" },
];

const ratingNumberDisplays: Record<SusRating, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export interface ProjectSusResponsesProps {
  responses: Array<SusResponse>;
}

export default function ProjectSusResponses(props: ProjectSusResponsesProps) {
  const { responses } = props;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg">Responses</h2>
      <Table aria-label="Project Sus Responses">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No responses yet."} items={responses}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{""}</TableCell>
              {/* TODO: Display potential user name here*/}
              <TableCell>{ratingNumberDisplays[item.questionOne]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionTwo]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionThree]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionFour]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionFive]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionSix]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionSeven]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionEight]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionNine]}</TableCell>
              <TableCell>{ratingNumberDisplays[item.questionTen]}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
