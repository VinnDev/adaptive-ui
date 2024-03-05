import classes from "./Header.module.css";

import {
  AppShell,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface CustomHeaderProps {
  logo: JSX.Element | string;
  links?: { to: string; url: string; label: string }[];
}

export const Header = ({ logo, links }: CustomHeaderProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const items =
      links &&
      links.map((link) => {
        if (link?.url) return (<a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
         {link.label}
        </a>);
        else return (<a
          key={link.label}
          href={link.to}
          className={classes.link}
        >
         {link.label}
        </a>);
      });
  }

  return (
    <AppShell header={{ height: 60 }} className={classes.wrapper}>
      <AppShell.Header className={classes.header}>
        <Container className={classes.container}>
          <Title order={2}>{logo}</Title>
          <Group className={classes.links}>{items}</Group>
          <Burger
            className={classes.burger}
            opened={opened}
            onClick={toggle}
            size="sm"
          />

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </AppShell.Header>
    </AppShell>
  );
};
