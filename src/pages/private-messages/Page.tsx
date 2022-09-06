import { Button, Grid, Loader, Space, Text } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
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
import GlobalContext from "../../helpers/GlobalContext";

function MessagesPage() {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  const [uniqueRecipientsList, setUniqueRecipientsList] = useState<IPerson[]>(
    []
  );
  const [actualConversationPersons, setActualConversationPersons] = useState<
    IPerson[]
  >([]);
  const [showAddItem, setShowAddItem] = useState(false);
  //fetch data
  const {
    data: myData,
    error,
    dataMessages,
    isValidating,
    mutate,
  } = useDataFetcher();
  //get potential recipients list
  const context = useContext(GlobalContext);

  useEffect(() => {
    return () => {
      if (recipientSelected) {
        console.log("yessss");
        setRecipientSelected(recipientSelected);
      }
    };
  }, []);

  let persons: IPerson[] = [];

  const { data: parentsBeta, error: errorP } = useSWR<IParent[], string>(
    !isParent ? `${process.env.REACT_APP_URL}/api/parent` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
    }
  );
  const { data: teachersBeta, error: errorT } = useSWR(
    isParent ? `${process.env.REACT_APP_URL}/api/parent/my-data` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
    }
  );
  const pageTitleString = "Messages";

  if (error || errorP || errorT)
    return <SiteHeader title={pageTitleString} error={error} />;
  if (
    (!dataMessages && !error) ||
    isValidating ||
    (!isParent && !parentsBeta) ||
    (isParent && !teachersBeta)
  )
    return (
      <>
        <SiteHeader title={pageTitleString} error={error} />
        <Loader />
      </>
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
  //get unique recipiements list from messages array
  const uniqueRecipients: IPerson[] = [];
  const map = new Map();
  if (myData)
    for (const item of myData.privateMessages) {
      if (!map.has(isParent ? item.teacher.id : item.parent.id)) {
        map.set(isParent ? item.teacher.id : item.parent.id, true); // set any value to Map
        uniqueRecipients.push({
          id: isParent ? item.teacher.id : item.parent.id,
          name: isParent ? item.teacher.name : item.parent.name,
          surname: isParent ? item.teacher.surname : item.parent.surname,
        });
      }
    }
  //save unique unique recipiements list from messages array
  let uniqueIDsBasedOnMessages = uniqueRecipients.slice(); //copy values - not reference
  uniqueIDsBasedOnMessages.sort(sortPersons);
  //merge persons from messages and potential recipiements
  var ids = new Set(uniqueRecipients.map((d) => d.id));
  var merged = [...uniqueRecipients, ...persons.filter((d) => !ids.has(d.id))];
  merged.sort(sortPersons);
  let mergedAllRecipients: IPerson[] = merged.slice(); //copy values - not reference
  // // //setUniqueRecipientsList(uniqueRecipients);

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
              actualConversationPersons={uniqueIDsBasedOnMessages}
            />
            <SendMessageModal
              recipientList={mergedAllRecipients}
              recipientSelected={recipientSelected}
              setRecipientSelected={setRecipientSelected}
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
          {/* {recipientSelected && ( */}
          <Grid.Col md={3}>
            <Text>Choosen value is: {recipientSelected}</Text>
            <div>
              Fetched data from /api/{isParent ? "parent" : "teacher"}
              /my-data
            </div>
            <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>
          </Grid.Col>
          {/* )} */}
        </Grid>
      </>
    </>
  );
}

export default MessagesPage;
