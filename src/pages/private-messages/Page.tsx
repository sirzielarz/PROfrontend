import { Alert, Chip, List, Loader, Text } from "@mantine/core";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import useAuth from "../../api/useAuth";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";

function MessagesPage() {
  const { isAdmin, isParent } = useAuth();

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
      <MessageRecipients
        isParent={isParent}
        messages={myData.privateMessages}
      />
      <div>
        Getting data from /api/{isParent ? "parent" : "teacher"}/my-data
      </div>
      <div className="jsonout">{JSON.stringify(myData, null, 4)}</div>;
    </>
  );
}

export default MessagesPage;

interface MessageRecipientsProps {
  messages: PrivateMessageDTO[];
  isParent: boolean | undefined;
}
export const MessageRecipients: React.FC<MessageRecipientsProps> = ({
  messages,
  isParent,
}) => {
  const [recipient, setRecipient] = useState<string>();

  //get unique conversation persons
  const uniqueRecipients: IPerson[] = [];
  const map = new Map();
  for (const item of messages) {
    if (!map.has(isParent ? item.teacher.id : item.parent.id)) {
      map.set(isParent ? item.teacher.id : item.parent.id, true); // set any value to Map
      uniqueRecipients.push({
        id: isParent ? item.teacher.id : item.parent.id,
        name: isParent ? item.teacher.name : item.parent.name,
        surname: isParent ? item.teacher.surname : item.parent.surname,
      });
    }
  }

  if (!(uniqueRecipients.length > 0)) {
    return <Alert>No conversation exist</Alert>;
  } else {
    return (
      <>
        <Text>Your conversations:</Text>
        <Chip.Group multiple={false} value={recipient} onChange={setRecipient}>
          {uniqueRecipients.map((x) => (
            <Chip key={"conversation_with_" + x.id} value={x.id}>
              {x.surname + " " + x.name}
            </Chip>
          ))}
        </Chip.Group>
        <Text>Selected: {recipient} </Text>
      </>
    );
  }
};
