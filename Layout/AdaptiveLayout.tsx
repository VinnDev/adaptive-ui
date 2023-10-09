import type { ReactNode } from "react";

interface AdaptiveLayoutProps {
  children: ReactNode;
}

export const AdaptiveLayout = ({ children }: AdaptiveLayoutProps) => {
  console.log(children);

  return <div>{children}</div>;
};
