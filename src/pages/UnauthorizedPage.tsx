import {
  Text,
  Paper,
  PaperProps,
  Container,
  Title,
  Space,
} from "@mantine/core";

const UnauthorizedPage = () => {
  return (
    <>
      <Container>
        <Title order={1}>Access denied</Title>
        <Space h="lg" />
        <Text size="md" weight={500}>
          You are not allowed to view this page
        </Text>
      </Container>
    </>
  );
};

export default UnauthorizedPage;
