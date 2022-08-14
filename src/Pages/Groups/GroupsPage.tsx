import { Button, Title, Text, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getGroups } from "./../../api";
import { usePage, Page } from "../../contexts/Page";

const GroupsPage = () => {
  const [groups, setGroups] = useState(null);
  const { page, setPage } = usePage();
  useEffect(() => {
    setPage(Page.Groups);
    console.log("groups context have been set");
  }, []);

  const handleButtonClick = () => {
    getGroups()
      .then((groups) => {
        setGroups(groups);
        console.log("---groups---", groups);
      })
      .catch((error) => {
        // errors
        console.log("---error---", error);
      });
  };

  return (
    <>
      <Title order={1}>Groups </Title>
      <Space h="lg" />
      <Text>Groups list</Text>
      {!groups ? (
        <Button onClick={handleButtonClick}>Get group teachers</Button>
      ) : (
        ""
      )}
      {groups ? <>{JSON.stringify(groups)} </> : ""}
    </>
  );
};
export default GroupsPage;
