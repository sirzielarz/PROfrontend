import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Grid, Modal, Space, TextInput } from "@mantine/core";
import { KeyedMutator } from "swr";

import { APIChild, IChild } from "../../interfaces/Entities";
import { IconArrowBack, IconEdit } from "@tabler/icons";
import { validatePesel } from "../../helpers/utils";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handleEdit,
}: {
  item: IChild;
  mutate: KeyedMutator<IChild[]>;
  handleClose: () => void;
  handleEdit: () => void;
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
      birthDate: item.birthDate,
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
      pesel: (value) =>
        value.length !== 11
          ? "pesel must have 11 characters"
          : !/^\d+$/.test(value)
          ? "pesel should contain only digits"
          : !validatePesel(value)
          ? "pesel is invalid"
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
        title="Child details"
      >
        <form>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                disabled
                required
                mb={12}
                label="Name"
                placeholder="enter name"
                {...form.getInputProps("name")}
              />

              <TextInput
                disabled
                required
                mb={12}
                label="Surname"
                placeholder="enter surname"
                {...form.getInputProps("surname")}
              />

              <TextInput
                disabled
                required
                mb={12}
                label="Pesel"
                placeholder="pesel"
                {...form.getInputProps("pesel")}
              />
              <TextInput
                disabled
                required
                mb={12}
                label="Birth date"
                placeholder="birthDate"
                {...form.getInputProps("birthDate")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                disabled
                required
                mb={12}
                label="City"
                placeholder="city"
                {...form.getInputProps("address.city")}
              />
              <TextInput
                disabled
                mb={12}
                label="Street"
                placeholder="street"
                {...form.getInputProps("address.street")}
              />
              <TextInput
                disabled
                required
                mb={12}
                label="Building number"
                placeholder="building number"
                {...form.getInputProps("address.buildingNumber")}
              />
              <TextInput
                disabled
                mb={12}
                label="Flat number"
                placeholder="flat number"
                {...form.getInputProps("address.flatNumber")}
              />
              <TextInput
                disabled
                mb={12}
                label="Zip code"
                placeholder="zip code"
                {...form.getInputProps("address.zipCode")}
              />
            </Grid.Col>
          </Grid>

          <Space h="lg" />
          <Button
            type="button"
            leftIcon={<IconEdit size={14} />}
            onClick={editDetailsItem}
            mr={"sm"}
          >
            Edit child
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
