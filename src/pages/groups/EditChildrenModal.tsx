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
    // visual bug fix in mantine modal
    setOpen2(true);
  }, []);
  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>([]); //inital data to remember inital state
  const [selected, setSelected] = useState<string[]>([]); //state for selectiong with Chips

  useEffect(() => {
    console.log("startting", selected);

    getGroupEntries()
      .then((entries: IGroupEntry[]) => {
        let result = entries.filter(
          (el) => el.kindergartenGroup.id === item.id
        );
        let selectedChildren = result?.map((x) => {
          return {
            id: x.child.id,
            value: `${x.child.name} ${x.child.surname}`,
          };
        });
        let selectedIDs = selectedChildren?.map((x) => String(x.id));
        setSelected(selectedIDs);
        setInitialData(selectedIDs);
        form.setFieldValue("formSelectedIDs", selectedIDs);
      })
      .catch((error) => {
        console.log("---error---", error);
      });

    console.log("startting2", selected);
  }, []);

  const form = useForm({
    initialValues: {
      groupName: item.groupName,
      formSelectedIDs: selected,
    },
  });

  async function editGroupEntries(values: {
    groupName: string;
    formSelectedIDs: string[];
  }) {
    console.log("formSelectedIDs", values.formSelectedIDs);
    console.log("initalData", initialData);
    const toRemove: string[] = initialData.filter(
      (el) => !values.formSelectedIDs.includes(el)
    );
    console.log("toRemove", toRemove);
    const toAdd: string[] = values.formSelectedIDs.filter(
      (el) => !initialData.includes(el)
    );
    console.log("toRemove", toRemove);
    console.log("toAdd", toAdd);

    // toAdd.map((x) => {
    //   const updated = addGroupEntry(Number(x), item.id);
    //   mutate(updated);
    // });

    // form.reset();
    // handleClose();
    // const updated = await editGroupName(item.id, values.groupName);
    // mutate(updated);
    // form.reset();
    // handleClose();
  }

  //get all children data
  //get groupEntry values
  const {
    data: childrenValues,
    error: errorChildren,
    mutate: mutateChildrenValues,
  } = useSWR<IPerson[], string>(`${process.env.REACT_APP_API}/child`, fetcher);
  let allChildrenData = childrenValues?.map((x) => {
    return { id: `${x.id}`, value: `${x.name} ${x.surname}` };
  });

  // async function GetCurrentSelections() {
  //   //get groupEntry values
  //   const {
  //     data: groupEntry,
  //     error: errorGroupEntry,
  //     mutate: mutateGroupEntry,
  //   } = useSWR<IGroupEntry[], string>(
  //     mounted ? `${process.env.REACT_APP_API}/group-entry` : null,
  //     fetcher
  //   );
  //   // filter group entry values for this group only
  //   let result = groupEntry?.filter(
  //     (el) => el.kindergartenGroup.id === item.id
  //   );
  //   //console.log("group entries from current group:  ", result);
  //   let selectedChildren = result?.map((x) => {
  //     return { id: x.child.id, value: `${x.child.name} ${x.child.surname}` };
  //   }); //array of children selected
  //   let selectedIDs = selectedChildren?.map((x) => String(x.id));
  //   console.log("selectedIDs", selectedIDs);

  //   if (errorGroupEntry) return <div>Failed to load group entries...</div>;
  //   if (!groupEntry) return <Loader></Loader>;
  //   return selectedIDs;
  // }

  if (errorChildren) return <div>Failed to load children data...</div>;

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit children in group"
      >
        <form onSubmit={form.onSubmit(editGroupEntries)}>
          {/* <div className="jsonout">{JSON.stringify(selected, null, 4)}</div>
          <div className="jsonout">
            {JSON.stringify(allChildrenData, null, 4)}
          </div> */}

          <Chip.Group
            multiple={true}
            value={selected}
            // onChange={setSelected}
            {...form.getInputProps("formSelectedIDs")}
            position="center"
            mt={20}
            mb={30}
          >
            {/*  */}
            {allChildrenData?.map((x) => {
              return <Chip value={String(x.id)}>{x.value}</Chip>;
            })}
          </Chip.Group>
          <Button type="submit">Edit group</Button>
        </form>
      </Modal>
    </>
  );
}

export default EditChildrenModal;
