/**
 * Utility function to convert padding values to proper css
 * @param paddingX "small" | "medium" | "large" to match theme styles
 * @param paddingY "small" | "medium" | "large" to match theme styles
 * @returns props css string
 */
export const paddingToCSS = (
  paddingX?: "small" | "medium" | "large",
  paddingY?: "small" | "medium" | "large"
) => {
  if (!paddingX && !paddingY) {
    return "";
  }

  if (paddingX === paddingY && !!paddingX) {
    // They're the same
    return `var(--spacing-${paddingX})`;
  }

  let x = "0px";
  let y = "0px";

  if (!!paddingX) {
    x = `var(--spacing-${paddingX})`;
  }

  if (!!paddingY) {
    y = `var(--spacing-${paddingY})`;
  }

  return `${y} ${x}`;
};
