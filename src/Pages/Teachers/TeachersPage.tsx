import { Button, Title, Text, Space } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { usePage, Page } from "../../contexts/Page";
import { getGroupTeacher } from "./../../api";

const TeachersPage = () => {
  const [groupTeachers, setGroupTeachers] = useState(null);

  useEffect(() => {
    console.log("useEffect from teachers page");
  }, []);

  const handleButtonClick = () => {
    getGroupTeacher()
      .then((teachers) => {
        setGroupTeachers(teachers);
        console.log("---teachers---", teachers);
      })
      .catch((error) => {
        // errors
        console.log("---error---", error);
      });
  };

  return (
    <>
      <Title order={1}>Teachers </Title>
      <Space h="lg" />
      <Text>Teachers list</Text>
      {!groupTeachers ? (
        <Button onClick={handleButtonClick}>Get group teachers</Button>
      ) : (
        ""
      )}
      {groupTeachers ? <>{JSON.stringify(groupTeachers)} </> : ""}
    </>
  );
};
export default TeachersPage;
