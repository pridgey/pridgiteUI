import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { clientOnly } from "@solidjs/start/.";
import { DropdownOptions, Option } from "../DropdownOptions";
import styles from "./Avatar.module.css";

type AvatarProps = {
  avatarUrl?: string;
  disableInteraction?: boolean;
  dropdownOptions?: Option[];
  invertColor?: boolean;
  userId?: string;
  username?: string;
  variant?: "default" | "mini" | "display";
};

/**
 * Avatar component used to display user information and allow access to settings and such
 */
export const Avatar = (props: AvatarProps) => {
  // Ref to connect the dropdown menu to the avatar bubble
  let avatarRef: HTMLButtonElement | HTMLDivElement | undefined;

  // Signal to determine if the avatar dropdown is open
  const [optionsOpen, setOptionsOpen] = createSignal<boolean>(false);

  // Determines the current variant of the component
  const variant = createMemo(() => {
    if (props.variant) {
      return props.variant;
    }
    return "default";
  });

  // Should the avatar have a dropdown, or just appear as a bubble
  const isInteractable = createMemo(() => {
    if (
      props.disableInteraction ||
      props.variant === "display" ||
      props.variant === "mini"
    ) {
      return false;
    }
    return true;
  });

  // Determine styles
  const avatarStyles = createMemo(() => {
    const styles = {
      "--avatar-border-thickness": variant() === "mini" ? "1px" : "2px",
      "--avatar-color": props.invertColor
        ? "var(--color-foreground)"
        : "var(--color-background)",
      "background-image": props.avatarUrl
        ? `url('${props.avatarUrl ?? ""}')`
        : "unset",
      cursor: isInteractable() ? "pointer" : "unset",
      "font-size":
        variant() === "mini"
          ? "16px"
          : variant() === "display"
          ? "46px"
          : "30px",
      "font-weight": variant() === "mini" ? "semibold" : "bold",
      height:
        variant() === "mini"
          ? "24px"
          : variant() === "display"
          ? "70px"
          : "50px",
      width:
        variant() === "mini"
          ? "24px"
          : variant() === "display"
          ? "70px"
          : "50px",
    };

    return styles;
  });

  return (
    <>
      <Switch>
        <Match when={!isInteractable()}>
          <div
            ref={avatarRef as HTMLDivElement}
            class={styles.avatarbubble}
            style={avatarStyles()}
          >
            {/* If no avatar image, show the first letter of their username or email */}
            <Show when={!props.avatarUrl}>{props.username?.at(0)}</Show>
          </div>
        </Match>
        <Match when={isInteractable()}>
          <button
            ref={avatarRef as HTMLButtonElement}
            onClick={() => {
              if (props.userId && variant() === "default") {
                setOptionsOpen(!optionsOpen());
              }
            }}
            type="button"
            class={styles.avatarbubble}
            style={avatarStyles()}
          >
            {/* If no avatar image, show the first letter of their username or email */}
            <Show when={!props.avatarUrl}>{props.username?.at(0)}</Show>
          </button>
        </Match>
      </Switch>
      <Show when={optionsOpen() && variant() === "default"}>
        <DropdownOptions
          horizontalAlign="right"
          onOutsideClick={() => setOptionsOpen(false)}
          options={props.dropdownOptions ?? []}
          positionRef={avatarRef}
          verticalGap={15}
        />
      </Show>
    </>
  );
};

export const AvatarCO = clientOnly(() => Promise.resolve({ default: Avatar }));
