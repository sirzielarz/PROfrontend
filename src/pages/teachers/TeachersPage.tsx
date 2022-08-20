import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Title, Text, Space } from "@mantine/core";
import { ITeacher } from "../../interfaces/Entities";
import React, { useEffect, useState } from "react";
import { usePage, Page } from "../../contexts/Page";
import { getTeachers } from "../../api";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState(null);
  const { page, setPage } = usePage();
  useEffect(() => {
    setPage(Page.Teachers);
    console.log("teachers context have been set");
  }, []);

  const { data, error, mutate } = useSWR<ITeacher[], string>(
    `${process.env.REACT_APP_API}/group`,
    fetcher
  );

  const handleButtonClick = () => {
    getTeachers()
      .then((teachers) => {
        setTeachers(teachers);

        <div className="jsonout">{JSON.stringify(teachers, null, 4)}</div>;
        //console.log("---teachers---", teachers);
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
      {!teachers ? (
        <Button onClick={handleButtonClick}>Get group teachers</Button>
      ) : (
        ""
      )}
      {teachers ? (
        <>
          <div className="jsonout">{JSON.stringify(teachers, null, 4)}</div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default TeachersPage;
