import { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useForm } from "@mantine/form";
import { Button, Loader, Modal, Select, Space } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
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
} from "../../interfaces/Entities";
import { sortByValueToSelect } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";
import { IconDeviceFloppy } from "@tabler/icons";
import { DatePicker } from "@mantine/dates";
import { resourceLimits } from "worker_threads";

function EditChildrenModal({
  //item,
  entryId,
  mutate,
  handleClose,
}: {
  //item: IAuthorizationToPickup;
  entryId: number;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [itemEntry, setItemEntry] = useState<IAuthorizationToPickup>();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    getAuthorizationToPickupEntry(entryId)
      .then((result: IAuthorizationToPickup) => {
        setItemEntry(result);
        console.log("-----result", result);
      })
      .catch((error) => {
        console.log("---error---", error);
      });
    setReady(true);
  }, []);

  interface CustomFormValues {
    childId: number;
    authorizationDateFrom: Date;
    authorizationDateTo: Date;
  }

  //form
  const form = useForm<CustomFormValues>({
    initialValues: {
      childId: Number(itemEntry.child.id),
      authorizationDateFrom: itemEntry.authorizationDateFrom,
      authorizationDateTo: itemEntry.authorizationDateTo,
    },

    validate: {
      authorizationDateTo: (value, values) =>
        value <= values.authorizationDateFrom
          ? "Date to cannot be earlier than date from"
          : null,
    },
  });
  //form submit function
  async function editGroupEntries(valuesFromForm: CustomFormValues) {
    // console.log("valueeeeeees:", valuesFromForm);

    const valuesToAdd: APIAuthorizationToPickup = {
      childId: Number(itemEntry.child.id),
      authorizationDateFrom: itemEntry.authorizationDateFrom,
      authorizationDateTo: itemEntry.authorizationDateTo,
      authorizedPersonId: itemEntry.authorizedPerson.id,
    };

    console.log("valuesToAdd:", valuesToAdd);

    const updated = await addAuthorizationToPickupEntry(valuesToAdd);
    mutate(updated);
    form.reset();
    handleClose();
  }

  console.log("itemEntry", itemEntry);

  // //get all children data with swr
  const { data: allItems, error: errorItems } = useSWR<IPerson[], string>(
    `${process.env.REACT_APP_URL}/api/child`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems) return <div>Failed to load children to pickup data...</div>;
  //iterate

  interface IItemsChild {
    id: string;
    value: string;
    label: string;
    disabled: boolean;
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit children to pickup"
      >
        {ready && allItems ? (
          <>
            <form onSubmit={form.onSubmit(editGroupEntries)}>
              <Select
                required
                label="Child"
                placeholder="select child"
                searchable
                nothingFound="No child to choose"
                data={[
                  {
                    value: `${itemEntry?.id}`,
                    label: `${itemEntry?.child.surname} ${itemEntry?.child.name}`,
                  },
                ]}
                value={`${itemEntry?.id}`}
                onChange={setValue}
                {...form.getInputProps("childId")}
              />

              <DatePicker
                required
                placeholder="Date from"
                label="Date from"
                {...form.getInputProps("authorizationDateFrom")}
                withAsterisk
              />

              <DatePicker
                required
                placeholder="Date to"
                label="Date to"
                {...form.getInputProps("authorizationDateTo")}
                withAsterisk
              />

              <Space h={"lg"} />

              <Button type="submit" leftIcon={<IconDeviceFloppy />}>
                Save
              </Button>
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