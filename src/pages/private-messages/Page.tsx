import { Button, Grid, Loader, Space, Text } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";
import { MessageData } from "./MessageData";
import SiteHeader from "../../components/SiteHeader";
import { SendMessageModal } from "./SendMessageModal";
import { IPerson } from "../../interfaces/Entities";
import { IconCirclePlus, IconMail } from "@tabler/icons";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
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

  const potentialRecipments: IPerson[] = [
    { id: 1, name: "testa", surname: "testg" },
    { id: 2, name: "testb", surname: "teste" },
    { id: 3, name: "testc", surname: "testd" },
  ];

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
            <SendMessageModal
              recipientList={potentialRecipments}
              open={showAddItem}
              setOpen={setShowAddItem}
            />
            <Space h={"xl"}></Space>
            <Button
              onClick={() => setShowAddItem(true)}
              leftIcon={<IconMail />}
            >
              Send message
            </Button>
          </Grid.Col>
          {recipientSelected && (
            <Grid.Col md={6}>
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
              {/* <div>
                Fetched data from /api/{isParent ? "parent" : "teacher"}
                /my-data
              </div>
              <div className="jsonout">{JSON.stringify(myData, null, 4)}</div> */}
            </Grid.Col>
          )}
        </Grid>
      </>
    </>
  );
}

export default MessagesPage;
