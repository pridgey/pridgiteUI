import { Button as KobatleButton } from "@kobalte/core";
import type { JSX } from "solid-js";
import { createSignal, onCleanup } from "solid-js";
import styled from "./Button.module.css";
import { Show } from "solid-js/web";
import { TbLoader2 } from "solid-icons/tb";
import { clientOnly } from "@solidjs/start";

const LONG_PRESS_DELAY_DEFAULT = 500;
const SCROLL_THRESHOLD = 10; // pixels - adjust as needed

export type ButtonProps = {
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
    | "foreground"
    | "background"
    | "fullbackground"
    | "fullforeground";
  children: JSX.Element;
  disabled?: boolean;
  disableRadius?: boolean;
  fontSize?: "mini" | "small" | "text" | "header" | "large" | "extra-large";
  href?: string;
  iconSize?: string;
  onClick?: () => void;
  onLongPress?: () => void;
  longPressDelay?: number; // milliseconds, defaults to 500ms
  padding?: "mini" | "small" | "medium" | "large" | "none";
  pending?: boolean;
  type?: "button" | "submit";
  variant?: "full" | "outlined" | "text";
  width?: string;
};

/**
 * Button Component built with Kobalte
 */
const ButtonChildren = (props: {
  children: JSX.Element;
  isPending: boolean;
}) => {
  if (typeof props.children === "string") {
    return (
      <div class={styled.button_content}>
        {props.children}
        <Show when={props.isPending}>
          <div class={styled.spin}>
            <TbLoader2 />
          </div>
        </Show>
      </div>
    );
  } else {
    // Is not a string
    return props.isPending ? (
      <div class={styled.spin}>
        <TbLoader2 />
      </div>
    ) : (
      props.children
    );
  }
};

/**
 * Kobatle oriented Button component
 */
export const Button = (props: ButtonProps) => {
  const [longPressTimer, setLongPressTimer] = createSignal<number | null>(null);
  const [isLongPressed, setIsLongPressed] = createSignal(false);
  const [touchStartPos, setTouchStartPos] = createSignal<{
    x: number;
    y: number;
  } | null>(null);

  const styles = {
    "--button-color": `var(--color-${props.color ?? "primary"})`,
    "--button-padding":
      props.padding === "none"
        ? "0px"
        : `var(--spacing-${props.padding ?? "medium"})`,
    "--button-radius": props.disableRadius ? "0px" : "var(--border-radius)",
    "--button-font-size": `var(--font-size-${props.fontSize ?? "text"})`,
    "--button-icon-size": props.iconSize ?? "unset",
    "--button-width": props.width ?? "unset",
  };

  const clearLongPressTimer = () => {
    const timer = longPressTimer();
    if (timer) {
      clearTimeout(timer);
      setLongPressTimer(null);
    }
  };

  const handleMouseDown = () => {
    if (!props.onLongPress || props.disabled) return;

    setIsLongPressed(false);
    const timer = window.setTimeout(() => {
      setIsLongPressed(true);
      props.onLongPress?.();
    }, props.longPressDelay ?? LONG_PRESS_DELAY_DEFAULT);

    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearLongPressTimer();
  };

  const handleClick = () => {
    // Only trigger onClick if it wasn't a long press
    if (!isLongPressed()) {
      props.onClick?.();
    }
    setIsLongPressed(false);
  };

  const handleMouseLeave = () => {
    clearLongPressTimer();
    setIsLongPressed(false);
  };

  // Touch events for mobile with scroll detection
  const handleTouchStart = (e: TouchEvent) => {
    if (!props.onLongPress || props.disabled) return;

    e.preventDefault(); // Prevent context menu on mobile

    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });

    setIsLongPressed(false);
    const timer = window.setTimeout(() => {
      // Only trigger long press if touch position hasn't moved significantly
      const currentPos = touchStartPos();
      if (currentPos) {
        setIsLongPressed(true);
        props.onLongPress?.();
      }
    }, props.longPressDelay ?? LONG_PRESS_DELAY_DEFAULT);

    setLongPressTimer(timer);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const startPos = touchStartPos();
    if (!startPos) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - startPos.x);
    const deltaY = Math.abs(touch.clientY - startPos.y);

    // If user has moved beyond threshold, cancel long press
    if (deltaX > SCROLL_THRESHOLD || deltaY > SCROLL_THRESHOLD) {
      clearLongPressTimer();
      setTouchStartPos(null);
      setIsLongPressed(false);
    }
  };

  const handleTouchEnd = () => {
    clearLongPressTimer();
    setTouchStartPos(null);
  };

  const handleTouchCancel = () => {
    clearLongPressTimer();
    setTouchStartPos(null);
    setIsLongPressed(false);
  };

  // Cleanup timer on component unmount
  onCleanup(() => {
    clearLongPressTimer();
  });

  const commonEventHandlers = props.onLongPress
    ? {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchCancel,
        onClick: handleClick,
      }
    : {
        onClick: () => props.onClick?.(),
      };

  if (!!props.href) {
    return (
      <KobatleButton.Root
        as="a"
        class={styled.button}
        classList={{
          [styled.button]: true,
          [styled.button_link]: true,
          [styled.button_outlined]: props.variant === "outlined",
          [styled.button_text]: props.variant === "text",
        }}
        disabled={props.disabled}
        href={props.href}
        style={styles}
        type={props.type ?? "button"}
        {...commonEventHandlers}
      >
        {props.children}
      </KobatleButton.Root>
    );
  }

  return (
    <KobatleButton.Root
      class={styled.button}
      classList={{
        [styled.button]: true,
        [styled.button_outlined]: props.variant === "outlined",
        [styled.button_text]: props.variant === "text",
      }}
      disabled={props.disabled}
      style={styles}
      type={props.type ?? "button"}
      {...commonEventHandlers}
    >
      <ButtonChildren isPending={props.pending ?? false}>
        {props.children}
      </ButtonChildren>
    </KobatleButton.Root>
  );
};

export const ButtonCO = clientOnly(() => Promise.resolve({ default: Button }));
