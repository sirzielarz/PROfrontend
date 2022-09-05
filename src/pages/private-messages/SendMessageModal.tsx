import {
  Space,
  Modal,
  Button,
  TextInput,
  Select,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons";
import { useState } from "react";
import useAuth from "../../api/useAuth";
import { sortByValueToSelect } from "../../helpers/utils";
import { IPerson, PrivateMessageAPI } from "../../interfaces/Entities";

interface Props {
  recipientList: IPerson[];
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export const SendMessageModal: React.FC<Props> = ({
  recipientList,
  open,
  setOpen,
}) => {
  const { user, isParent } = useAuth();
  // const [showAddItem, setShowAddItem] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const form = useForm<PrivateMessageAPI>({
    initialValues: {
      subject: "test",
      messageText: "test",
      sender: String(user?.id),
      teacherId: Number(isParent ? value : user?.id),
      parentId: Number(isParent ? user?.id : value),
    },
    // validate: {
    //   subject: (value, values) =>
    //     values.subject.length === 0 || values.messageText.length === 0
    //       ? "enter at least 2 characters"
    //       : value.length > 50
    //       ? "enter max 50 characters"
    //       : null,
    // },
  });

  let allItemsData = recipientList?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.surname} ${x.name}`,
      key: `${x.id}`,
    };
  });

  allItemsData?.sort(sortByValueToSelect);

  async function sendMessage(values: PrivateMessageAPI) {
    console.log("testxxxxx");
    console.log(values);

    //const updated = await sendMessage(values);
    // mutate(updated);
    form.reset();
    setOpen(false);
  }

  function sendMessagex(values: PrivateMessageAPI) {
    console.log(values);

    //const updated = await sendMessage(values);
    // mutate(updated);
    // form.reset();
    setOpen(false);
  }
  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Write message">
        {/* <div className="jsonout">{JSON.stringify(recipientList, null, 4)}</div> */}
        <form onSubmit={form.onSubmit(sendMessage)}>
          <Select
            required
            label={isParent ? "Teacher" : "Parent"}
            placeholder={isParent ? "choose teacher" : "choose parent"}
            searchable
            nothingFound={
              "No " + (isParent ? "teacher" : "parent") + " to choose"
            }
            data={allItemsData}
            value={value}
            mb={12}
            onChange={setValue}
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
      </Modal>
    </>
  );
};
