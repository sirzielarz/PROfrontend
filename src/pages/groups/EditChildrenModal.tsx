import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Loader, Modal, Space, TextInput } from "@mantine/core";
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

function getSelectedData() {
  return ["5", "6"];
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
  const [mounted, setMounted] = useState(false);

  const [open2, setOpen2] = useState(false); //setting modal open state
  const [initialData, setInitialData] = useState<string[]>(); //inital data to set current ids state
  const [dataList, setDataList] = useState<TransferListData>(initialValues); //for mantine transfer list
  //state for selectiong with Chips
  const [selected, setSelected] = useState<string[]>();

  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    // if (!selectedIDs) {
    //   setSelected(selectedIDs);
    //   console.log("setting current items");
    // } else {
    //   console.log("in hook effect but not setting anything");
    // }

    console.log("current selected IDs:", selected);
  }, [selected]);

  const form = useForm({
    initialValues: {
      groupName: item.groupName,
      formSelectedIDs: selected,
    },
  });

  async function editGroupEntries(values: {
    groupName: string;
    formSelectedIDs: string[] | undefined;
  }) {
    console.log("submitted");
    console.log(values);
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
  } = useSWR<IPerson[], string>(
    mounted ? `${process.env.REACT_APP_API}/child` : null,
    fetcher
  );
  let allChildrenData = childrenValues?.map((x) => {
    return { id: `${x.id}`, value: `${x.name} ${x.surname}` };
  });
  console.log("allChildrenDataPrepared", allChildrenData);

  async function GetCurrentSelections() {
    //get groupEntry values
    const {
      data: groupEntry,
      error: errorGroupEntry,
      mutate: mutateGroupEntry,
    } = useSWR<IGroupEntry[], string>(
      mounted ? `${process.env.REACT_APP_API}/group-entry` : null,
      fetcher
    );
    // filter group entry values for this group only
    let result = groupEntry?.filter(
      (el) => el.kindergartenGroup.id === item.id
    );
    //console.log("group entries from current group:  ", result);
    let selectedChildren = result?.map((x) => {
      return { id: x.child.id, value: `${x.child.name} ${x.child.surname}` };
    }); //array of children selected
    let selectedIDs = selectedChildren?.map((x) => String(x.id));
    console.log("selectedIDs", selectedIDs);
    setSelected(selectedIDs);
    // if (error) return "An error has occurred.";
    // if (!data) return "Loading...";
    if (errorGroupEntry) return <div>Failed to load group entries...</div>;
    if (!groupEntry) return <Loader></Loader>;
    return [];
  }

  if (errorChildren) return <div>Failed to load children data...</div>;

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
            {...form.getInputProps("formSelectedIDs")}
            position="center"
            multiple={true}
            mt={20}
            mb={30}
          >
            {/*  */}
            {allChildrenData?.map((x) => {
              return (
                //@todo - onclick types doesn't match

                <Chip value={String(x.id)} key={String(x.id)}>
                  {x.value}
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
