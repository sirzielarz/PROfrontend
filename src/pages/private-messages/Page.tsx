import { Grid, Loader, Text } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";
import { MessageData } from "./MessageData";
import SiteHeader from "../../components/SiteHeader";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  //fetch data
  const {
    data: myData,
    error,
    dataMessages: data,
    isValidating,
  } = useDataFetcher();

  const pageTitleString = "Messages";
  if (error) return <SiteHeader title={pageTitleString} error={error} />;
  if ((!data && !error) || isValidating)
    return (
      <>
        <SiteHeader title={pageTitleString} error={error} />
        <Loader />
      </>
    );

  return (
    <>
      <SiteHeader title={pageTitleString} error={error} />
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
          {recipientSelected && (
            <Grid.Col md={4}>
              <MessageData
                isParent={isParent}
                messages={data}
                recipientSelected={recipientSelected}
                setRecipientSelected={setRecipientSelected}
              />
            </Grid.Col>
          )}
          {recipientSelected && (
            <Grid.Col md={3}>
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
    </>
  );
}

export default MessagesPage;
