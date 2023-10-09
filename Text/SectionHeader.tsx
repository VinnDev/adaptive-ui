import classes from "./SectionHeader.module.css";

import { Title } from "@mantine/core";

interface SectionHeaderProps {
  text: string;
  highlight?: string;
}

export const SectionHeader = ({ text, highlight }: SectionHeaderProps) => {
  return (
    <Title order={3} className={classes.title}>
      {highlight
        ? text.split(" ").map((word, index) =>
            word.toLowerCase() === highlight.toLowerCase() ? (
              <span key={index} className="highlight">
                {word}
              </span>
            ) : (
              `${word} `
            )
          )
        : text}
    </Title>
  );
};
