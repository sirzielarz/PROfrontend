import { createStyles, Title, Text, Container, Image } from "@mantine/core";

import imagefront from "./../../src/images/image.jpg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 20,
    paddingBottom: 40,

    "@media (max-width: 755px)": {
      paddingTop: 40,
      paddingBottom: 40,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      // textAlign: "left",
    },
  },

  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      // textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            #
          </Text>
          kinder{""}
          <Text component="span" className={classes.highlight} inherit>
            garten
          </Text>{" "}
          <Text component="span" className={classes.highlight} inherit>
            #
          </Text>
          app
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            ...everything you need in your kindergarten...
          </Text>
        </Container>
        <Image mt={"lg"} src={imagefront} />
      </div>
    </Container>
  );
}
