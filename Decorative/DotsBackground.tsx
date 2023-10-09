import seedrandom from "seedrandom";
import { Dots } from "./Dots";

interface DotsBackgroundProps {
  width: number;
  height: number;
  seed: string;
  count?: number;
}

export const DotsBackground = ({
  width,
  height,
  seed,
  count,
}: DotsBackgroundProps) => {
  const numOfDots = count || Math.floor(height / 200);

  const randNum = (hash: string, min: number, max: number) => {
    return seedrandom(seed + hash)() * (max - min) + min;
  };

  return [...Array(numOfDots)].map((_, index) => {
    const top = randNum(
      `top-${index}`,
      (height / numOfDots) * index,
      (height / numOfDots) * (index + 1) - 200
    );
    const left =
      seedrandom(`${seed}-${index}`)() > 0.5
        ? randNum(`left-${index}`, 0, width * 0.25)
        : randNum(`left-${index}`, width * 0.75, width - 185);

    return <Dots key={index} top={top} left={left} />;
  });
};
