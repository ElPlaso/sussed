"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Snippet,
} from "@heroui/react";
import { SusInvitation } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "isSurveySubmitted",
    label: "SURVEY SUBMITTED",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export interface InvitationsProps {
  invitations: Array<SusInvitation>;
  // responses: Array<SusResponse>; // TODO: Get invitations whose surveys have been submitted
}

export default function Invitations(props: InvitationsProps) {
  const { invitations } = props;

  const url = process.env.NEXT_PUBLIC_URL; // TODO: Validate env variable
  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[2], [pathName]);
  const campaignId = useMemo(() => pathName.split("/")[4], [pathName]);

  return (
    <Table aria-label="Sus Invitations">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"No invitations yet."} items={invitations}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Checkbox readOnly isSelected={false} />
            </TableCell>
            <TableCell>
              <Snippet
                hideSymbol
                classNames={{
                  base: "bg-transparent -ml-2",
                }}
                codeString={`${url}/projects/${projectId}/campaigns/${campaignId}/sus?invite-code=${item.id}`}
                tooltipProps={{
                  content: "Copy link",
                }}
              />
              {/* TODO: Allow deleting invitations */}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
