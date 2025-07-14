import { Tabs } from "@kobalte/core";
import { For, type JSX } from "solid-js";
import styles from "./TabSwitch.module.css";

type TabProps = {
  content: () => JSX.Element;
  default?: boolean;
  display: string;
  value: string;
};

type TabSwitchProps = {
  tabs: TabProps[];
};

export const TabSwitch = (props: TabSwitchProps) => {
  return (
    <Tabs.Root
      aria-label="Main navigation"
      class={styles.tabs}
      defaultValue={
        props.tabs.find((tab) => !!tab.default)?.value ?? props.tabs[0].value
      }
    >
      <Tabs.List class={styles.tabsList}>
        <For each={props.tabs}>
          {(tab) => (
            <Tabs.Trigger class={styles.tabsTrigger} value={tab.value}>
              {tab.display}
            </Tabs.Trigger>
          )}
        </For>
        <Tabs.Indicator class={styles.tabsIndicator} />
      </Tabs.List>
      <For each={props.tabs}>
        {(tab) => (
          <Tabs.Content class={styles.tabsContent} value={tab.value}>
            {tab.content()}
          </Tabs.Content>
        )}
      </For>
    </Tabs.Root>
  );
};
