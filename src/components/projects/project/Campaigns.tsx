"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Campaign, SusResponse } from "@prisma/client";
import SusScore from "../SusScore";
import NewCampaign from "./NewCampaign";
import { Key, useCallback } from "react";
import { useRouter } from "next/navigation";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  { key: "numResponses", label: "NUMBER OF RESPONSES" },
  { key: "score", label: "SCORE" },
];

export interface CampaignsProps {
  projectId: string;
  campaigns: Array<
    Campaign & {
      susResponses: Array<SusResponse>;
    }
  >;
}

export default function Campaigns(props: CampaignsProps) {
  const { projectId, campaigns } = props;

  const router = useRouter();

  const handleRowAction = useCallback(
    (key: Key) => {
      router.push(`/projects/${projectId}/campaigns/${key}`);
    },
    [projectId, router]
  );

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-4 justify-between items-start w-full">
        <h2 className="text-lg">Campaigns</h2>
        <NewCampaign projectId={projectId} />
      </div>
      <Table
        aria-label="Campaigns"
        selectionMode="single"
        onRowAction={handleRowAction}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No campaigns. Please create one to get started!"}
          items={campaigns}
        >
          {(item) => (
            <TableRow className="!cursor-pointer" key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.susResponses.length}</TableCell>
              <TableCell>
                <SusScore campaignId={item.id} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
