import { Text, PaperProps, Container, Title, Space } from "@mantine/core";

const MissingPathPage = (props: PaperProps) => {
  return (
    <>
      <Container>
        <Title order={1}>Not found page</Title>
        <Space h="lg" />
        <Text size="md" weight={500}>
          Address you provided is not valid
        </Text>
      </Container>
    </>
  );
};
export default MissingPathPage;
