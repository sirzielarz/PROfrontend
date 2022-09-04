import { useForm } from "@mantine/form";
import {
  Button,
  ButtonProps,
  FileButton,
  Group,
  Modal,
  Space,
  Text,
} from "@mantine/core";
import { KeyedMutator } from "swr";
import { IPhotoAlbum } from "../../interfaces/Entities";
import { IconCirclePlus } from "@tabler/icons";
import { addPhoto } from "../../api/photo";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  RefObject,
  useLayoutEffect,
  useState,
} from "react";

function AddPhotoModal({
  item,
  mutate,
  handleClose,
}: {
  item: IPhotoAlbum;
  mutate: KeyedMutator<IPhotoAlbum[]>;
  handleClose: () => void;
}) {
  useLayoutEffect(() => {
    setOpen2(true);
  }, []);

  const [open2, setOpen2] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm({});

  async function createItem(values: any) {
    const valuesToAPI = {
      id: item.id, //album id
      file: file, //image file
    };

    console.log("values-to-API", valuesToAPI);

    await addPhoto(valuesToAPI)
      .then((response) => {
        console.log("success", response);
        mutate(response);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log(`reseting form closing modal`);
        //form.reset();
        handleClose();
      });
  }

  return (
    <>
      <Modal opened={open2} onClose={() => handleClose()} title="Create photo">
        <form onSubmit={form.onSubmit(createItem)}>
          <>
            <Group position="center">
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(
                  props: JSX.IntrinsicAttributes &
                    ButtonProps & { component?: "button" | undefined } & Omit<
                      Pick<
                        DetailedHTMLProps<
                          ButtonHTMLAttributes<HTMLButtonElement>,
                          HTMLButtonElement
                        >,
                        "key" | keyof ButtonHTMLAttributes<HTMLButtonElement>
                      >,
                      "component" | keyof ButtonProps
                    > & {
                      ref?:
                        | ((instance: HTMLButtonElement | null) => void)
                        | RefObject<HTMLButtonElement>
                        | null
                        | undefined;
                    }
                ) => <Button {...props}>Upload image</Button>}
              </FileButton>
            </Group>
            {file && (
              <Text size="sm" align="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}
          </>

          <Space h={"xl"}></Space>
          <Button
            disabled={file ? false : true}
            type="submit"
            leftIcon={<IconCirclePlus />}
          >
            Add photo
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddPhotoModal;
