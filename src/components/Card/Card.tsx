import type { JSX } from "solid-js";
import styles from "./Card.module.css";

type CardProps = {
  border?:
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
    | "text";
  bottom?: string;
  children: JSX.Element;
  dropIn?: boolean;
  height?: string;
  left?: string;
  margin?: "small" | "medium" | "large";
  padding?: "mini" | "small" | "medium" | "large";
  position?: "relative" | "absolute";
  right?: string;
  top?: string;
  variant?: "default" | "alternate" | "transparent" | "outlined";
  width?: string;
};

export const Card = (props: CardProps) => {
  return (
    <div
      classList={{
        [styles.card]: true,
        [styles.dropIn]: props.dropIn,
      }}
      style={{
        position: props.position || "relative",
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        margin: props.margin ? `var(--spacing-${props.margin})` : "unset",
        right: props.right,
        "--card-background":
          props.variant === "alternate"
            ? "var(--color-fullbackground)"
            : props.variant === "transparent"
            ? "var(--color-backdrop-invert)"
            : props.variant === "outlined"
            ? "transparent"
            : "var(--color-background)",
        "--card-border":
          props.border || props.variant === "outlined"
            ? `1px solid var(--color-${props.border ?? "text"})`
            : "0px",
        "--card-shadow":
          props.variant === "outlined"
            ? "none"
            : props.variant === "alternate"
            ? "var(--box-shadow-medium)"
            : "var(--box-shadow-small)",
        "--card-height": props.height || "unset",
        "--card-width": props.width || "unset",
        "--card-padding": props.padding
          ? `var(--spacing-${props.padding})`
          : "var(--spacing-medium)",
      }}
    >
      {props.children}
    </div>
  );
};
