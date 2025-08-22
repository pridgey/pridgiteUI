import { TextField } from "@kobalte/core";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import styles from "./Input.module.css";
import { Button } from "../Button";
import { FiEye, FiEyeOff } from "solid-icons/fi";
import { VsClose } from "solid-icons/vs";

export type InputProps = {
  autocomplete?: string;
  backgroundColor?:
    | "white"
    | "black"
    | "text"
    | "foreground"
    | "background"
    | "fullbackground"
    | "fullforeground";
  defaultValue?: string;
  error?: string;
  fontSize?: "mini" | "small" | "text" | "header" | "large" | "extra-large";
  fontWeight?: "light" | "normal" | "semibold" | "bold";
  helperText?: string;
  hideLabel?: boolean;
  label: string;
  labelColor?:
    | "white"
    | "black"
    | "text"
    | "foreground"
    | "background"
    | "fullbackground"
    | "fullforeground";
  multiline?: boolean;
  name?: string;
  onBlur?: (currentValue: string) => void;
  onChange?: (newValue: string) => void;
  onCloseTopbar?: () => void;
  placeholder?: string;
  ref?: HTMLInputElement | HTMLTextAreaElement;
  topbar?: string;
  type?: "text" | "password" | "number" | "time" | "date" | "email";
  width?: string;
  variant?: "inline" | "outlined";
};

export const Input = (props: InputProps) => {
  const [error, setError] = createSignal(props.error);
  const [showPassword, setShowPassword] = createSignal(false);

  createEffect(() => {
    setError(props.error);
  });

  return (
    <TextField.Root
      class={styles.input_root}
      defaultValue={props.defaultValue}
      name={props.name}
      onChange={props.onChange}
      style={{
        "--input-background": props.backgroundColor
          ? `var(--color-${props.backgroundColor})`
          : "transparent",
        "--input-border":
          props.variant === "inline"
            ? "unset"
            : "1px solid var(--color-foreground)",
        "--input-width": props.width ?? "100%",
      }}
      validationState={!!props.error ? "invalid" : "valid"}
    >
      <Show when={!props.hideLabel}>
        <TextField.Label
          class={styles.input_label}
          style={{
            color: `var(--color-${props.labelColor ?? "text"})`,
          }}
        >
          {props.label}
        </TextField.Label>
      </Show>
      <Switch>
        <Match when={props.multiline}>
          <TextField.TextArea
            aria-label={props.label}
            classList={{
              [styles.input_control]: true,
              [styles.input_multiline]: true,
            }}
            onBlur={(e: Event) => {
              if (props.onBlur) {
                props.onBlur((e.currentTarget as HTMLTextAreaElement).value);
              }
            }}
            placeholder={props.placeholder}
            ref={props.ref}
            style={{
              "font-size": `var(--font-size-${props.fontSize ?? "text"})`,
              "font-weight": `var(--font-weight-${
                props.fontWeight ?? "unset"
              })`,
              height: "unset",
            }}
            value={props.defaultValue}
          >
            {props.defaultValue}
          </TextField.TextArea>
        </Match>
        <Match when={!props.multiline}>
          <div
            classList={{
              [styles.input_topbar]: !!props.topbar,
              [styles.no_topbar]: !props.topbar,
            }}
          >
            <Show when={props.topbar}>
              <div class={styles.input_topbar_flex}>
                <span class={styles.input_topbar_text}>{props.topbar}</span>
                <Show when={!!props.onCloseTopbar}>
                  <Button
                    fontSize="mini"
                    iconSize="mini"
                    onClick={() => props.onCloseTopbar?.()}
                    padding="mini"
                    variant="text"
                  >
                    <VsClose />
                  </Button>
                </Show>
              </div>
            </Show>
            <div class={styles.input_wrapper}>
              <TextField.Input
                aria-label={props.label}
                autocomplete={props.autocomplete}
                class={styles.input_control}
                onBlur={(e) => {
                  if (props.onBlur) {
                    props.onBlur(e.currentTarget.value);
                  }
                }}
                placeholder={props.placeholder}
                ref={props.ref as HTMLInputElement}
                style={{
                  "font-size": `var(--font-size-${props.fontSize ?? "text"})`,
                  "font-weight": `var(--font-weight-${
                    props.fontWeight ?? "unset"
                  })`,
                }}
                type={
                  props.type === "password"
                    ? showPassword()
                      ? "text"
                      : "password"
                    : props.type
                }
                value={props.defaultValue}
              />
              <Show when={props.type === "password"}>
                <Button
                  fontSize="small"
                  iconSize="small"
                  onClick={() => setShowPassword(!showPassword())}
                  padding="mini"
                  variant="text"
                >
                  <Switch>
                    <Match when={showPassword()}>
                      <FiEyeOff />
                    </Match>
                    <Match when={!showPassword()}>
                      <FiEye />
                    </Match>
                  </Switch>
                </Button>
              </Show>
            </div>
          </div>
        </Match>
      </Switch>
      <Show when={props.helperText}>
        <TextField.Description class={styles.input_helper}>
          {props.helperText}
        </TextField.Description>
      </Show>
      <Show when={props.error}>
        <TextField.ErrorMessage class={styles.input_error}>
          {error()}
        </TextField.ErrorMessage>
      </Show>
    </TextField.Root>
  );
};
