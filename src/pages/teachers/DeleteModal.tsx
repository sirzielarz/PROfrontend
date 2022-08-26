import { useLayoutEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal } from "@mantine/core";
import { KeyedMutator } from "swr";
import { deleteTeacher } from "../../api/teacher/index";
import { ITeacher } from "../../interfaces/Entities";

function DeleteModal({
  item,
  mutate,
  handleClose,
}: {
  item: ITeacher;
  mutate: KeyedMutator<ITeacher[]>;
  handleClose: () => void;
}) {
  // visual bug fix in mantine modal
  const [open2, setOpen2] = useState(false);
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const form = useForm({
    initialValues: {
      name: item.name,
    },
  });

  async function deleteItem() {
    const updated = await deleteTeacher(item.id);
    mutate(updated);
    form.reset();
    handleClose();
  }

  return (
    <>
      <Modal
        opened={open2}
        onClose={() => handleClose()}
        title="Delete teacher"
      >
        You are going to delete teacher:<b> {item.surname + " " + item.name}</b>
        .<br></br> Are you sure about that?
        <br />
        <Button color="red" onClick={deleteItem}>
          Delete {item.surname + " " + item.name}
        </Button>
      </Modal>
    </>
  );
}

export default DeleteModal;
