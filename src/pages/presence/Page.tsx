import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Chip, Grid, Loader } from "@mantine/core";
import { IGroup } from "../../interfaces/Entities";
import { useState } from "react";

import { sortTeachers, sortChildren } from "../../helpers/utils";
import { Title, Text, Space, Table, Group, ScrollArea } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";

const PresencePage = () => {
  const [groupSelected, setGroupSelected] = useState<IGroup | null>(null);
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [editingChildrenItem, setEditingChildrenItem] = useState<IGroup | null>(
    null
  );
  const [editingTeachersItem, setEditingTeachersItem] = useState<IGroup | null>(
    null
  );
  //get groups
  const { data, error, mutate } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
    fetcher
  );

  //get presence

  const GroupsChips = ({ data }: { data: IGroup[] }) => {
    const chipsItems = data.map((item) => {
      <>
        <Chip key={item.id} value={String(item.id)}>
          {item.groupName}
        </Chip>
      </>;
    });
    // return <Chip.Group>{chipsItems}</Chip.Group>;
  };

  return (
    <Grid>
      <Grid.Col span={2}>
        <Title order={3}>Groups list:</Title>
        <Space h="xl" />

        <></>
      </Grid.Col>
      <Grid.Col span={4}>
        <Title order={3}>Date:</Title>
        <Calendar value={dateSelected} onChange={setDateSelected} />;
        <Space h="xl" />
      </Grid.Col>
      <Grid.Col span={6}>
        <Title order={3}>Presence:</Title>
        <Space h="xl" />
        <Text size={"sm"}>Current group id:</Text>
        <Text size={"sm"}>Current date selected:</Text>
        <Text size={"sm"}>Current group's children list:</Text>
      </Grid.Col>
    </Grid>
  );
};
export default PresencePage;

// const ItemsTable = ({ data }: { data: IGroup[] }) => {
//   const rows = data.map((item) => (
//     <tr key={item.id}>
//       <td key={item.id}>
//         <Group spacing="sm">
//           <div>
//             <Text size="sm" weight={500}>
//               {item.groupName}
//             </Text>
//             <Text color="dimmed" size="xs">
//               ID: {item.id}
//             </Text>
//           </div>
//         </Group>
//       </td>
//       <td key={item.id}>
//         <Text size="sm">
//           {item.teachers?.sort(sortTeachers).map((t, i) => (
//             <Text span key={t.teacher.id}>
//               <>
//                 {`${t.teacher.surname} ${t.teacher.name}`}
//                 {i + 1 < item.teachers?.length ? ", " : ""}
//               </>
//             </Text>
//           ))}
//         </Text>
//         <Text size="xs" color="dimmed">
//           {item.teachers.length
//             ? `Total: ${item.teachers.length}`
//             : "No teachers added"}
//         </Text>
//       </td>
//       <td key={item.id}>
//         <Text size="sm">
//           {item.children?.sort(sortChildren).map((c, i) => (
//             <Text span key={c.child.id}>
//               <>
//                 {`${c.child.surname} ${c.child.name}`}
//                 {i + 1 < item.children?.length ? ", " : ""}
//               </>
//             </Text>
//           ))}
//         </Text>
//         <Text size="xs" color="dimmed">
//           {item.children.length
//             ? `Total: ${item.children.length}`
//             : "No children added"}
//         </Text>
//       </td>
//     </tr>
//   ));
//   return (
//     <ScrollArea>
//       <Table sx={{}} verticalSpacing="md" highlightOnHover>
//         <thead>
//           <tr>
//             <th style={{ textAlign: "left" }}>Name</th>
//             <th style={{ textAlign: "left" }}>Teachers</th>
//             <th style={{ textAlign: "left" }}>Children</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>
//     </ScrollArea>
//   );
// };
