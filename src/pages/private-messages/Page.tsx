import { Alert, Loader } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import useAuth from "../../api/useAuth";
import { IParent, ITeacher } from "../../interfaces/Entities";

function MessagesPage() {
  const { isAdmin, isParent } = useAuth();

  // conditionally fetch
  const { data: myData, error } = useSWR<ITeacher>(
    isParent
      ? `${process.env.REACT_APP_URL}/api/parent/my-data`
      : `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    fetcher
  );

  if (error) return <Alert>An error has occurred</Alert>;
  if (!error && !myData) return <Loader />;
  return (
    <>
      <div>
        Getting data from /api/{isParent ? "parent" : "teacher"}/my-data
      </div>
      <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>;
    </>
  );
}

export default MessagesPage;
