import { SusResponse, SusInvitation, Campaign } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useInvitationStatus = (campaign: Campaign & { susResponses: Array<SusResponse>; susInvitations: Array<SusInvitation> }): { invitationCode: string | null, invitationCodeExists: boolean, alreadySubmitted: boolean } => {
    const searchParams = useSearchParams();
    const invitationCode = searchParams.get("invite-code");

    const invitationCodeExists = useMemo(() => {
        return campaign.susInvitations.some(
            (invitation) => invitation.id === invitationCode
        );
    }, [campaign.susInvitations, invitationCode]);

    const alreadySubmitted = useMemo(() => {
        return campaign.susResponses.some(
            (response) => response.invitationId === invitationCode
        );
    }, [campaign.susResponses, invitationCode]);

    return {
        invitationCode,
        invitationCodeExists,
        alreadySubmitted
    }
}