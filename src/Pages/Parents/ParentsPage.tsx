import { Button, Title, Text, Space } from "@mantine/core";
import React, { useState } from "react";
import { getParents } from "./../../api";

const ParentsPage = () => {
  const [parents, setParents] = useState(null);

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
