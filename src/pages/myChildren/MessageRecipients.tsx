import { Alert, Chip, Title, Text, Space, Stack } from "@mantine/core";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";

interface ChildrenProps {
  messages: PrivateMessageDTO[];
  isParent: boolean | undefined;
  recipientSelected: string;
  setRecipientSelected: (arg: string) => void;
  actualConversationPersons: IPerson[];
}
export const MessageRecipients: React.FC<ChildrenProps> = ({
  messages,
  isParent,
  recipientSelected,
  setRecipientSelected,
  actualConversationPersons,
}) => {
  //get unique conversation persons
  ////

  ////Select recipient to view conversation

  if (actualConversationPersons.length < 1) {
    return <Alert>No conversation exist</Alert>;
  } else {
    return (
      <>
        <Title order={3}>Your children:</Title>

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
          defaultValue={recipientSelected}
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
