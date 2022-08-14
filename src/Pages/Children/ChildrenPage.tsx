import { Button, Title, Text, Space } from "@mantine/core";
import React, { useState } from "react";
import { getChildren } from "./../../api";

const ChildrenPage = () => {
  const [children, setChildren] = useState(null);

  const handleButtonClick = () => {
    getChildren()
      .then((children) => {
        setChildren(children);
        console.log("---children---", children);
      })
      .catch((error) => {
        // errors
        console.log("---error---", error);
      });
  };

  return (
    <>
      <Title order={1}>Children </Title>
      <Space h="lg" />
      <Text>Children list</Text>
      {!children ? (
        <Button onClick={handleButtonClick}>Get children</Button>
      ) : (
        ""
      )}
      {children ? <>{JSON.stringify(children)} </> : ""}
    </>
  );
};
export default ChildrenPage;
