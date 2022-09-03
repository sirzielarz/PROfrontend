import { Chip, Title, Text, Space, Alert, Group, Stack } from "@mantine/core";
import { IconMail } from "@tabler/icons";
import { sortByID } from "../../helpers/utils";
import { IPerson, PrivateMessageDTO } from "../../interfaces/Entities";

interface MessageDataProps {
  messages: PrivateMessageDTO[];
  isParent: boolean | undefined;
  recipientSelected: string;
  setRecipientSelected: (arg: string) => void;
}
export const MessageData: React.FC<MessageDataProps> = ({
  messages,
  isParent,
  recipientSelected,
  setRecipientSelected,
}) => {
  //filter array
  const filteredMessages: PrivateMessageDTO[] = messages
    .sort(sortByID)
    .filter((x) =>
      isParent
        ? x.teacher.id === Number(recipientSelected)
        : x.parent.id === Number(recipientSelected)
    );
  //get sender and reciver
  if (recipientSelected) {
    const parentData: IPerson = filteredMessages[0].parent;
    const teacherData: IPerson = filteredMessages[0].teacher;

    let myMessage: boolean;

    console.log(parentData);
    console.log(teacherData);

    // let myMessage: boolean; //store each message owner

    return (
      <>
        <Title order={3}>
          Conversation with {isParent ? " teacher: " : " parent: "}
        </Title>

        {filteredMessages.map((x) => {
          myMessage = isParent
            ? x.sender === "parent" || x.sender === String(parentData.id)
              ? true
              : false
            : x.sender === "teacher" || x.sender === String(teacherData.id)
            ? true
            : false;

          return (
            <>
              <Group mt={"lg"} position={myMessage ? "right" : "left"}>
                <Stack
                  spacing={0}
                  // justify="center"
                  align={myMessage ? "flex-end" : "flex-start"}
                >
                  <Text color="dimmed" size="sm">
                    {(isParent && myMessage) || (!isParent && !myMessage)
                      ? `${parentData.name + " " + parentData.surname}`
                      : `${teacherData.name + " " + teacherData.surname}`}
                  </Text>
                  <Alert
                    radius={"lg"}
                    key={"message_" + x.id}
                    icon={<IconMail size={16} />}
                    title={x.subject}
                    variant={myMessage ? "filled" : "outline"}
                  >
                    <Text>{x.messageText}</Text>
                  </Alert>
                </Stack>
              </Group>
            </>
          );
        })}

        <div className="jsonout">
          {JSON.stringify(filteredMessages, null, 4)}
        </div>

        <Space h={"xl"} />
      </>
    );
  } else {
    setRecipientSelected("");
    return <></>;
  }
};
