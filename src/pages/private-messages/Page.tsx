import { Alert, Chip, List, Loader, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import useAuth from "../../api/useAuth";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";
import { MessageRecipients } from "./MessageRecipients";

function MessagesPage() {
  const { isAdmin, isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");

  // conditionally fetch data
  const { data: myData, error } = useSWR(
    isParent
      ? `${process.env.REACT_APP_URL}/api/parent/my-data`
      : `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    fetcher
  );

  if (error) return <Alert>An error has occurred</Alert>;
  if (!error && !myData) return <Loader />;

  return (
    <>
      <Title>Parent component</Title>
      <Text>Choosen value is: {recipientSelected}</Text>
      <MessageRecipients
        isParent={isParent}
        messages={myData.privateMessages}
        recipientSelected={recipientSelected}
        setRecipientSelected={setRecipientSelected}
      />
      <div>
        Getting data from /api/{isParent ? "parent" : "teacher"}/my-data
      </div>
      <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>;
    </>
  );
}

export default MessagesPage;
