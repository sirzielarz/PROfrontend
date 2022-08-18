import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Code,
  createStyles,
  Group,
  Navbar,
  NavbarProps,
  NavLink,
} from "@mantine/core";
import GlobalContext from "../helpersx/GlobalContext";
import useAuth from "../apix/useAuth";

import { IconLogout, IconLogin, IconHome, IconUsers } from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

// const data = [
//   { link: "", label: "Notifications", icon: IconBellRinging },
//   { link: "", label: "Billing", icon: IconReceipt2 },
// ];

function NavbarComponent(props: Omit<NavbarProps, "children">) {
  const location = useLocation();
  const { user, signout } = useAuth();
  useEffect(() => {
    console.log("useEffect from navbar");
  }, [user]);
  const context = useContext(GlobalContext);

  const { classes /*cx*/ } = useStyles();
  //  const [active, setActive] = useState("Billing");

  // const links = data.map((item) => (
  //   <a
  //     className={cx(classes.link, {
  //       [classes.linkActive]: item.label === active,
  //     })}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(item.label);
  //       if (context) {
  //         context.setOpened(false); //close burger menu
  //       }
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </a>
  // ));

  function clickHandler(event: any) {
    if (context) {
      context.setOpened(false); //close burger menu
    }
  }

  return (
    <Navbar {...props} height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section>
        <Code sx={{ fontWeight: 700 }}>
          {user ? user.email : "welcome guest"}
        </Code>
      </Navbar.Section>
      {user ? (
        <>
          <Navbar.Section>
            <Group className={classes.header} position="apart"></Group>
            <NavLink
              label="Home"
              key="/"
              icon={<IconHome />}
              component={Link}
              to="/"
              active={location.pathname === "/"}
              onClick={clickHandler}
            />
            {/* {admin links start} */}
            {user.roles?.includes("admin") ? (
              <>
                <NavLink
                  label="Teachers"
                  key="/teachers"
                  icon={<IconUsers />}
                  component={Link}
                  to="/teachers"
                  active={location.pathname === "/teachers"}
                  onClick={clickHandler}
                />
                <NavLink
                  label="Groups"
                  key="/groups"
                  icon={<IconUsers />}
                  component={Link}
                  to="/groups"
                  active={location.pathname === "/groups"}
                  onClick={clickHandler}
                />
              </>
            ) : (
              <></>
            )}
            {/* {admin links end} */}
            {/* {teachers and admin links start} */}
            {user.roles?.includes("teacher") ||
            user.roles?.includes("admin") ? (
              <>
                <NavLink
                  label="Parents"
                  key="/parents"
                  icon={<IconUsers />}
                  component={Link}
                  to="/parents"
                  active={location.pathname === "/parents"}
                  onClick={clickHandler}
                />
                <NavLink
                  label="Children"
                  key="/children"
                  icon={<IconUsers />}
                  component={Link}
                  to="/children"
                  active={location.pathname === "/children"}
                  onClick={clickHandler}
                />
              </>
            ) : (
              <></>
            )}
            {/* {teachers and admins links end} */}
          </Navbar.Section>
        </>
      ) : (
        <>
          <Navbar.Section>
            <Group className={classes.header} position="apart"></Group>
            <NavLink
              label="Login"
              key="/login"
              icon={<IconLogin />}
              component={Link}
              to="/login"
              active={location.pathname === "/login"}
              onClick={clickHandler}
            />
          </Navbar.Section>
        </>
      )}

      {user ? (
        <>
          <Navbar.Section className={classes.footer}>
            <a
              href="/"
              className={classes.link}
              onClick={(e: any) => {
                signout();
                clickHandler(e);
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </>
      ) : (
        ""
      )}
    </Navbar>
  );
}

export default NavbarComponent;
