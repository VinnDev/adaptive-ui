import classes from "./Footer.module.css";
import { Anchor, Group, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface FooterProps {
  logo: ReactNode;
  links?: { url: string; label: string }[];
}

export const Footer = ({ logo, links }: FooterProps) => {
  return (
    <Group className={classes.footer}>
      <Title order={2} className={classes.title}>
        {logo}
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
