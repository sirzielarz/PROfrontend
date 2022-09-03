import { Alert, Grid, Loader, Space, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";
import { MessageData } from "./MessageData";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  //fetch data
  const { data: myData, error, dataMessages: data } = useDataFetcher();
  if (error) return <Alert>An error has occurred</Alert>;
  return (
    <>
      <Title order={1}>Messages</Title>
      <Space h={"xl"} />
      {!error && !data ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <Grid.Col md={3}>
              <MessageRecipients
                isParent={isParent}
                messages={data}
                recipientSelected={recipientSelected}
                setRecipientSelected={setRecipientSelected}
              />
            </Grid.Col>
            <Grid.Col md={3}>
              <MessageData
                isParent={isParent}
                messages={data}
                recipientSelected={recipientSelected}
                setRecipientSelected={setRecipientSelected}
              />
            </Grid.Col>
            {recipientSelected && (
              <Grid.Col md={6}>
                <Text>Choosen value is: {recipientSelected}</Text>
                <div>
                  Fetched data from /api/{isParent ? "parent" : "teacher"}
                  /my-data
                </div>
                <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>
              </Grid.Col>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default MessagesPage;
