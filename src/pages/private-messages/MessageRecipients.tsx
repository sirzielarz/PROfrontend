import { Alert, Chip, Title, Text, Space } from "@mantine/core";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";

interface MessageRecipientsProps {
  messages: PrivateMessageDTO[];
  isParent: boolean | undefined;
  recipientSelected: string;
  setRecipientSelected: (arg: string) => void;
}
export const MessageRecipients: React.FC<MessageRecipientsProps> = ({
  messages,
  isParent,
  recipientSelected,
  setRecipientSelected,
}) => {
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
    return <Alert>No conversations exist..</Alert>;
  } else {
    return (
      <>
        <Title order={3}>Your conversations:</Title>
        <Space h={"xl"} />
        <Chip.Group
          multiple={false}
          value={recipientSelected}
          onChange={setRecipientSelected}
        >
          {uniqueRecipients.map((x) => (
            <Chip key={"conversation_with_" + x.id} value={String(x.id)}>
              {x.surname + " " + x.name}
            </Chip>
          ))}
        </Chip.Group>
        <Space h={"xl"} />
        <Text
          size={"sm"}
          hidden={recipientSelected ? true : false}
          color={"gray"}
        >
          Select recipient to view{" "}
        </Text>
      </>
    );
  }
};
