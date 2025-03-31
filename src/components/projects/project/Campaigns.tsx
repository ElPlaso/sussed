"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Campaign, Project, SusResponse } from "@prisma/client";
import SusScore from "../SusScore";
import NewCampaign from "./NewCampaign";
import { Key, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  { key: "numResponses", label: "NUMBER OF RESPONSES" },
  { key: "score", label: "SCORE" },
];

export interface CampaignsProps {
  project: Project & {
    campaigns: Array<
      Campaign & {
        susResponses: Array<SusResponse>;
      }
    >;
  };
}

export default function Campaigns(props: CampaignsProps) {
  const { project } = props;

  const { id: projectId, ownerId, campaigns } = project;

  const router = useRouter();

  const handleRowAction = useCallback(
    (key: Key) => {
      router.push(`/projects/${projectId}/campaigns/${key}`);
    },
    [projectId, router]
  );

  const userId = useSession()?.data?.user?.id;

  const isOwner = ownerId === userId;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-4 justify-between items-start w-full">
        <h2 className="text-lg">Campaigns</h2>
        {isOwner && <NewCampaign projectId={projectId} />}
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
              <TableCell>{item.description}</TableCell>
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
