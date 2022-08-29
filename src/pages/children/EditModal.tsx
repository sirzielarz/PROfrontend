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
import { APIChild, IChild } from "../../interfaces/Entities";
import { IconDeviceFloppy } from "@tabler/icons";

function EditModal({
  item,
  mutate,
  handleClose,
}: {
  item: IChild;
  mutate: KeyedMutator<IChild[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APIChild>({
    initialValues: {
      name: item.name,
      surname: item.surname,
      pesel: item.pesel,
      address: {
        city: item.address.city,
        street: item.address.street,
        buildingNumber: item.address.buildingNumber,
        flatNumber: item.address.flatNumber,
        zipCode: item.address.zipCode,
      },
    },
    validate: {
      name: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
      surname: (value) =>
        value.length < 2
          ? "enter at least 2 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : null,
    },
  });

  async function editItem(values: APIChild) {
    const updated = await editChild(item.id, values);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        size={600}
        opened={open2}
        onClose={() => handleClose()}
        title="Edit child data"
      >
        <form onSubmit={form.onSubmit(editItem)}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                required
                mb={12}
                label="Name"
                placeholder="enter name"
                {...form.getInputProps("name")}
              />

              <TextInput
                required
                mb={12}
                label="Surname"
                placeholder="enter surname"
                {...form.getInputProps("surname")}
              />

              <TextInput
                required
                mb={12}
                label="Pesel"
                placeholder="pesel"
                {...form.getInputProps("pesel")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                required
                mb={12}
                label="City"
                placeholder="city"
                {...form.getInputProps("address.city")}
              />
              <TextInput
                mb={12}
                label="Street"
                placeholder="street"
                {...form.getInputProps("address.street")}
              />
              <TextInput
                required
                mb={12}
                label="Building number"
                placeholder="building number"
                {...form.getInputProps("address.buildingNumber")}
              />
              <TextInput
                mb={12}
                label="Flat number"
                placeholder="flat number"
                {...form.getInputProps("address.flatNumber")}
              />
              <TextInput
                mb={12}
                label="Zip code"
                placeholder="zip code"
                {...form.getInputProps("address.zipCode")}
              />
            </Grid.Col>
          </Grid>

          <Space h="lg" />
          <Button type="submit" leftIcon={<IconDeviceFloppy />}>
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
