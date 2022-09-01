import { useEffect, useLayoutEffect, useState } from "react";
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
  APIAnnouncementEdit,
  IAnnouncement,
  IGroup,
} from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";
import { updateAnnouncement } from "../../api/announcement";
import { fetcher } from "../../api/fetch";
import { sortByValueToSelect } from "../../helpers/utils";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: IAnnouncement;
  mutate: KeyedMutator<IAnnouncement[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal

  const [value, setValue] = useState<string>("");

  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      subject: item.subject,
      announcementText: item.announcementText,
      groupId: String(item.kindergartenGroup.id),
    },
  });

  useEffect(() => {
    form.setFieldValue("groupId", String(item.kindergartenGroup.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: allItems, error: errorItems } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  //iterate

  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.groupName}`,
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  async function editItem(values: APIAnnouncementEdit) {
    console.log(values);

    const valuesToAPI: APIAnnouncement = {
      groupId: Number(values.groupId),
      subject: values.subject,
      announcementText: values.announcementText,
    };

    console.log("valuesToAPI", valuesToAPI);

    const updated = await updateAnnouncement(item.id, valuesToAPI);
    mutate(updated);
    form.reset();
    handleClose();
  }

  if (errorItems)
    return <div>Failed to load groups to announcement data...</div>;
  if (!allItems && !errorItems) return <Loader></Loader>;
  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit announcement"
      >
        <form onSubmit={form.onSubmit(editItem)}>
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
          <Space h={"xl"} />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
