import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Chip, Modal, Space, TextInput } from "@mantine/core";
import useSWR, { KeyedMutator } from "swr";
import { addGroupEntry, deleteGroupEntry } from "../../api/index";
import { IGroup, IGroupEntry, IPerson } from "../../interfaces/Entities";

import { TransferList, TransferListData } from "@mantine/core";
import { fetcher } from "../../api/fetch";

const initialValues: TransferListData = [
  [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
  ],
  [{ value: "sv", label: "Svelte" }],
];

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
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      groupName: item.groupName,
    },
  });

  async function editGroupEntries(values: { groupName: string }) {
    // const updated = await editGroupName(item.id, values.groupName);
    // mutate(updated);
    // form.reset();
    // handleClose();
  }

  const [dataList, setDataList] = useState<TransferListData>(initialValues);
  //state for selectiong with Chips
  const [selected, setSelected] = useState(["1", "2", "3"]);

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
  console.log("group entries from current group:  ", result);

  //get all children data
  //get groupEntry values
  const {
    data: childrenValues,
    error: errorChildren,
    mutate: mutateChildrenValues,
  } = useSWR<IPerson[], string>(`${process.env.REACT_APP_API}/child`, fetcher);
  console.log("all children data", childrenValues);

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
            position="center"
            multiple
            mt={20}
            mb={30}
          >
            {/*  */}
            {childrenValues?.map((x) => {
              return (
                //@todo - onclick types doesn't match

                <Chip value={x.id + ""}>{x.surname + " " + x.name}</Chip>
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
