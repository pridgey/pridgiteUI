import { Select as KobalteSelect } from "@kobalte/core/select";
import { FiChevronDown, FiCheck } from "solid-icons/fi";
import { AiOutlineCloseCircle } from "solid-icons/ai";
import styles from "./Select.module.css";
import { createMemo, Match, Show, Switch } from "solid-js";

interface SelectOptionProps {
  value: string;
  display: string;
  disabled?: boolean;
}

type CommonSelectProps = {
  error?: string;
  helperText?: string;
  label: string;
  options: SelectOptionProps[];
  placeholder?: string;
  width?: string;
};

type SelectMultipleProps = {
  multiple: true;
  onChange: (newValue: string[] | undefined) => void;
  value?: string[];
};

type SelectSingleProps = {
  multiple?: false;
  onChange: (newValue: string | undefined) => void;
  value?: string;
};

type SelectProps = CommonSelectProps &
  (SelectMultipleProps | SelectSingleProps);

/**
 * Kobalte oriented Select component
 */
export const Select = (props: SelectProps) => {
  // Memoize everything that could cause re-renders
  const selectedOption = createMemo(() =>
    props.multiple
      ? props.options.filter((opt) => props.value?.includes(opt.value))
      : props.options.find((opt) => opt.value === props.value)
  );

  const options = createMemo(() => props.options);

  const handleChange = (
    option: SelectOptionProps | SelectOptionProps[] | null
  ) => {
    // Only call onChange if the value actually changed
    if (Array.isArray(option)) {
      if (JSON.stringify(option) !== JSON.stringify(props.value)) {
        (props as SelectMultipleProps).onChange(option.map((o) => o.value));
      }
    } else {
      if (option?.value !== props.value) {
        (props as SelectSingleProps).onChange(option?.value);
      }
    }
  };

  return (
    <Switch>
      {/* Multiple Select Component */}
      <Match when={props.multiple}>
        <KobalteSelect<SelectOptionProps>
          class={styles.select_root}
          multiple={true}
          onChange={handleChange}
          options={options()}
          optionValue="value"
          optionTextValue="display"
          optionDisabled="disabled"
          placeholder={props.placeholder}
          itemComponent={(itemProps) => (
            <KobalteSelect.Item
              item={itemProps.item}
              class={styles.select_item}
            >
              <KobalteSelect.ItemLabel>
                {itemProps.item.rawValue.display}
              </KobalteSelect.ItemLabel>
              <KobalteSelect.ItemIndicator class={styles.select_itemIndicator}>
                <FiCheck />
              </KobalteSelect.ItemIndicator>
            </KobalteSelect.Item>
          )}
          style={{ "--select-width": props.width ?? "100%" }}
          value={selectedOption() as SelectOptionProps[]}
        >
          <KobalteSelect.Label class={styles.select_label}>
            {props.label}
          </KobalteSelect.Label>
          <KobalteSelect.Trigger
            class={styles.select_trigger}
            aria-label={props.label}
          >
            <KobalteSelect.Value<SelectOptionProps> class={styles.select_value}>
              {(state) => {
                return (
                  <>
                    <div class={styles.value_display}>
                      <span onPointerDown={(e) => e.stopPropagation()}>
                        <Switch>
                          <Match when={state.selectedOptions().length > 3}>
                            {state.selectedOptions()[0].display} and{" "}
                            {state.selectedOptions().length - 1} more
                          </Match>
                          <Match when={state.selectedOptions().length <= 3}>
                            {state
                              .selectedOptions()
                              .map((opt) => opt.display)
                              .join(", ")}
                          </Match>
                        </Switch>
                      </span>
                    </div>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={state.clear}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                  </>
                );
              }}
            </KobalteSelect.Value>
            <KobalteSelect.Icon class={styles.select_icon}>
              <FiChevronDown />
            </KobalteSelect.Icon>
          </KobalteSelect.Trigger>
          <Show when={props.helperText}>
            <KobalteSelect.Description class={styles.select_helper}>
              {props.helperText}
            </KobalteSelect.Description>
          </Show>
          <Show when={props.error}>
            <KobalteSelect.ErrorMessage class={styles.select_error}>
              {props.error}
            </KobalteSelect.ErrorMessage>
          </Show>
          <KobalteSelect.Portal>
            <KobalteSelect.Content class={styles.select_content}>
              <KobalteSelect.Listbox class={styles.select_listbox} />
            </KobalteSelect.Content>
          </KobalteSelect.Portal>
        </KobalteSelect>
      </Match>
      {/* Single Select */}
      <Match when={!props.multiple}>
        <KobalteSelect<SelectOptionProps>
          class={styles.select_root}
          multiple={false}
          onChange={handleChange}
          options={options()}
          optionValue="value"
          optionTextValue="display"
          optionDisabled="disabled"
          placeholder={props.placeholder}
          itemComponent={(itemProps) => (
            <KobalteSelect.Item
              item={itemProps.item}
              class={styles.select_item}
            >
              <KobalteSelect.ItemLabel>
                {(itemProps.item.rawValue as SelectOptionProps).display}
              </KobalteSelect.ItemLabel>
              <KobalteSelect.ItemIndicator class={styles.select_itemIndicator}>
                <FiCheck />
              </KobalteSelect.ItemIndicator>
            </KobalteSelect.Item>
          )}
          style={{ "--select-width": props.width ?? "100%" }}
          value={selectedOption() as SelectOptionProps}
        >
          <KobalteSelect.Label class={styles.select_label}>
            {props.label}
          </KobalteSelect.Label>
          <KobalteSelect.Trigger
            class={styles.select_trigger}
            aria-label={props.label}
          >
            <KobalteSelect.Value<SelectOptionProps> class={styles.select_value}>
              {(state) => {
                return (
                  <>
                    <div class={styles.value_display}>
                      <span onPointerDown={(e) => e.stopPropagation()}>
                        {(state.selectedOption() as SelectOptionProps).display}
                      </span>
                    </div>
                    <button
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={state.clear}
                    >
                      <AiOutlineCloseCircle />
                    </button>
                  </>
                );
              }}
            </KobalteSelect.Value>
            <KobalteSelect.Icon class={styles.select_icon}>
              <FiChevronDown />
            </KobalteSelect.Icon>
          </KobalteSelect.Trigger>
          <Show when={props.helperText}>
            <KobalteSelect.Description class={styles.select_helper}>
              {props.helperText}
            </KobalteSelect.Description>
          </Show>
          <Show when={props.error}>
            <KobalteSelect.ErrorMessage class={styles.select_error}>
              {props.error}
            </KobalteSelect.ErrorMessage>
          </Show>
          <KobalteSelect.Portal>
            <KobalteSelect.Content class={styles.select_content}>
              <KobalteSelect.Listbox class={styles.select_listbox} />
            </KobalteSelect.Content>
          </KobalteSelect.Portal>
        </KobalteSelect>
      </Match>
    </Switch>
  );
};
