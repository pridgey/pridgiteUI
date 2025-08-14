import { TextField } from "@kobalte/core";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";
import styles from "./Input.module.css";
import { Button } from "../Button";
import { FiEye, FiEyeOff } from "solid-icons/fi";

export type InputProps = {
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
  placeholder?: string;
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
            onBlur={(e) => {
              if (props.onBlur) {
                props.onBlur(e.currentTarget.value);
              }
            }}
            placeholder={props.placeholder}
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
          <div class={styles.input_wrapper}>
            <TextField.Input
              aria-label={props.label}
              class={styles.input_control}
              onBlur={(e) => {
                if (props.onBlur) {
                  props.onBlur(e.currentTarget.value);
                }
              }}
              placeholder={props.placeholder}
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
