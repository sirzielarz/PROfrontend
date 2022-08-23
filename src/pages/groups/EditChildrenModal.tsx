import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Loader, Modal, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  getGroupEntries,
  addGroupEntry,
  deleteGroupEntry,
} from "../../api/index";
import { IGroup, IGroupEntry, IPerson } from "../../interfaces/Entities";
import { sortByValue } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";

function EditChildrenModal({
  item,
  mutate,
  handleClose,
}: {
  item: IGroup;
  mutate: KeyedMutator<IGroup[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>([]); //inital data to remember inital state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [groupEntriesIDs, setGroupEntriesIDs] = useState<IGroupEntry[]>();

  useEffect(() => {
    getGroupEntries()
      .then((entries: IGroupEntry[]) => {
        let result = entries.filter(
          (el) => el.kindergartenGroup.id === item.id
        );
        setGroupEntriesIDs(result);
        let selectedChildren = result?.map((x) => {
          return {
            id: x.child.id,
            value: `${x.child.name} ${x.child.surname}`,
            idGroupEntry: x.id,
          };
        });
        let selectedIDs = selectedChildren?.map((x) => String(x.id));
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
      groupName: item.groupName,
      formSelectedIDs: selected,
    },
  });
  //form submit function
  async function editGroupEntries(values: {
    groupName: string;
    formSelectedIDs: string[];
  }) {
    const toRemove: string[] = initialData.filter(
      (el) => !values.formSelectedIDs.includes(el)
    );
    const toAdd: string[] = values.formSelectedIDs.filter(
      (el) => !initialData.includes(el)
    );
    toAdd.map((x) => {
      const updated = addGroupEntry(item.id, Number(x));
      mutate(updated);
    });
    toRemove.map((x) => {
      const entryToDelete = groupEntriesIDs?.filter(
        (el) => el.child.id === Number(x)
      );
      entryToDelete?.map((x) => {
        const updated = deleteGroupEntry(x.id);
        mutate(updated);
      });
    });
    form.reset();
    handleClose();
  }

  //get all children data with swr
  const { data: allItems, error: errorItems } = useSWR<IPerson[], string>(
    `${process.env.REACT_APP_API}/child`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems) return <div>Failed to load children data...</div>;
  //iterate

  interface IItems {
    id: string;
    value: string;
  }
  let allItemsData = allItems?.map((x) => {
    return { id: `${x.id}`, value: `${x.surname} ${x.name}` };
  });
  //sort items data
  allItemsData?.sort(sortByValue);

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit children in group"
      >
        {ready && allItems ? (
          <>
            <form onSubmit={form.onSubmit(editGroupEntries)}>
              {/* <div className="jsonout">{JSON.stringify(selected, null, 4)}</div>*/}
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
              <Button type="submit">Save children</Button>
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
