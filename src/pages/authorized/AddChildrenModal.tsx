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
import { prepareDate } from "./../../helpers/utils";

function AddChildrenModal({
  item,
  mutate,
  handleClose,
}: {
  item: IAuthorizedPerson;
  mutate: KeyedMutator<IAuthorizedPerson[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [itemEntriesIDs, setItemEntriesIDs] =
    useState<IAuthorizationToPickup[]>();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    getAuthorizationToPickupEntries()
      .then((entries: IAuthorizationToPickup[]) => {
        let result = entries.filter((el) => el.authorizedPerson.id === item.id);
        setItemEntriesIDs(result);
        let selectedItems = result?.map((x) => {
          return {
            id: x.child.id,
            value: `${x.child.name} ${x.child.surname}`,
            idEntry: x.id,
          };
        });
        let selectedIDs = selectedItems?.map((x) => String(x.id));
        setSelected(selectedIDs);
      })
      .catch((error) => {
        console.log("---error---", error);
      });
    setReady(true);
  }, []);

  interface CustomFormValues {
    childId: string;
    authorizationDateFrom: Date;
    authorizationDateTo: Date;
  }

  //form
  const form = useForm<CustomFormValues>({
    validate: {
      authorizationDateTo: (value, values) =>
        value <= values.authorizationDateFrom
          ? "Date to cannot be earlier than date from"
          : null,
    },
  });
  //form submit function
  async function editGroupEntries(valuesFromForm: CustomFormValues) {
    const valuesToAdd: APIAuthorizationToPickup = {
      childId: Number(valuesFromForm.childId),
      authorizationDateFrom: prepareDate(valuesFromForm.authorizationDateFrom),
      authorizationDateTo: prepareDate(valuesFromForm.authorizationDateTo),
      authorizedPersonId: item.id,
    };

    console.log("valuesToAdd:", valuesToAdd);

    const updated = await addAuthorizationToPickupEntry(valuesToAdd);
    mutate(updated);
    form.reset();
    handleClose();
  }

  //get all children data with swr
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

  let allItemsData = allItems?.map((x) => {
    return {
      value: `${x.id}`,
      label: `${x.surname} ${x.name}`,
      disabled: selected.includes(String(x.id)),
    };
  });
  //sort items data
  allItemsData?.sort(sortByValueToSelect);

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Add children to pickup"
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
                data={allItemsData}
                value={value}
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

export default AddChildrenModal;
