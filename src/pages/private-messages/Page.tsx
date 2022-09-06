import { Button, Grid, Loader, Space, Text } from "@mantine/core";
import React, { useState } from "react";
import useAuth from "../../api/useAuth";
import { MessageRecipients } from "./MessageRecipients";
import useDataFetcher from "../../helpers/useDataFetcher";
import { MessageData } from "./MessageData";
import SiteHeader from "../../components/SiteHeader";
import { SendMessageModal } from "./SendMessageModal";
import { IParent, IPerson } from "../../interfaces/Entities";
import { IconMail } from "@tabler/icons";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "../../api/fetch";
import { sortPersons } from "../../helpers/utils";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  //fetch data
  const {
    data: myData,
    error,
    dataMessages,
    isValidating,
    mutate,
  } = useDataFetcher();
  //////////////////////////////

  let persons: IPerson[] = [];

  const { data: parentsBeta } = useSWR<IParent[], string>(
    !isParent ? `${process.env.REACT_APP_URL}/api/parent` : null,
    fetcher
  );
  const { data: teachersBeta } = useSWR(
    isParent ? `${process.env.REACT_APP_URL}/api/parent/my-data` : null,
    fetcher
  );

  if (isParent) {
    console.log("retrieving teachers data:", teachersBeta);
  } else {
    console.log("retrieving parents data:", parentsBeta);
    persons = !!parentsBeta
      ? parentsBeta.map((x) => {
          return {
            id: x.id,
            name: x.name,
            surname: x.surname,
          };
        })
      : [];
  }

  persons.sort(sortPersons);

  //////////////////////////////
  const pageTitleString = "Messages";
  if (error) return <SiteHeader title={pageTitleString} error={error} />;
  if ((!dataMessages && !error) || isValidating)
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
              messages={dataMessages}
              recipientSelected={recipientSelected}
              setRecipientSelected={setRecipientSelected}
            />
            <SendMessageModal
              recipientList={persons}
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
                messages={dataMessages}
                recipientSelected={recipientSelected}
                setRecipientSelected={setRecipientSelected}
                mutate={mutate}
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
