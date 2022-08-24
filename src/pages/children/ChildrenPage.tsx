import { Button, Title, Text, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { usePage, Page } from "../../contexts/Page";
import { getChildren } from "../../api/child/index";

const ChildrenPage = () => {
  const [children, setChildren] = useState(null);
  const { page, setPage } = usePage();
  useEffect(() => {
    setPage(Page.Children);
    console.log("children context have been set");
  }, []);

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
