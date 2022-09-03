import {
  Alert,
  Chip,
  Grid,
  List,
  Loader,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import useAuth from "../../api/useAuth";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";
import { MessageRecipients } from "./MessageRecipients";

function MessagesPage() {
  const { isAdmin, isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  const [openMessages, setOpenMessages] = useState(false);

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
      <Title order={1}>Messages</Title>
      <Space h={"xl"} />
      <Grid>
        <Grid.Col md={3}>
          <MessageRecipients
            isParent={isParent}
            messages={myData.privateMessages}
            recipientSelected={recipientSelected}
            setRecipientSelected={setRecipientSelected}
          />
        </Grid.Col>
        {recipientSelected && (
          <Grid.Col md={9}>
            <Text>Choosen value is: {recipientSelected}</Text>
            <div>
              Getting data from /api/{isParent ? "parent" : "teacher"}/my-data
            </div>
            <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>;
          </Grid.Col>
        )}
      </Grid>
      <Space h={"xl"} />
    </>
  );
}

export default MessagesPage;
