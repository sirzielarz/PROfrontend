import { useForm } from "@mantine/form";
import { Text, Paper, PaperProps, Container } from "@mantine/core";

const MissingPathPage = (props: PaperProps) => {
  return (
    <Container size="xs" px="xs">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Not found page
        </Text>
      </Paper>
    </Container>
  );
};
export default MissingPathPage;
