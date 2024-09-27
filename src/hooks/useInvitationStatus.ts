import { Project, SusResponse, SusInvitation } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useInvitationStatus = (project: Project & { susResponses: Array<SusResponse>; susInvitations: Array<SusInvitation> }): { invitationCode: string | null, invitationCodeExists: boolean, alreadySubmitted: boolean } => {
    const searchParams = useSearchParams();
    const invitationCode = searchParams.get("invite-code");

    const invitationCodeExists = useMemo(() => {
        return project.susInvitations.some(
            (invitation) => invitation.id === invitationCode
        );
    }, [invitationCode, project.susInvitations]);

    const alreadySubmitted = useMemo(() => {
        return project.susResponses.some(
            (response) => response.invitationId === invitationCode
        );
    }, [invitationCode, project.susResponses]);

    return {
        invitationCode,
        invitationCodeExists,
        alreadySubmitted
    }
}