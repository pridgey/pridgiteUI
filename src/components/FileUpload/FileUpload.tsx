import { Details, FileField, FileRejection } from "@kobalte/core/file-field";
import styles from "./FileUpload.module.css";
import { JSX, Match, Show, Switch } from "solid-js";
import { AiOutlineLoading } from "solid-icons/ai";

type FileUploadProps = {
  accept?: string | string[];
  buttonOnly?: boolean;
  customButton?: JSX.Element;
  helperText?: string;
  existingFile?: string;
  label: string;
  multiFile?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  name?: string;
  onFileAccepted?: (file: File[]) => void;
  onFileRejected?: (file: FileRejection[]) => void;
  onFileChange?: (details: Details) => void;
  pending?: boolean;
  showFileList?: boolean;
};

/**
 * Component to handle File Uploads
 */
export const FileUpload = (props: FileUploadProps) => {
  return (
    <FileField
      accept={props.accept}
      class={styles.FileField}
      multiple={props.multiFile ?? false}
      maxFiles={props.maxFiles}
      maxFileSize={props.maxFileSize}
      name={props.name}
      onFileAccept={props.onFileAccepted}
      onFileReject={props.onFileRejected}
      onFileChange={props.onFileChange}
    >
      <Switch>
        {/* Standard File Upload UI (Rectangle with dropzone) */}
        <Match when={!props.buttonOnly && !props.customButton}>
          <FileField.Dropzone class={styles.FileField_dropzone}>
            <FileField.Label class={styles.FileField_label}>
              {props.label}
            </FileField.Label>
            <Switch>
              <Match when={!props.pending}>
                {props.helperText}
                <FileField.Trigger
                  class={styles.FileField_trigger}
                  disabled={props.pending}
                >
                  <Switch>
                    <Match when={!!props.existingFile?.length}>
                      Change File
                    </Match>
                    <Match when={!props.existingFile?.length}>
                      Upload File{props.multiFile ? "s" : ""}
                    </Match>
                  </Switch>
                </FileField.Trigger>
              </Match>
              <Match when={props.pending}>
                <p>Uploading File</p>
                <AiOutlineLoading class={styles.Loading_Icon} />
              </Match>
            </Switch>
          </FileField.Dropzone>
        </Match>
        {/* Just a button to intitiate upload */}
        <Match when={props.buttonOnly && !props.customButton}>
          <FileField.Trigger
            class={styles.FileField_trigger}
            disabled={props.pending}
          >
            {props.label}
            <Show when={props.pending}>
              <AiOutlineLoading class={styles.Loading_Icon_Small} />
            </Show>
          </FileField.Trigger>
        </Match>
        {/* Custom Button */}
        <Match when={!!props.customButton}>
          <FileField.Trigger
            class={styles.FileField_customItemTrigger}
            disabled={props.pending}
          >
            {props.customButton}
          </FileField.Trigger>
        </Match>
      </Switch>
      <FileField.HiddenInput disabled={props.pending} name={props.name} />
      <Show when={props.showFileList}>
        <FileField.ItemList class={styles.FileField_itemList}>
          {(file) => (
            <FileField.Item class={styles.FileField_item}>
              <FileField.ItemPreviewImage
                class={styles.FileField_itemPreviewImage}
              />
              <FileField.ItemName class={styles.FileField_itemName} />
              <FileField.ItemSize class={styles.FileField_itemSize} />
              <FileField.ItemDeleteTrigger
                class={styles.FileField_itemDeleteTrigger}
              >
                Remove File
              </FileField.ItemDeleteTrigger>
            </FileField.Item>
          )}
        </FileField.ItemList>
      </Show>
    </FileField>
  );
};
