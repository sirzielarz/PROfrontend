import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Grid,
  Modal,
  PasswordInput,
  Popover,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { editChild } from "../../api/child/index";
import { APIPhotoAlbum, IPhotoAlbum } from "../../interfaces/Entities";
import { IconArrowBack, IconEdit } from "@tabler/icons";
import { validatePesel } from "../../helpers/utils";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handleEdit,
}: {
  item: IPhotoAlbum;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
  handleEdit: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);

  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APIPhotoAlbum>({
    initialValues: {
      albumName: item.albumName,
      groupId: item.group.id,
    },
    validate: {
      albumName: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  function editDetailsItem() {
    handleEdit();
    handleClose();
  }

  function goBackToList() {
    handleClose();
  }

  return (
    <>
      <Modal
        size={600}
        opened={open2}
        onClose={() => handleClose()}
        title="Photo album details"
      >
        <form>
          <TextInput
            disabled
            required
            mb={12}
            label="Album name"
            placeholder="enter name"
            {...form.getInputProps("albumName")}
          />

          <TextInput
            disabled
            mb={12}
            label="Zip code"
            placeholder="zip code"
            {...form.getInputProps("address.zipCode")}
          />

          <Space h="lg" />
          <Button
            type="button"
            leftIcon={<IconEdit size={14} />}
            onClick={editDetailsItem}
            mr={"sm"}
          >
            Edit photo album
          </Button>
          <Button
            type="button"
            leftIcon={<IconArrowBack size={14} />}
            onClick={goBackToList}
          >
            Go back to list
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default DetailsModal;
