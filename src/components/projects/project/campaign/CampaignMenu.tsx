"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { Key } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisVertical,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useToggleState from "@/hooks/useToggleState";
import { Campaign } from "@prisma/client";
import EditCampaign from "./EditCampaign";
import { updateCampaign } from "@/actions/update-campaign";

export interface CampaignDropdownProps {
  campaign: Campaign;
}

export default function CampaignMenu(props: CampaignDropdownProps) {
  const { campaign } = props;

  console.log(campaign);

  const [isEditCampaignModalOpen, toggleEditCampaignModal] = useToggleState();
  const [isDeleteCampaignModalOpen, toggleDeleteCampaignModal] =
    useToggleState();

  const router = useRouter();

  const handleAction = async (key: Key) => {
    switch (key) {
      case "edit":
        toggleEditCampaignModal();
        break;
      case "share":
        // TODO
        break;
      case "delete":
        toggleDeleteCampaignModal();
        break;
      default:
        break;
    }
  };

  const handleUpdateCampaign = async (formData: FormData) => {
    return await updateCampaign(campaign.id, formData);
  };

  const handleDeleteCampaign = async () => {
    // await deleteCampaign(campaign.id);
    router.push(`/projects/${campaign.projectId}`);
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size="lg"
              className="text-default-500"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={handleAction}>
          <DropdownSection aria-label="Actions">
            <DropdownItem
              key="edit"
              startContent={
                <FontAwesomeIcon className="text-default-500" icon={faEdit} />
              }
            >
              Edit
            </DropdownItem>
            <DropdownItem
              key="share"
              startContent={
                <FontAwesomeIcon className="text-default-500" icon={faShare} />
              }
            >
              Share
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<FontAwesomeIcon icon={faTrash} size="lg" />}
            >
              Delete
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <EditCampaign
        campaign={campaign}
        isModalOpen={isEditCampaignModalOpen}
        toggleModal={toggleEditCampaignModal}
        onSubmit={handleUpdateCampaign}
      />
    </>
  );
}
