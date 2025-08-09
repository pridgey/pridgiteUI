# PridgiteUI

A modern UI component library built with [Solid.js](https://www.solidjs.com/) and [Kobalte](https://kobalte.dev/), designed for building beautiful and accessible user interfaces.

## Installation

This package is published on GitHub Packages. You'll need to configure your package manager to use the GitHub registry for `@pridgey` scoped packages.

### NPM Setup

Create or update your `.npmrc` file in your project root:

```
@pridgey:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install the package:

```bash
npm install @pridgey/pridgiteui
```

### Yarn Setup

For Yarn v1, add to your `.npmrc`:

```
@pridgey:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

For Yarn v2+, add to your `.yarnrc.yml`:

```yaml
npmScopes:
  pridgey:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAuthToken: "${GITHUB_TOKEN}"
```

Then install:

```bash
yarn add @pridgey/pridgiteui
```

### PNPM Setup

Add to your `.npmrc`:

```
@pridgey:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
pnpm add @pridgey/pridgiteui
```

### Authentication

You'll need a GitHub Personal Access Token (PAT) with `read:packages` permission:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Select the `read:packages` scope
4. Copy the generated token

Set the token as an environment variable:

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export GITHUB_TOKEN=your_token_here

# Or add to your .env file
GITHUB_TOKEN=your_token_here
```

**Note:** For CI/CD environments, add `GITHUB_TOKEN` to your environment variables/secrets.

## Basic Usage

```tsx
import { Button, Card, Text } from "@pridgey/pridgiteui";
import "@pridgey/pridgiteui/dist/assets/pridgiteui.css";

function App() {
  return (
    <Card>
      <Text fontSize="header" fontWeight="bold">
        Welcome to PridgiteUI
      </Text>
      <Button onClick={() => console.log("Clicked!")}>Get Started</Button>
    </Card>
  );
}
```

## SSR Compatibility Guide

PridgiteUI components are categorized by their Server-Side Rendering (SSR) compatibility:

### ✅ SSR-Safe Components

These components work seamlessly with SSR frameworks like Solid Start:

- **Card** - Layout container component
- **Divider** - Visual separator element
- **Flex** - Flexbox layout component
- **Input** - Form input with validation
- **TabSwitch** - Tab navigation component
- **Text** - Typography component with dynamic elements
- **Toggle** - Toggle switch component

### ⚠️ Client-Only Components

These components require browser APIs and must be wrapped with `clientOnly()` in SSR applications:

- **Avatar** - User avatar with dropdown positioning
- **Button** - Enhanced button with long-press functionality using `window.setTimeout` and touch events
- **DropdownOptions** - Dropdown menu with portal rendering
- **FileUpload** - File upload with drag & drop support
- **Modal** - Modal dialog with portal rendering
- **Select** - Select dropdown with portal rendering

For convenience, pre-wrapped client-only versions are also exported with a `CO` suffix:

- **AvatarCO** - Client-only Avatar component
- **ButtonCO** - Client-only Button component
- **DropdownOptionsCO** - Client-only DropdownOptions component
- **FileUploadCO** - Client-only FileUpload component
- **ModalCO** - Client-only Modal component
- **SelectCO** - Client-only Select component

## Using Client-Only Components in SSR

PridgiteUI exports pre-wrapped client-only versions of components that require browser APIs. Simply use the `CO` suffix versions:

```tsx
import { FileUploadCO, ModalCO, SelectCO } from "@pridgey/pridgiteui";

function MyForm() {
  return (
    <div>
      <FileUploadCO label="Upload Document" />
      <SelectCO
        label="Choose Option"
        options={[
          { value: "option1", display: "Option 1" },
          { value: "option2", display: "Option 2" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <ModalCO title="Settings">
        <p>Modal content here</p>
      </ModalCO>
    </div>
  );
}
```

Alternatively, you can still manually wrap components if needed:

```tsx
import { clientOnly } from "solid-start";

const FileUpload = clientOnly(() =>
  import("@pridgey/pridgiteui").then((m) => ({ default: m.FileUpload }))
);
```

## Component Examples

### Text Component

```tsx
<Text
  as="h1"
  fontSize="jumbo"
  fontWeight="bold"
  color="primary"
>
  Main Heading
</Text>

<Text
  as="p"
  fontSize="text"
  color="gray"
  align="center"
>
  Body paragraph text
</Text>
```

### Input Component

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  onChange={(value) => console.log(value)}
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>
```

### Select Component (Client-Only)

```tsx
import { SelectCO } from "@pridgey/pridgiteui";

<SelectCO
  label="Choose Country"
  placeholder="Select a country"
  options={[
    { value: "us", display: "United States" },
    { value: "ca", display: "Canada" },
    { value: "mx", display: "Mexico" },
  ]}
  onChange={(value) => console.log(value)}
/>;
```

### Card & Layout

```tsx
<Card>
  <Flex direction="column" gap="medium">
    <Text fontSize="header" fontWeight="semibold">
      User Profile
    </Text>
    <Divider />
    <Text color="gray">Manage your account settings and preferences.</Text>
  </Flex>
</Card>
```

## Component Props

Each component accepts various props for customization. Common patterns include:

- **Sizing:** `fontSize`, `width`, `height`, `padding`, `gap`
- **Colors:** `color`, `variant` with CSS custom property integration
- **Layout:** `align`, `direction`, `justify`, `wrap`
- **States:** `disabled`, `loading`, `error`, `placeholder`

## Styling

PridgiteUI requires two setup steps for proper styling:

### 1. Import the CSS

Import the CSS file at the top level of your application:

```tsx
import "@pridgey/pridgiteui/dist/assets/pridgiteui.css";
```

### 2. Define CSS Variables

Add the required CSS custom properties to your root CSS file or `index.css`:

```css
:root {
  /* Color Palette */
  --color-primary: #118ab2;
  --color-secondary: #2b3a67;
  --color-tertiary: #0ad3ff;
  --color-success: #8fc93a;
  --color-error: #ef476f;
  --color-gray: #87a0b2;
  --color-fullwhite: #ffffff;
  --color-fullblack: #080808;
  --color-white: #ececec;
  --color-black: #252627;
  --color-transparent-white: rgba(255, 255, 255, 0.6);
  --color-transparent-black: rgba(0, 0, 0, 0.6);
  --color-backdrop: var(--color-transparent-black);
  --color-backdrop-invert: var(--color-transparent-white);
  --color-text: var(--color-black);
  --color-fullbackground: var(--color-fullwhite);
  --color-fullforeground: var(--color-fullblack);
  --color-background: var(--color-white);
  --color-foreground: var(--color-black);
  --color-darken: 80%;
  --color-darken-2: 70%;
  --color-lighten: 120%;
  --color-lighten-2: 130%;

  /* Border Radii */
  --border-radius: 0.75rem;
  --border-radius-large: 1rem;
  --border-radius-huge: 2rem;
  --border-radius-inset: 0.5rem;

  /* Box Shadow */
  --shadow-color: rgba(0, 0, 0, 0.25);
  --box-shadow-small: 0px 3px 3px 0px var(--shadow-color);
  --box-shadow-medium: 0px 3px 8px 0px var(--shadow-color);

  /* Spacing */
  --spacing-mini: 0.5rem;
  --spacing-small: 1rem;
  --spacing-medium: 1.5rem;
  --spacing-large: 4rem;
  --spacing-extra-large: 8rem;

  /* Font Family */
  --font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

  /* Font Sizes */
  font-size: 8px; /* Base font size for rem calculations */
  --font-size-mini: 1.5rem; /* 12px */
  --font-size-small: 1.85rem; /* 14.8px */
  --font-size-text: 2.15rem; /* 17.2px */
  --font-size-header: 2.5rem; /* 20px */
  --font-size-large: 3rem; /* 24px */
  --font-size-extra-large: 5rem; /* 40px */
  --font-size-jumbo: 7rem; /* 56px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-semibold: 500;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-small: 1.25em;
  --line-height-medium: 1.5em;
  --line-height-large: 1.75em;
}
```

### Customization

You can customize the theme by modifying any of these CSS variables. The components will automatically adapt to your custom values.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ using [Solid.js](https://www.solidjs.com/) and [Kobalte](https://kobalte.dev/)
