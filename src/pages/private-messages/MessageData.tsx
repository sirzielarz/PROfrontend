import { Chip, Title, Text, Space, Alert } from "@mantine/core";
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
            : false;

          const v = myMessage ? "filled" : "outline";
          return (
            <>
              <Alert
                mt={"lg"}
                radius={"xl"}
                key={"message_" + x.id}
                icon={<IconMail size={16} />}
                title={isParent && myMessage ? `parent` : `teacher`}
                variant={v}
              >
                <Text weight={"bold"}>{x.subject}</Text>
                <Text>{x.messageText}</Text>
              </Alert>
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
