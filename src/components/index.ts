// At the top of your main pridgiteui file
console.log(
  "pridgiteui components being evaluated, typeof window:",
  typeof window
);

if (typeof window === "undefined") {
  console.trace("pridgiteui evaluated during SSR - call stack:");
}

export * from "./Avatar";
export * from "./Button";
export * from "./Card";
export * from "./Divider";
export * from "./DropdownOptions";
export * from "./FileUpload";
export * from "./Flex";
export * from "./Input";
export * from "./Modal";
export * from "./Select";
export * from "./TabSwitch";
export * from "./Text";
export * from "./Toggle";
