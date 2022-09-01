import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Loader, Modal } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  getGroupEntries,
  addGroupEntry,
  deleteGroupEntry,
} from "../../api/group-entry/index";
import {
  IActivity,
  IActivityTeacher,
  IGroup,
  IGroupEntry,
  IPerson,
  IPhotoAlbum,
} from "../../interfaces/Entities";
import { sortByValue } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";
import { IconDeviceFloppy } from "@tabler/icons";

function EditGroupsModal({
  item,
  mutate,
  handleClose,
}: {
  item: IPhotoAlbum;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>([]); //inital data to remember inital state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [itemEntriesIDs, setItemsEntriesIDs] = useState<IGroupEntry[]>();

  useEffect(() => {
    getGroupEntries()
      .then((entries: IGroupEntry[]) => {
        let result = entries.filter((el) => el.child.id === item.id);
        setItemsEntriesIDs(result);
        let selectedItems = result?.map((x) => {
          return {
            id: x.kindergartenGroup.id,
            value: `${x.kindergartenGroup.groupName}`,
            idGroupTeacher: x.id,
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
  async function editTeacherGroups(values: { formSelectedIDs: string[] }) {
    const toRemove: string[] = initialData.filter(
      (el) => !values.formSelectedIDs.includes(el)
    );
    const toAdd: string[] = values.formSelectedIDs.filter(
      (el) => !initialData.includes(el)
    );
    toAdd.forEach((x) => {
      const updated = addGroupEntry(Number(x), item.id);
      mutate(updated);
    });
    toRemove.forEach((x) => {
      const entryToDelete = itemEntriesIDs?.filter(
        (el) => el.kindergartenGroup.id === Number(x)
      );
      entryToDelete?.forEach((x) => {
        const updated = deleteGroupEntry(x.id);
        mutate(updated);
      });
    });
    form.reset();
    handleClose();
  }

  //get all children data with swr
  const { data: allItems, error: errorItems } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems) return <div>Failed to load groups data...</div>;

  let allItemsData = allItems?.map((x) => {
    return { id: `${x.id}`, value: `${x.groupName}` };
  });
  //sort items data
  allItemsData?.sort(sortByValue);

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit child's groups"
      >
        {ready && allItems ? (
          <>
            <form onSubmit={form.onSubmit(editTeacherGroups)}>
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
    </>
  );
}

export default EditGroupsModal;
