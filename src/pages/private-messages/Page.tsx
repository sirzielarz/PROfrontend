import { Button, Grid, Loader, Space, Text } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";
import { MessageData } from "./MessageData";
import SiteHeader from "../../components/SiteHeader";
import { SendMessageModal } from "./SendMessageModal";
import { IPerson, PrivateMessageAPI } from "../../interfaces/Entities";
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
    mutate,
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

  const potentialRecipments: IPerson[] = isParent
    ? [
        { id: 1, name: "Admin", surname: "Administerski" },
        { id: 2, name: "Ryszard", surname: "Bukowski" },
      ]
    : [{ id: 7, name: "Ilona", surname: "Głowacka" }];

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
              mutate={mutate}
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
                mutate={mutate}
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
