import { Alert, Chip, Title, Text, Space, Stack } from "@mantine/core";
import { sortPersons } from "../../helpers/utils";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";

interface MessageRecipientsProps {
  messages: PrivateMessageDTO[];
  isParent: boolean | undefined;
  recipientSelected: string;
  setRecipientSelected: (arg: string) => void;
  actualConversationPersons: IPerson[];
}
export const MessageRecipients: React.FC<MessageRecipientsProps> = ({
  messages,
  isParent,
  recipientSelected,
  setRecipientSelected,
  actualConversationPersons,
}) => {
  //get unique conversation persons
  ////

  ////

  if (!actualConversationPersons) {
    return <Alert>No conversation exist</Alert>;
  } else {
    return (
      <>
        <Title order={3}>Your conversations:</Title>

        <Text
          size={"sm"}
          // hidden={recipientSelected ? true : false}
          color={"gray"}
        >
          Select recipient to view conversation{" "}
        </Text>
        <Space h={"xl"} />
        <Chip.Group
          multiple={false}
          value={recipientSelected}
          onChange={setRecipientSelected}
        >
          <Stack>
            {actualConversationPersons.map((x) => (
              <Chip key={"conversation_with_" + x.id} value={String(x.id)}>
                {x.surname + " " + x.name}
              </Chip>
            ))}
          </Stack>
        </Chip.Group>
      </>
    );
  }
};
