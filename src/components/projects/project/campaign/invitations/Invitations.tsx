"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { SusInvitation, SusResponse } from "@prisma/client";
import { useMemo } from "react";
import InvitationResponseStatus from "./InvitationResponseStatus";
import DeleteInvitation from "./DeleteInvitation";
import ShareInvitation from "./ShareInvitation";

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
                <InvitationResponseStatus
                  invitationId={item.id}
                  respondedToInvitationIds={respondedToInvitationIds}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ShareInvitation
                    invitationId={item.id}
                    respondedToInvitationIds={respondedToInvitationIds}
                  />
                  <DeleteInvitation
                    invitationId={item.id}
                    respondedToInvitationIds={respondedToInvitationIds}
                  />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
