import classes from "./Footer.module.css";
import { useDisclosure } from "@mantine/hooks";
import { Anchor, Group, Modal, Title, Button } from "@mantine/core";
import type { ReactNode } from "react";
import DoomGUI from "../DOOM/DoomGUI";

interface FooterProps {
  logo: ReactNode;
  links?: { url: string; label: string; target: string; }[];
}

export const Footer = ({ logo, links }: FooterProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group className={classes.footer}>
      <Title order={2} className={classes.title}>
        <Modal
          size="xl"
          opened={opened}
          onClose={close}
          title="Is this an easter egg?"
        >
          <DoomGUI />
        </Modal>
        <Button variant="light" color="red" radius="md" onClick={open}>
          Don't Click Me
        </Button>
      </Title>
      {links && (
        <Group className={classes.links}>
          {links.map((link, index) => {
            return (
              <Anchor key={index} c="dimmed" className={classes.link}>
                {link.label}
              </Anchor>
            );
          })}
        </Group>
      )}
    </Group>
  );
};
