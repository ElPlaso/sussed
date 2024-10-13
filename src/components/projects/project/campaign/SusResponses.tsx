"use client";

import { susRatingNumbers } from "@/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { SusResponse } from "@prisma/client";

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

export interface SusResponsesProps {
  responses: Array<SusResponse>;
}

export default function SusResponses(props: SusResponsesProps) {
  const { responses } = props;

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg">Responses</h2>
      <Table aria-label="Sus Responses">
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
              <TableCell>{susRatingNumbers[item.questionOne]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionTwo]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionThree]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionFour]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionFive]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionSix]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionSeven]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionEight]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionNine]}</TableCell>
              <TableCell>{susRatingNumbers[item.questionTen]}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
