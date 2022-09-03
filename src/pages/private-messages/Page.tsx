import { Alert, Grid, Loader, Space, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  //fetch data
  const { error, dataMessages: data } = useDataFetcher();
  if (error) return <Alert>An error has occurred</Alert>;
  if (!error && !data) return <Loader />;

  return (
    <>
      <Title order={1}>Messages</Title>
      <Space h={"xl"} />
      <Grid>
        <Grid.Col md={3}>
          <MessageRecipients
            isParent={isParent}
            messages={data}
            recipientSelected={recipientSelected}
            setRecipientSelected={setRecipientSelected}
          />
        </Grid.Col>
        {recipientSelected && (
          <Grid.Col md={9}>
            <Text>Choosen value is: {recipientSelected}</Text>
            <div>
              Fetched data from /api/{isParent ? "parent" : "teacher"}/my-data
            </div>
            <div className="jsonout">{JSON.stringify(data, null, 4)}</div>;
          </Grid.Col>
        )}
      </Grid>
      <Space h={"xl"} />
    </>
  );
}

export default MessagesPage;
