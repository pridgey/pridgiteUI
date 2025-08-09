import { For, Portal } from "solid-js/web";
import { createSignal, onMount, onCleanup } from "solid-js";
import type { JSX } from "solid-js";
import styles from "./DropdownOptions.module.css";
import { clientOnly } from "@solidjs/start";

export type Option = {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
};

type HorizontalAlign = "left" | "right";
type VerticalAlign = "top" | "bottom";

export type DropdownOptionsProps = {
  horizontalAlign?: HorizontalAlign;
  horizontalGap?: number;
  onOutsideClick?: () => void;
  options: Option[];
  positionRef?: HTMLElement;
  verticalAlign?: VerticalAlign;
  verticalGap?: number;
};

/**
 * Adds a dropdown menu to an element
 */
export const DropdownOptions = (props: DropdownOptionsProps) => {
  let optionContainerRef: HTMLDivElement = (<div></div>) as HTMLDivElement;

  const [inlineStyles, setInlineStyles] = createSignal<JSX.CSSProperties>();

  const handleDocumentClick = (ev: MouseEvent) => {
    const path = ev.composedPath();
    if (
      !path?.includes(optionContainerRef) &&
      props.positionRef &&
      !path?.includes(props.positionRef)
    ) {
      props.onOutsideClick?.();
    }
  };

  onMount(() => {
    // Create function to calculate the position of the options
    const calculatePosition = () => {
      const parent = props.positionRef?.getBoundingClientRect();
      const options = optionContainerRef?.getBoundingClientRect();

      if (parent) {
        // Calculate left value
        let left = parent.x;
        if (props.horizontalAlign === "right") {
          left += parent?.width;
          left -= options?.width;
        }

        left += props.horizontalGap || 0;

        // Calculate top value
        let top = parent.y + parent?.height;

        if (props.verticalAlign === "top") {
          top -= parent?.height;
          top -= options?.height;
        }

        top += props.verticalGap || 0;

        const styles = {
          left: `${left}px`,
          top: `${top}px`,
        };

        setInlineStyles(styles);
      }
    };

    calculatePosition();

    // Listen for clicks
    document.addEventListener("click", handleDocumentClick);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleDocumentClick);
  });

  return (
    <Portal>
      <div
        ref={optionContainerRef}
        class={styles.container}
        style={inlineStyles()}
      >
        <For each={props.options}>
          {(option) => (
            <button
              class={styles.option}
              onClick={() => option.onClick()}
              type="button"
            >
              {option.label}
            </button>
          )}
        </For>
      </div>
    </Portal>
  );
};

export const DropdownOptionsCO = clientOnly(() =>
  Promise.resolve({ default: DropdownOptions })
);
