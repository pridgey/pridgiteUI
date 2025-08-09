import { Switch as KobatleSwitch } from "@kobalte/core/switch";
import styles from "./Toggle.module.css";

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label: string;
  labelPosition?: "side" | "top";
  name?: string;
  onChange?: (checked: boolean) => void;
};

export const Toggle = (props: ToggleProps) => {
  return (
    <KobatleSwitch
      checked={props.checked}
      classList={{
        [styles.switch_labelTop]:
          props.labelPosition === "top" || !props.labelPosition,
        [styles.switch_labelSide]: props.labelPosition === "side",
      }}
      defaultChecked={props.defaultChecked}
      disabled={props.disabled}
      onChange={props.onChange}
      validationState={props.error ? "invalid" : "valid"}
      value={props.checked ? "on" : "off"}
    >
      <KobatleSwitch.Label class={styles.switch_label}>
        {props.label}
      </KobatleSwitch.Label>
      <KobatleSwitch.Input class={styles.switch_input} name={props.name} />
      <KobatleSwitch.Control class={styles.switch_control}>
        <KobatleSwitch.Thumb class={styles.switch_thumb} />
      </KobatleSwitch.Control>
      <KobatleSwitch.Description class={styles.switch_helper}>
        {props.helperText}
      </KobatleSwitch.Description>
      <KobatleSwitch.ErrorMessage class={styles.switch_error}>
        {props.error}
      </KobatleSwitch.ErrorMessage>
    </KobatleSwitch>
  );
};
