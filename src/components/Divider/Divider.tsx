import { Separator } from "@kobalte/core";
import styles from "./Divider.module.css";

type DividerProps = {
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "error"
    | "gray"
    | "fullwhite"
    | "fullblack"
    | "white"
    | "black"
    | "text"
    | "background"
    | "foreground"
    | "fullbackground"
    | "fullforeground";
  orientation?: "horizontal" | "vertical";
  variant?: "full" | "light";
};

export const Divider = (props: DividerProps) => {
  return (
    <Separator.Root
      class={styles.separator}
      orientation={props.orientation ?? "horizontal"}
      style={{
        "--divider-color": `var(--color-${props.color ?? "gray"})`,
      }}
    />
  );
};
