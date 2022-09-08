import { useForm } from "@mantine/form";
import {
  Button,
  Loader,
  Modal,
  Select,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  APIAnnouncement,
  IAnnouncement,
  IGroup,
} from "../../interfaces/Entities";
import { IconCirclePlus } from "@tabler/icons";
import { addAnnouncement } from "../../api/announcement";
import { useState } from "react";
import { fetcher } from "../../api/fetch";
import { sortByValueToSelect } from "../../helpers/utils";

function AddItemModal({
  mutate,
  open,
  setOpen,
}: {
  mutate: KeyedMutator<IAnnouncement[]>;
  open: boolean;
  setOpen: (arg0: boolean) => void;
}) {
  const form = useForm({
    initialValues: {
      subject: "",
      announcementText: "",
      groupId: 0,
    },
  });

  const [value, setValue] = useState<string | null>(null);

  async function createItem(values: APIAnnouncement) {
    const updated = await addAnnouncement(values);
    mutate(updated);
    form.reset();
    setOpen(false);
  }

  const { data: allItems, error: errorItems } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems)
    return <div>Failed to load groups to announcement data...</div>;
  //iterate

  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.groupName}`,
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  return (
    <>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Create announcement"
      >
        <form onSubmit={form.onSubmit(createItem)}>
          <TextInput
            required
            mb={12}
            label="Subject"
            placeholder="Enter announcement subject"
            {...form.getInputProps("subject")}
          />
          <Textarea
            required
            mb={12}
            label="Announcement Text"
            placeholder="Enter announcement text"
            {...form.getInputProps("announcementText")}
          />
          <Select
            required
            label="Group"
            placeholder="select group"
            searchable
            nothingFound="No group to choose"
            data={allItemsData}
            value={value}
            onChange={setValue}
            {...form.getInputProps("groupId")}
          />
          <Space h={"xl"}></Space>
          <Button type="submit" leftIcon={<IconCirclePlus />}>
            Create announcement
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddItemModal;
