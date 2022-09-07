import { Alert, Chip, Text, Space } from "@mantine/core";
import { IPerson } from "../../interfaces/Entities";

interface ChildrenProps {
  childSelected: string;
  setChildSelected: (arg: string) => void;
  listOfChildren: IPerson[];
}
export const ChildrenList: React.FC<ChildrenProps> = ({
  childSelected,
  setChildSelected,
  listOfChildren,
}) => {
  ////Select child to view details

  if (listOfChildren.length < 1) {
    return <Alert>No children exist</Alert>;
  } else {
    return (
      <>
        <Text size={"sm"} color={"gray"}>
          Select child to view details{" "}
        </Text>
        <Space h={"md"} />

        <Chip.Group
          multiple={false}
          value={childSelected}
          defaultValue={childSelected}
          onChange={setChildSelected}
        >
          {listOfChildren.map((x) => (
            <Chip key={"child_" + x.id} value={String(x.id)}>
              {x.surname + " " + x.name}
            </Chip>
          ))}
        </Chip.Group>
      </>
    );
  }
};
