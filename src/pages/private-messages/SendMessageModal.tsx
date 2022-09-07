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
import { KeyedMutator } from "swr";
import { addPrivateMessage } from "../../api/private-message";
import useAuth from "../../api/useAuth";
import { sortByValueToSelect } from "../../helpers/utils";
import { IPerson, PrivateMessageAPI } from "../../interfaces/Entities";

interface Props {
  recipientList: IPerson[];
  open: boolean;
  recipientSelected: string;
  setOpen: (arg0: boolean) => void;
  mutate: KeyedMutator<PrivateMessageAPI>;
  setRecipientSelected: (arg0: string) => void;
}

export const SendMessageModal: React.FC<Props> = ({
  recipientList,
  mutate,
  recipientSelected,
  setRecipientSelected,
  open,
  setOpen,
}) => {
  const { user, isParent } = useAuth();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    return () => {
      if (Number(recipientSelected) > 0) {
        setValue(recipientSelected);

        if (isParent) {
          form.setFieldValue("teacherId", Number(recipientSelected));
        } else {
          form.setFieldValue("parentId", Number(recipientSelected));
        }
      }
    };
  }, [recipientSelected]);

  const form = useForm<PrivateMessageAPI>({
    initialValues: {
      subject: "",
      messageText: "",
      sender: String(user?.id),
      teacherId: isParent ? Number(recipientSelected) : Number(user?.id),
      parentId: Number(isParent ? user?.id : recipientSelected),
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
    setRecipientSelected(
      isParent ? String(values.teacherId) : String(values.parentId)
    );
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
            defaultChecked={Number(recipientSelected)}
            defaultValue={Number(recipientSelected)}
            mb={12}
            onChange={setRecipientSelected}
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
