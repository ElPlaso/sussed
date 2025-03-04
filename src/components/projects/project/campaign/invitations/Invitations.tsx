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
import { SusInvitation, SusResponse } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "dateCreated",
    label: "CREATED",
  },
  {
    key: "isResponseSubmitted",
    label: "RESPONSE SUBMITTED?",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export interface InvitationsProps {
  invitations: Array<SusInvitation>;
  responses: Array<SusResponse>;
}

export default function Invitations(props: InvitationsProps) {
  const { invitations, responses } = props;

  const url = process.env.NEXT_PUBLIC_URL; // TODO: Validate env variable
  const pathName = usePathname();
  const projectId = useMemo(() => pathName.split("/")[2], [pathName]);
  const campaignId = useMemo(() => pathName.split("/")[4], [pathName]);

  const respondedToInvitationIds = useMemo(
    () => responses.map((r) => r.invitationId),
    [responses]
  );

  return (
    <>
      {responses.length && invitations.length && (
        <div className="text-sm text-neutral-500">
          {responses.length} responded / {invitations.length} invitations
        </div>
      )}
      <Table aria-label="Sus Invitations">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No invitations yet."} items={invitations}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.createdAt.toLocaleString("en-NZ")}</TableCell>
              <TableCell>
                <Checkbox
                  readOnly
                  isSelected={respondedToInvitationIds.includes(item.id)}
                />
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
    </>
  );
}
