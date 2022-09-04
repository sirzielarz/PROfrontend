import {
  Title,
  Text,
  Space,
  Alert,
  Group,
  Stack,
  Modal,
  Button,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus } from "@tabler/icons";
import { useState } from "react";
import useAuth from "../../api/useAuth";
import { sortByID } from "../../helpers/utils";
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
  const [showAddItem, setShowAddItem] = useState(false);

  const sendMessage = (values: any) => {
    console.log("sending message with values: ", values);
  };

  const form = useForm<any>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  // PrivateMessageAPI
  // async function createItem(values: any) {
  //   //const updated = await sendMessage(values);
  //   // mutate(updated);
  //   // form.reset();
  //   setOpen(false);
  // }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Write message">
        <div className="jsonout">{JSON.stringify(recipientList, null, 4)}</div>
        <form onSubmit={form.onSubmit(sendMessage)}>
          <TextInput
            required
            mb={12}
            label="Name"
            placeholder="enter name"
            {...form.getInputProps("name")}
          />

          <Space h="lg" />
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create authorized person
          </Button>
        </form>
      </Modal>
    </>
  );
};
