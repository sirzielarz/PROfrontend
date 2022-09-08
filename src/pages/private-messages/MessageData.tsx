import {
  Title,
  Text,
  Space,
  Alert,
  Group,
  Stack,
  Container,
  TextInput,
  Button,
  Textarea,
  Input,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons";
import { KeyedMutator } from "swr";
import { addPrivateMessage } from "../../api/private-message";
import useAuth from "../../api/useAuth";
import { sortByID } from "../../helpers/utils";
import {
  IEntity,
  IPerson,
  PrivateMessageAPI,
  PrivateMessageDTO,
} from "../../interfaces/Entities";

interface MessageDataProps {
  messages: PrivateMessageDTO[];
  mutate: KeyedMutator<PrivateMessageAPI>;
  isParent: boolean | undefined;
  recipientSelected: string;
  setRecipientSelected: (arg: string) => void;
}
export const MessageData: React.FC<MessageDataProps> = ({
  messages,
  isParent,
  mutate,
  recipientSelected,
  setRecipientSelected,
}) => {
  const { user } = useAuth();

  const form = useForm<PrivateMessageAPI>({
    initialValues: {
      subject: "",
      messageText: "",
      sender: String(user?.id),
      teacherId: Number(isParent ? recipientSelected : user?.id),
      parentId: Number(isParent ? user?.id : recipientSelected),
    },
    validate: {
      subject: (value, values) =>
        value.length > 99 ? "enter less than 100 characters" : null,
      messageText: (value, values) =>
        value.length > 499 ? "enter less than 500 characters" : null,
    },
  });

  async function sendAnswer(values: PrivateMessageAPI) {
    const updated = await addPrivateMessage(values);
    mutate(updated);
    setRecipientSelected(
      isParent ? String(values.teacherId) : String(values.parentId)
    );
    form.reset();
  }

  //filter array
  const filteredMessages: PrivateMessageDTO[] = messages
    .sort(sortByID)
    .filter((x) =>
      isParent
        ? x.teacher.id === Number(recipientSelected)
        : x.parent.id === Number(recipientSelected)
    );
  //get sender and receiver
  if (recipientSelected) {
    const parentData: IPerson = filteredMessages[0].parent;
    const teacherData: IPerson = filteredMessages[0].teacher;

    let myMessage: boolean;

    // let myMessage: boolean; //store each message owner

    return (
      <>
        <Container sx={{ wordBreak: "break-all" }}>
          <Title order={3}>
            Conversation with {isParent ? " teacher: " : " parent: "}
          </Title>
          <ScrollArea style={{ height: 550 }} offsetScrollbars>
            {filteredMessages
              .sort((a: IEntity, b: IEntity) => a.id - b.id)
              .map((x, i) => {
                myMessage = isParent
                  ? x.sender === "parent" || x.sender === String(parentData.id)
                    ? true
                    : false
                  : x.sender === "teacher" ||
                    x.sender === String(teacherData.id)
                  ? true
                  : false;

                return (
                  <Group
                    key={"group_" + i}
                    mt={"lg"}
                    position={myMessage ? "right" : "left"}
                  >
                    <Stack
                      key={"stack_" + i}
                      spacing={0}
                      align={myMessage ? "flex-end" : "flex-start"}
                    >
                      <Text key={"text_" + i} color="dimmed" size="sm">
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
                        <Text key={"message_text_" + i}>{x.messageText}</Text>
                      </Alert>
                    </Stack>
                  </Group>
                );
              })}
          </ScrollArea>

          <Space h={"xl"} />

          <form onSubmit={form.onSubmit(sendAnswer)}>
            <Input
              disabled={true}
              hidden={true}
              value={recipientSelected}
              {...form.getInputProps(isParent ? "teacherId" : "parentId")}
            />
            <TextInput
              required
              mb={12}
              label="Subject"
              placeholder="enter subject"
              {...form.getInputProps("subject")}
            />
            <Textarea
              required
              mb={12}
              label="Message"
              placeholder="enter message"
              {...form.getInputProps("messageText")}
            />

            <Space h="lg" />
            <Button type="submit" leftIcon={<IconMail />}>
              Send message
            </Button>
          </form>
        </Container>
      </>
    );
  } else {
    setRecipientSelected("");
    return <></>;
  }
};
