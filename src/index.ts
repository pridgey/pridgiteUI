// At the top of your main pridgiteui file
console.log("pridgiteui module being evaluated, typeof window:", typeof window);

if (typeof window === "undefined") {
  console.trace("pridgiteui evaluated during SSR - call stack:");
}

export * from "./components";
