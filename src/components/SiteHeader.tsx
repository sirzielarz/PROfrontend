import { Alert, Space, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";

interface Props {
  title: string;
  error?: string | undefined;
}
export const SiteHeader: React.FC<Props> = ({ title, error }) => {
  return (
    <>
      <Title order={1}>{title}</Title>
      <Space h="xl" />

      {error ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ups!"
          color="red"
          variant="filled"
        >
          Failed to load data..
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default SiteHeader;
