import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Loader, Modal, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  getActivitiesTeachers,
  addActivityTeacher,
  deleteActivityTeacher,
} from "../../api/additional-activity-teacher/index";
import {
  IActivity,
  IActivityTeacher,
  IPerson,
} from "../../interfaces/Entities";
import { sortByValue } from "../../helpers/utils";
import { fetcher } from "../../api/fetch";

function EditTeachersModal({
  item,
  mutate,
  handleClose,
}: {
  item: IActivity;
  mutate: KeyedMutator<IActivity[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true); // visual bug fix in mantine modal
  }, []);
  const [ready, setReady] = useState(false);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>([]); //inital data to remember inital state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips
  const [itemEntriesIDs, setItemEntriesIDs] = useState<IActivityTeacher[]>();

  useEffect(() => {
    getActivitiesTeachers()
      .then((entries: IActivityTeacher[]) => {
        let result = entries.filter(
          (el) => el.additionalActivity.id === item.id
        );
        setItemEntriesIDs(result);
        console.log("result", result);
        let selectedItems = result?.map((x) => {
          return {
            id: x.teacher.id,
            value: `${x.teacher.name} ${x.teacher.surname}`,
            idActivityEntry: x.id,
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
      activityName: item.activityName,
      formSelectedIDs: selected,
    },
  });
  //form submit function
  async function editActivityEntries(values: {
    activityName: string;
    formSelectedIDs: string[];
  }) {
    const toRemove: string[] = initialData.filter(
      (el) => !values.formSelectedIDs.includes(el)
    );
    const toAdd: string[] = values.formSelectedIDs.filter(
      (el) => !initialData.includes(el)
    );
    toAdd.map((x) => {
      const updated = addActivityTeacher(item.id, Number(x));
      mutate(updated);
    });
    toRemove.map((x) => {
      const entryToDelete = itemEntriesIDs?.filter(
        (el) => el.teacher.id === Number(x)
      );
      entryToDelete?.map((x) => {
        const updated = deleteActivityTeacher(x.id);
        mutate(updated);
      });
    });
    form.reset();
    handleClose();
  }

  //get all teachers data with swr
  const { data: allItems, error: errorItems } = useSWR<IPerson[], string>(
    `${process.env.REACT_APP_URL}/api/teacher`,
    fetcher
  );

  if (!allItems) return <Loader></Loader>;
  if (errorItems) return <div>Failed to load teachers data...</div>;
  //iterate

  interface IItems {
    id: string;
    value: string;
  }
  console.log("allItems", allItems);
  let allItemsData = allItems?.map((x) => {
    return { id: `${x.id}`, value: `${x.surname} ${x.name}` };
  });
  //sort items data
  allItemsData?.sort(sortByValue);
  console.log("allItemsData", allItemsData);
  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit teachers in activity"
      >
        {ready && allItems ? (
          <>
            <form onSubmit={form.onSubmit(editActivityEntries)}>
              {
                <div className="jsonout">
                  {/* {JSON.stringify(selected, null, 4)} */}
                </div>
              }
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
              <Button type="submit">Save</Button>
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

export default EditTeachersModal;
