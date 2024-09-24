"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { SusResponse } from "@prisma/client";

const columns = [
  {
    key: "respondee",
    label: "NAME",
  },
  { key: "question-1", label: "Q1" },
  { key: "question-2", label: "Q2" },
  { key: "question-3", label: "Q3" },
  { key: "question-4", label: "Q4" },
  { key: "question-5", label: "Q5" },
  { key: "question-6", label: "Q6" },
  { key: "question-7", label: "Q7" },
  { key: "question-8", label: "Q8" },
  { key: "question-9", label: "Q9" },
  { key: "question-10", label: "Q10" },
];

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
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
