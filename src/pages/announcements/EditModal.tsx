import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {Button, Loader, Modal, Select, TextInput} from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  APIAnnouncement,
  APIAuthorizedPerson,
  IActivity,
  IAnnouncement,
  IGroup,
  IPerson
} from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";
import {updateAnnouncement} from "../../api/announcement";
import {fetcher} from "../../api/fetch";
import {sortByValueToSelect} from "../../helpers/utils";



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

  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      subject: item.subject,
      announcementText: item.announcementText,
      groupId: item.kindergartenGroup.id
    },
  });

  async function editItem(values: APIAnnouncement) {
    const updated = await updateAnnouncement(item.id, values);
    mutate(updated);
    form.reset();
    handleClose();
  }

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
          <TextInput
              required
              mb={12}
              label="Announcement Text"
              placeholder="Enter announcement text"
              {...form.getInputProps("announcementText")}
          />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
