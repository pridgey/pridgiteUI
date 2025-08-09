import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "./Modal.module.css";
import { Text } from "../Text";
import { Button } from "../Button";
import { IoClose } from "solid-icons/io";
import { Show } from "solid-js";
import { clientOnly } from "@solidjs/start";

type ModalProps = {
  children: JSX.Element;
  cancelLabel?: string;
  onClose: () => void;
  onSubmit?: () => void;
  pending?: boolean;
  submitColor?: "primary" | "danger";
  submitLabel?: string;
  title: string;
  width?: string;
};

export const Modal = (props: ModalProps) => {
  return (
    <Portal>
      <div class={styles.container}>
        <dialog
          class={styles.modal}
          open={true}
          style={{ "--modal-width": props.width ?? "500px" }}
        >
          <span style={{ "grid-area": "title", "user-select": "none" }}>
            <Text as="h1" fontWeight="bold" fontSize="header">
              {props.title}
            </Text>
          </span>
          <span style={{ "grid-area": "close" }}>
            <Button
              color="text"
              disabled={props.pending}
              disableRadius={true}
              onClick={() => props.onClose()}
              padding="none"
              pending={props.pending}
              type="button"
              variant="text"
            >
              <IoClose />
            </Button>
          </span>
          <div class={styles.body}>{props.children}</div>
          <Show when={!!props.onSubmit}>
            <div class={styles.buttonbar}>
              <Button
                disabled={props.pending}
                onClick={() => props.onClose()}
                pending={props.pending}
                type="button"
                variant="text"
              >
                {props.cancelLabel || "Cancel"}
              </Button>
              <Button
                color={props.submitColor === "danger" ? "error" : "primary"}
                disabled={props.pending}
                onClick={() => [props.onSubmit?.()]}
                pending={props.pending}
                type="button"
              >
                {props.submitLabel || "Submit"}
              </Button>
            </div>
          </Show>
        </dialog>
      </div>
    </Portal>
  );
};

export const ModalCO = clientOnly(() => Promise.resolve({ default: Modal }));
