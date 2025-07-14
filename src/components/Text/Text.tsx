import { Dynamic } from "solid-js/web";
import type { JSX } from "solid-js/jsx-runtime";

type TextElementTypes =
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "li";

export type TextProps = {
  align?: "left" | "center" | "right" | "justify";
  as?: TextElementTypes;
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
    | "text";
  children: JSX.Element;
  fontSize?:
    | "mini"
    | "small"
    | "text"
    | "header"
    | "large"
    | "extra-large"
    | "jumbo";
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  fontWrap?: "wrap" | "nowrap";
  italic?: boolean;
  lineHeight?: "small" | "medium" | "large";
};

export const Text = (props: TextProps) => {
  return (
    <Dynamic
      component={props.as || "span"}
      style={{
        color: `var(--color-${props.color ?? "text"})`,
        "font-family": "var(--font-family)",
        "font-size": `var(--font-size-${props.fontSize ?? "text"})`,
        "font-style": props.italic ? "italic" : "normal",
        "font-weight": `var(--font-weight-${props.fontWeight ?? "normal"})`,
        "line-height": props.lineHeight
          ? `var(--line-height-${props.lineHeight ?? "medium"})`
          : undefined,
        "text-align": props.align ?? "left",
        "white-space": props.fontWrap === "nowrap" ? "nowrap" : "wrap",
      }}
    >
      {props.children}
    </Dynamic>
  );
};
