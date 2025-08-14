import type { JSX } from "solid-js";
import { paddingToCSS } from "./../../styles/themeUtils";

export type FlexProps = {
  alignItems?: "flex-start" | "flex-end" | "center";
  children: JSX.Element;
  direction: "row" | "column";
  gap?: "mini" | "small" | "medium" | "large";
  height?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  padding?: "small" | "medium" | "large";
  paddingX?: "small" | "medium" | "large";
  paddingY?: "small" | "medium" | "large";
  style?: JSX.CSSProperties;
  width?: string;
  wrap?: "wrap" | "nowrap";
};

export const Flex = (props: FlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        "align-items": props.alignItems,
        "flex-direction": props.direction,
        "flex-wrap": props.wrap ?? "nowrap",
        gap: `var(--spacing-${props.gap})`,
        height: props.height,
        "justify-content": props.justifyContent,
        padding: paddingToCSS(
          props.paddingX ?? props.padding,
          props.paddingY ?? props.padding
        ),
        width: props.width,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
