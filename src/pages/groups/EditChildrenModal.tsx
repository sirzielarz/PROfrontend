import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Modal, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import {
  addGroupEntry,
  deleteGroupEntry,
  getGroupEntries,
} from "../../api/index";
import { IGroup, IGroupEntry, IPerson } from "../../interfaces/Entities";

import { TransferList, TransferListData } from "@mantine/core";
import { fetcher } from "../../api/fetch";
import { IsDataURI } from "class-validator";

const initialValues: TransferListData = [
  [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ],
  [{ value: "sv", label: "Svelte" }],
];
export interface IMultiselect {
  id: string;
  value: string;
}
function EditChildrenModal({
  item,
  mutate,
  handleClose,
}: {
  item: IGroup;
  mutate: KeyedMutator<IGroup[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal

  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>(); //inital data to set current ids state
  const [initialSelection, setInitialSelection] = useState();
  const [dataList, setDataList] = useState<TransferListData>(initialValues); //for mantine transfer list
  //state for selectiong with Chips
  const [selected, setSelected] = useState<string[]>();

  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  useEffect(() => {
    console.log("setting current items");
  }, [initialData]);

  const form = useForm({
    initialValues: {
      groupName: item.groupName,
    },
  });

  async function editGroupEntries(values: { groupName: string }) {
    console.log("submitted");
    // const updated = await editGroupName(item.id, values.groupName);
    // mutate(updated);
    // form.reset();
    // handleClose();
  }

  //get groupEntry values
  const {
    data: groupEntry,
    error: errorGroupEntry,
    mutate: mutateGroupEntry,
  } = useSWR<IGroupEntry[], string>(
    `${process.env.REACT_APP_API}/group-entry`,
    fetcher
  );

  // filter group entry values for this group only
  let result = groupEntry?.filter((el) => el.kindergartenGroup.id === item.id);
  //console.log("group entries from current group:  ", result);
  let selectedChildren = result?.map((x) => {
    return { id: x.child.id, value: `${x.child.name} ${x.child.surname}` };
  });
  console.log("array of children selected", selectedChildren);
  let selectedIDs = selectedChildren?.map((x) => String(x.id));
  console.log("selectedIDs", selectedIDs);
  setInitialData(selectedIDs);

  //get all children data
  //get groupEntry values
  const {
    data: childrenValues,
    error: errorChildren,
    mutate: mutateChildrenValues,
  } = useSWR<IPerson[], string>(`${process.env.REACT_APP_API}/child`, fetcher);
  console.log("all children data", childrenValues);
  let allChildrenData = childrenValues?.map((x) => {
    return { id: `${x.id}`, value: `${x.name} ${x.surname}` };
  });
  console.log("allChildrenDataPrepared", allChildrenData);

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Edit children in group"
      >
        <form onSubmit={form.onSubmit(editGroupEntries)}>
          {/* <TextInput
            required
            mb={12}
            label="Group name"
            placeholder="Enter group name"
            {...form.getInputProps("groupName")}
          /> */}

          {/* @todo variant 1
          https://mantine.dev/core/chip/ */}
          <Chip.Group
            value={selected}
            onChange={setSelected}
            {...form.getInputProps("testxd")}
            position="center"
            multiple={true}
            mt={20}
            mb={30}
          >
            {/*  */}
            {childrenValues?.map((x) => {
              return (
                //@todo - onclick types doesn't match

                <Chip value={String(x.id)} key={String(x.id)}>
                  {x.surname + " " + x.name}
                </Chip>
              );
            })}
          </Chip.Group>

          {/* @todo variant 2
          https://mantine.dev/core/transfer-list/ */}

          <TransferList
            value={dataList}
            onChange={setDataList}
            searchPlaceholder="Search..."
            nothingFound="Nothing here"
            titles={["In group", "Over group"]}
            showTransferAll={false}
            breakpoint="sm"
          />
          {/*  @todo after submit submit call
          
          get users to delete from current group and fire deleteGroupEntry 

          and add users to 
          
          */}

          <Button type="submit">Edit group</Button>
        </form>
      </Modal>
    </>
  );
}

export default EditChildrenModal;
