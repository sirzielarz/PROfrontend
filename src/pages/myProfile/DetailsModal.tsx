import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Modal,
  Space,
  TextInput,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { APIParentPUT, IParent } from "../../interfaces/Entities";
import {
  IconArrowBack,
  IconEdit,
  IconLock,
  IconLockAccess,
} from "@tabler/icons";

function DetailsModal({
  item,
  mutate,
  handleClose,
  handlePassword,
  handleEdit,
}: {
  item: IParent;
  mutate: KeyedMutator<IParent>;
  handleClose: () => void;
  handlePassword: () => void;
  handleEdit: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);

  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm<APIParentPUT>({
    initialValues: {
      name: item.name,
      surname: item.surname,
      email: item.email,
      identityDocumentNumber: item.identityDocumentNumber,
      phoneNumber: item.phoneNumber,
      bankAccountNumber: item.bankAccountNumber,
      address: {
        city: item.address.city,
        street: item.address.street,
        buildingNumber: item.address.buildingNumber,
        flatNumber: item.address.flatNumber,
        zipCode: item.address.zipCode,
        isWorkAddress: item.address.isWorkAddress,
      },
    },
    validate: {
      email: (value: string) =>
        value.length < 5
          ? "enter at least 5 characters"
          : value.length > 50
          ? "enter max 50 characters"
          : /^\S+@\S+$/.test(value)
          ? null
          : "invalid email",
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
      phoneNumber: (value) =>
        value.length < 9
          ? "enter at least 9 characters"
          : value.length > 15
          ? "enter max 15 characters"
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
      <Container>
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
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
              <TextInput
                disabled
                required
                mb={12}
                label="Identity document number"
                placeholder="identity document number"
                {...form.getInputProps("identityDocumentNumber")}
              />
              <TextInput
                disabled
                required
                mb={12}
                label="Phone number"
                placeholder="phone number"
                {...form.getInputProps("phoneNumber")}
              />
              <TextInput
                disabled
                mb={12}
                label="Bank account number"
                placeholder="bank account number"
                {...form.getInputProps("bankAccountNumber")}
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
              <Checkbox
                disabled
                mt="md"
                label="Is work Address ?"
                {...form.getInputProps("address.isWorkAddress", {
                  type: "checkbox",
                })}
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
            Edit data
          </Button>
          <Button
            type="button"
            leftIcon={<IconLock size={14} />}
            onClick={handlePassword}
          >
            Change password
          </Button>
        </form>
      </Container>
    </>
  );
}

export default DetailsModal;
