import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Loader, Modal, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  getPresenceEntries,
  addPresenceEntry,
  deletePresenceEntry,
} from "../../api/presence/index";
import { IPresence, IGroup } from "../../interfaces/Entities";
import {
  sortByValue,
  formatDateToPattern,
  prepareDate,
} from "./../../helpers/utils";
import { fetcher } from "../../api/fetch";
import { IconDeviceFloppy } from "@tabler/icons";

function EditPresenceModal({
  groupIDSelected,
  groupNameSelected,
  dateSelected,
  dataPresenceFiltered,
  mutate,
  handleClose,
}: {
  groupIDSelected: string;
  groupNameSelected: string;
  dateSelected: Date;
  dataPresenceFiltered: IPresence[];
  mutate: KeyedMutator<IPresence[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>([]); //inital data to remember inital state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [itemEntriesIDs, setItemEntriesIDs] = useState<IPresence[]>();

  useEffect(() => {
    getPresenceEntries()
      .then((entries: IPresence[]) => {
        let result = entries.filter(
          (el) =>
            el.kindergartenGroup.id === Number(groupIDSelected) &&
            formatDateToPattern(el.date) === formatDateToPattern(dateSelected)
        );
        setItemEntriesIDs(result);
        let selectedItems = result?.map((x) => {
          return {
            id: x.child.id,
            value: `${x.child.name} ${x.child.surname}`,
            idGroupEntry: x.id,
          };
        });
        let selectedIDs = selectedItems?.map((x) => String(x.id));
        setSelected(selectedIDs);
        setInitialData(selectedIDs);
        //set values to form
        form.setFieldValue("formSelectedIDs", selectedIDs);
      })
      .catch((error) => {
        console.log("---error---", error);
      });
    setReady(true);
  }, []);
  //form
  const form = useForm({
    initialValues: {
      formSelectedIDs: selected,
    },
  });
  //form submit function
  async function editGroupEntries(values: { formSelectedIDs: string[] }) {
    const toRemove: string[] = initialData.filter(
      (el) => !values.formSelectedIDs.includes(el)
    );
    const toAdd: string[] = values.formSelectedIDs.filter(
      (el) => !initialData.includes(el)
    );

    toAdd.map((x) => {
      const updated = addPresenceEntry(
        Number(groupIDSelected),
        Number(x),
        prepareDate(dateSelected)
      );
      mutate(updated);
    });

    toRemove.map((x) => {
      const entryToDelete = itemEntriesIDs?.filter(
        (el) => el.child.id === Number(x)
      );
      entryToDelete?.map((x) => {
        const updated = deletePresenceEntry(x.id);
        mutate(updated);
      });
    });
    form.reset();
    handleClose();
  }

  //get all children data with swr
  const { data: allItems, error: errorItems } = useSWR<IGroup, string>(
    `${process.env.REACT_APP_URL}/api/group/${groupIDSelected}`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems) return <div>Failed to load children data...</div>;
  //iterate

  console.log();

  interface IItems {
    id: string;
    value: string;
  }
  let allItemsData = allItems.children.map((x) => {
    return { id: `${x.child.id}`, value: `${x.child.surname} ${x.child.name}` };
  });
  // sort items data
  allItemsData?.sort(sortByValue);

  return (
    <Modal
      opened={open2}
      onClose={() => handleClose()}
      title={`Edit presence in group ${groupNameSelected} on ${formatDateToPattern(
        dateSelected
      )}`}
    >
      {ready && allItems ? (
        <>
          <form onSubmit={form.onSubmit(editGroupEntries)}>
            {/* <div className="jsonout">{JSON.stringify(selected, null, 4)}</div> */}
            <Chip.Group
              sx={{ flexDirection: "column" }}
              multiple={true}
              align={"center"}
              value={selected}
              onChange={setSelected}
              {...form.getInputProps("formSelectedIDs")}
              position="center"
              mt={20}
              mb={30}
            >
              {allItemsData?.map((x) => {
                return <Chip value={String(x.id)}>{x.value}</Chip>;
              })}
            </Chip.Group>
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
  );
}

export default EditPresenceModal;
