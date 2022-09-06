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
import { useEffect, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { addPrivateMessage } from "../../api/private-message";
import useAuth from "../../api/useAuth";
import { sortByValueToSelect, sortPersons } from "../../helpers/utils";
import { IParent, IPerson, PrivateMessageAPI } from "../../interfaces/Entities";

interface Props {
  recipientList: IPerson[];
  open: boolean;
  recipientSelected: string;
  setOpen: (arg0: boolean) => void;
  mutate: KeyedMutator<PrivateMessageAPI>;
}

export const SendMessageModal: React.FC<Props> = ({
  recipientList,
  mutate,
  recipientSelected,
  open,
  setOpen,
}) => {
  const { user, isParent } = useAuth();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (recipientSelected) {
        setValue(recipientSelected);
      }
    };
  }, []);

  const form = useForm<PrivateMessageAPI>({
    initialValues: {
      subject: "",
      messageText: "",
      sender: String(user?.id),
      teacherId: Number(isParent ? value : user?.id),
      parentId: Number(isParent ? user?.id : value),
    },
    validate: {
      subject: (value, values) =>
        value.length > 99 ? "enter less than 100 characters" : null,
      messageText: (value, values) =>
        value.length > 499 ? "enter less than 500 characters" : null,
    },
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
    const updated = await addPrivateMessage(values);
    mutate(updated);
    form.reset();
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
