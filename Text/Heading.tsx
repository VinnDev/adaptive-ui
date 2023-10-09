import classes from "./Heading.module.css";

import { Title } from "@mantine/core";

interface HeadingProps {
  text: string;
  highlight?: string;
}

export const Heading = ({ text, highlight }: HeadingProps) => {
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
