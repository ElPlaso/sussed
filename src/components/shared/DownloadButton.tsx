"use client";

import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToast, Button } from "@heroui/react";
import { ReactNode, useCallback, useState } from "react";

export interface DownloadButtonProps {
  href: string;
  title: string;
  children?: ReactNode;
  isDisabled?: boolean;
  toastMessage?: string;
  accept?: string;
}

export default function DownloadButton(props: DownloadButtonProps) {
  const {
    href,
    title,
    children,
    isDisabled,
    toastMessage,
    accept = "text/csv",
  } = props;

  const [isExporting, setIsExporting] = useState(false);

  const saveStreamCSV = useCallback((filename: string, text: string) => {
    const anchor = document.createElement("a");
    anchor.download = filename;

    const blobObject = new Blob([text], { type: "text/csv" });
    anchor.href = window.URL.createObjectURL(blobObject);

    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  }, []);

  const handleDownloadClick = useCallback(() => {
    setIsExporting(true);
    fetch(href, {
      headers: {
        Accept: accept,
      },
    })
      .then((response) => response.text())
      .then((responseText) => {
        setIsExporting(false);
        saveStreamCSV(title, responseText);
        if (toastMessage) {
          addToast({
            title: toastMessage,
            color: "primary",
            variant: "flat",
          });
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_e) => {
        addToast({
          title: "Oops! Something went wrong. Please try again.",
          color: "danger",
          variant: "flat",
        });
        setIsExporting(false);
      });
  }, [href, accept, title, toastMessage, saveStreamCSV]);

  return (
    <Button
      onPress={handleDownloadClick}
      isDisabled={isExporting || isDisabled}
      startContent={
        isExporting ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faDownload} />
        )
      }
      isIconOnly={!children}
      variant="light"
      className="text-neutral-500"
    >
      {children}
    </Button>
  );
}
