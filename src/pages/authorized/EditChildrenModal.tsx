import { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useForm } from "@mantine/form";
import { Button, Group, Loader, Modal, Select, Space } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import "dayjs/locale/pl";
import {
  getAuthorizationToPickupEntries,
  addAuthorizationToPickupEntry,
  updateAuthorizationToPickupEntry,
  deleteAuthorizationToPickupEntry,
  getAuthorizationToPickupEntry,
} from "../../api/authorization-to-pickup/index";
import {
  IAuthorizedPerson,
  IPerson,
  IAuthorizationToPickup,
  APIAuthorizationToPickup,
  AuthorizationChildToPickUpDTO,
} from "../../interfaces/Entities";
import { sortByValueToSelect } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { DatePicker } from "@mantine/dates";
import { resourceLimits } from "worker_threads";
import { formatNamedParameters } from "sequelize/types/utils";

function EditChildrenModal({
  item,
  childItem,
  mutate,
  handleClose,
}: {
  item: IAuthorizedPerson;
  childItem: AuthorizationChildToPickUpDTO;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [itemEntry, setItemEntry] = useState<IAuthorizedPerson>();
  const [stateChildItem, setStateChildItem] =
    useState<AuthorizationChildToPickUpDTO>();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setItemEntry(item);
    setStateChildItem(childItem);

    console.log("start item", item);
    console.log("start childItem", childItem);
    //setValue(String(childItem.child.id));
    // onChangeFrom(new Date(childItem.authorizationDateFrom));
    // onChangeTo(new Date(childItem.authorizationDateTo));

    // form.setFieldValue(
    //   "authorizationDateFrom",
    //   new Date(childItem.authorizationDateFrom)
    // );

    // form.setFieldValue(
    //   "authorizationDateTo",
    //   new Date(childItem.authorizationDateTo)
    // );

    setReady(true);
  }, []);

  interface CustomFormValues {
    childId: string;
    authorizationDateFrom: Date;
    authorizationDateTo: Date;
  }

  //form
  const form = useForm<CustomFormValues>({
    initialValues: {
      childId: String(childItem.child.id),
      authorizationDateFrom: new Date(childItem.authorizationDateFrom),
      authorizationDateTo: new Date(childItem.authorizationDateTo),
    },

    validate: {
      authorizationDateTo: (value, values) =>
        value <= values.authorizationDateFrom
          ? "Date to cannot be earlier than date from"
          : null,
    },
  });

  //form delete

  async function deleteItem() {
    const updated = await deleteAuthorizationToPickupEntry(childItem.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  //form submit function
  async function editGroupEntries(valuesFromForm: CustomFormValues) {
    const valuesToUpdate: APIAuthorizationToPickup = {
      childId: Number(valuesFromForm.childId),
      authorizationDateFrom: valuesFromForm.authorizationDateFrom,
      authorizationDateTo: valuesFromForm.authorizationDateTo,
      authorizedPersonId: item.id,
    };
    const idEntry = childItem.id;
    const updated = await updateAuthorizationToPickupEntry(
      idEntry,
      valuesToUpdate
    );
    mutate(updated);
    form.reset();
    handleClose();
  }
  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit children to pickup"
      >
        {ready ? (
          <>
            <form onSubmit={form.onSubmit(editGroupEntries)}>
              <Select
                required
                label="Child"
                placeholder="select child"
                // searchable
                nothingFound="No child to choose"
                data={[
                  {
                    value: `${childItem.child.id}`,
                    label: `${childItem.child.surname} ${childItem.child.name}`,
                  },
                ]}
                defaultValue={`${childItem.child.id}`}
                readOnly
                {...form.getInputProps("childId")}
              />

              <DatePicker
                locale="pl"
                required
                placeholder="Date from"
                label="Date from"
                withAsterisk
                {...form.getInputProps("authorizationDateFrom")}
              />

              <DatePicker
                locale="pl"
                required
                placeholder="Date to"
                label="Date to"
                withAsterisk
                {...form.getInputProps("authorizationDateTo")}
              />

              <Space h={"lg"} />
              <Group>
                <Button type="submit" leftIcon={<IconDeviceFloppy />}>
                  Save
                </Button>

                <Button
                  leftIcon={<IconTrash />}
                  color="red"
                  onClick={deleteItem}
                >
                  Delete entry
                </Button>
              </Group>
            </form>
          </>
        ) : (
          <>
            <Loader></Loader>
          </>
        )}
      </Modal>
    </>
  );
}

export default EditChildrenModal;
