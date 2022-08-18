import { Button, Title, Text, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getParents } from "../../apix";
import { usePage, Page } from "../../contextsx/Page";

const ParentsPage = () => {
  const [parents, setParents] = useState(null);
  const { page, setPage } = usePage();
  useEffect(() => {
    setPage(Page.Parents);
    console.log("parents context have been set");
  }, []);

  const handleButtonClick = () => {
    getParents()
      .then((parents) => {
        setParents(parents);
        console.log("---parents---", parents);
      })
      .catch((error) => {
        // errors
        console.log("---error---", error);
      });
  };

  return (
    <>
      <Title order={1}>Parents page </Title>
      <Space h="lg" />
      <Text>Parents list</Text>
      {!parents ? <Button onClick={handleButtonClick}>Get parents</Button> : ""}
      {parents ? <>{JSON.stringify(parents)} </> : ""}
    </>
  );
};
export default ParentsPage;
